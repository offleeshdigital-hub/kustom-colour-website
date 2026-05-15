"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export default function TurbulentFlow() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mountRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_noise_scale;
      uniform float u_distortion;
      uniform float u_turbulence;
      uniform float u_sharpness;
      varying vec2 vUv;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g  = step(x0.yzx, x0.xyz);
        vec3 l  = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      float fbm(vec3 p) {
        float v = 0.0; float a = 0.5; float f = 0.6;
        for(int i = 0; i < 6; i++) {
          v += a * snoise(p * f); a *= 0.5; f *= 2.0;
        }
        return v;
      }

      float turbulence(vec3 p) {
        float t = 0.0; float a = 1.0; float f = 0.4;
        for(int i = 0; i < 4; i++) {
          t += abs(snoise(p * f)) * a; a *= 0.5; f *= 2.0;
        }
        return t;
      }

      vec2 curl(vec2 p, float time) {
        float eps = 0.01;
        return vec2(
          snoise(vec3(p.x, p.y + eps, time)) - snoise(vec3(p.x, p.y - eps, time)),
          snoise(vec3(p.x - eps, p.y, time)) - snoise(vec3(p.x + eps, p.y, time))
        ) / (2.0 * eps);
      }

      void main() {
        vec2 uv = vUv;
        float time = u_time * 0.4;
        vec3 pos = vec3(uv * u_noise_scale * 1.5, time * 0.1);

        float turb1 = turbulence(pos) * u_turbulence;
        float turb2 = turbulence(pos * 1.7 + vec3(100.0, 50.0, time * 0.3)) * u_turbulence * 0.3;
        float turb3 = fbm(pos * 0.8 + vec3(200.0, 100.0, time * 0.15)) * u_turbulence * 0.5;

        vec2 curlForce = curl(uv * 2.0, time * 0.5) * 0.2;
        vec2 distortion = vec2(turb1 + turb2, turb2 + turb3) * u_distortion + curlForce;
        vec2 distortedUV = uv + distortion;

        vec2 center1 = vec2(0.3 + sin(time * 0.4) * 0.25 + turb1 * 0.15, 0.7 + cos(time * 0.3) * 0.2);
        vec2 center2 = vec2(0.75 + sin(time * 0.35) * 0.2 + turb2 * 0.6,  0.3 + cos(time * 0.45) * 0.25);
        vec2 center3 = vec2(0.6 + sin(time * 0.5) * 0.15,                  0.6 + cos(time * 0.4) * 0.2 + turb3 * 0.1);
        vec2 center4 = vec2(0.15 + sin(time * 0.25) * 0.3,                 0.8 + cos(time * 0.55) * 0.2);

        float dist1 = length(distortedUV - center1);
        float dist2 = length(distortedUV - center2);
        float dist3 = length(distortedUV - center3);
        float dist4 = length(distortedUV - center4);

        float grad1 = 1.0 - smoothstep(0.0, 0.6 - turb1 * 0.2, dist1);
        float grad2 = 1.0 - smoothstep(0.0, 0.5 - turb2 * 0.15, dist2);
        float grad3 = 1.0 - smoothstep(0.0, 0.55 - turb3 * 0.18, dist3);
        float grad4 = 1.0 - smoothstep(0.0, 0.45 - turb1 * 0.12, dist4);

        // Kustom Colour palette — dark reds, near-blacks, ember tones
        vec3 brandRed    = vec3(0.996, 0.004, 0.004); // #FE0101
        vec3 deepRed     = vec3(0.45,  0.0,   0.0);
        vec3 emberRed    = vec3(0.7,   0.08,  0.0);
        vec3 nearBlack   = vec3(0.08,  0.0,   0.0);
        vec3 darkCrimson = vec3(0.28,  0.0,   0.02);

        vec3 finalColor = vec3(0.02, 0.0, 0.0); // near-black base

        finalColor += deepRed    * grad1 * (0.55 + turb1 * 0.2);
        finalColor += nearBlack  * grad2 * (0.4  + turb2 * 0.3);
        finalColor += darkCrimson* grad3 * (0.35 + turb3 * 0.2);
        finalColor += nearBlack  * grad4 * (0.3  + turb1 * 0.15);

        // Brand red highlight on interaction zones
        float interaction1 = grad1 * grad2 * 0.6;
        float interaction2 = grad2 * grad3 * 0.5;
        finalColor += brandRed   * interaction1 * 0.4;
        finalColor += emberRed   * interaction2 * 0.3;

        // Subtle noise texture
        float noiseDetail = fbm(vec3(uv * 12.0, time * 0.08)) * 0.3;
        finalColor += darkCrimson * noiseDetail * 0.15;

        // Keep it dark — cap brightness
        finalColor = clamp(finalColor, 0.0, 0.55);
        finalColor = pow(finalColor, vec3(0.92));

        // Strong vignette to keep edges dark
        float vignette = 1.0 - length(uv - 0.5) * 1.9;
        vignette = smoothstep(0.0, 1.0, vignette);
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time:        { value: 0 },
        u_resolution:  { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_noise_scale: { value: 3.5 },
        u_distortion:  { value: 0.12 },
        u_turbulence:  { value: 0.6 },
        u_sharpness:   { value: 1.2 },
      },
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(material.uniforms.u_turbulence, { value: 1.0, duration: 8, ease: "sine.inOut" })
      .to(material.uniforms.u_noise_scale, { value: 5.0, duration: 10, ease: "power2.inOut" }, 0)
      .to(material.uniforms.u_distortion,  { value: 0.2,  duration: 9, ease: "power1.inOut" }, 1)
      .to(material.uniforms.u_turbulence, { value: 0.3, duration: 11, ease: "sine.inOut" })
      .to(material.uniforms.u_noise_scale, { value: 2.0, duration: 12, ease: "power2.inOut" }, "-=5")
      .to(material.uniforms.u_distortion,  { value: 0.06, duration: 10, ease: "power1.inOut" }, "-=7");

    let frameId: number;
    let t = 0;
    const animate = () => {
      t += 0.007;
      material.uniforms.u_time.value = t;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      tl.kill();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
