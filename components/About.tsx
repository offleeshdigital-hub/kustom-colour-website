"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-36 bg-[#111111] relative overflow-hidden">
      {/* Red vertical accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#FE0101]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left — Giant 30 */}
          <div ref={ref} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className="font-display text-[clamp(8rem,20vw,18rem)] leading-none text-[#1A1A1A] select-none block">
                30
              </span>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8">
                <span className="font-display text-[clamp(1rem,3vw,2.5rem)] text-[#FE0101] tracking-widest block">
                  YEARS
                </span>
                <span className="font-display text-[clamp(1rem,3vw,2.5rem)] text-white/50 tracking-widest block">
                  OF CRAFT
                </span>
              </div>
            </motion.div>

            {/* Testimonial pull-quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-8 pl-6 border-l-2 border-[#FE0101]"
            >
              <p className="text-white/60 text-sm leading-relaxed italic">
                &ldquo;A true artist — the work he does is second to none. The passion and
                hard work shows.&rdquo;
              </p>
              <cite className="text-white/30 text-xs tracking-widest uppercase mt-2 block not-italic">
                — Chris Nitschke
              </cite>
            </motion.blockquote>
          </div>

          {/* Right — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#FE0101] block mb-6">
              About
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-white tracking-wide mb-8">
              WHERE CRAFT
              <br />
              MEETS
              <br />
              <span className="text-[#797979]">OBSESSION.</span>
            </h2>

            <div className="space-y-5 text-white/55 leading-relaxed">
              <p>
                At Kustom Colour Design, every project is a blank canvas — and we
                treat it that way. With over three decades of industry experience
                behind us, we bring a rare combination of traditional artisan
                skill and modern design intelligence to every brief.
              </p>
              <p>
                From meticulously hand-painted heritage signs to precision
                vehicle wraps, airbrushed murals and complete brand rollouts —
                our work doesn&rsquo;t just get noticed. It gets remembered.
              </p>
              <p className="text-white/80 font-medium">
                Based in Hervey Bay, Queensland. Built for businesses that
                refuse to be invisible.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-6 pt-8 border-t border-[#1F1F1F]">
              {[
                { label: "Traditional Signwriting", val: "✓" },
                { label: "Digital Printing", val: "✓" },
                { label: "Custom Fabrication", val: "✓" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-[#FE0101] font-bold">{item.val}</span>
                  <span className="text-xs tracking-widest uppercase text-white/40">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
