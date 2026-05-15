"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Shared draw animation helper ────────────────────────────────────────────
function draw(delay: number, duration = 2.0) {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration, ease: [0.43, 0.13, 0.23, 0.96] },
        opacity: { delay, duration: 0.01 },
      },
    },
  };
}

function fadeIn(delay: number) {
  return {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay, duration: 0.5, ease: "backOut" },
    },
  };
}

// ─── VARIANT 1: Classic Racing Lozenge ───────────────────────────────────────
// Double parallel lines, 3-ring oval badge, tick marks, cross-hairs.
// Inspired by 1950s–70s hot-rod custom paint tradition.
function ClassicLozenge({ animate }: { animate: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid meet"
      className="w-full" style={{ height: "clamp(70px, 8vw, 120px)" }}
      fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* LEFT — 4 lines fanning from the lozenge entry */}
      <motion.path d="M -10,46 C 80,46 200,42 340,42 C 460,42 540,44 590,48 C 608,50 614,52 618,54"
        stroke="#FE0101" strokeWidth="0.3" strokeLinecap="round" opacity={0.22}
        variants={draw(0, 1.3)} initial="hidden" animate={animate} />
      <motion.path d="M -10,52 C 80,52 200,48 340,48 C 460,48 540,50 590,54 C 608,56 614,57 618,58"
        stroke="#FE0101" strokeWidth="1.7" strokeLinecap="round"
        variants={draw(0.05, 1.4)} initial="hidden" animate={animate} />
      <motion.path d="M -10,58 C 80,58 200,54 340,54 C 460,54 540,56 590,60 C 608,62 614,63 618,64"
        stroke="#FE0101" strokeWidth="0.55" strokeLinecap="round" opacity={0.45}
        variants={draw(0.12, 1.4)} initial="hidden" animate={animate} />
      <motion.path d="M -10,63 C 80,63 200,59 340,59 C 460,59 540,61 590,65 C 607,67 613,68 617,70"
        stroke="#FE0101" strokeWidth="0.25" strokeLinecap="round" opacity={0.18}
        variants={draw(0.18, 1.3)} initial="hidden" animate={animate} />

      {/* CENTRE — 3-ring lozenge */}
      <motion.path d="M 618,54 C 628,22 672,6 720,6 C 768,6 812,22 822,54 C 812,88 768,114 720,114 C 672,114 628,88 618,54 Z"
        stroke="#FE0101" strokeWidth="1.3" strokeLinecap="round"
        variants={draw(1.25, 2.0)} initial="hidden" animate={animate} />
      <motion.path d="M 642,54 C 650,30 682,18 720,18 C 758,18 790,30 798,54 C 790,78 758,90 720,90 C 682,90 650,78 642,54 Z"
        stroke="#FE0101" strokeWidth="0.7" strokeLinecap="round" opacity={0.55}
        variants={draw(1.65, 1.6)} initial="hidden" animate={animate} />
      <motion.path d="M 666,54 C 672,40 694,32 720,32 C 746,32 768,40 774,54 C 768,68 746,76 720,76 C 694,76 672,68 666,54 Z"
        stroke="#FE0101" strokeWidth="0.4" strokeLinecap="round" opacity={0.35}
        variants={draw(1.95, 1.2)} initial="hidden" animate={animate} />
      {/* Cross-hairs */}
      <motion.line x1="720" y1="6" x2="720" y2="114" stroke="#FE0101" strokeWidth="0.25" opacity={0.18}
        variants={draw(2.5, 0.6)} initial="hidden" animate={animate} />
      <motion.line x1="618" y1="60" x2="822" y2="60" stroke="#FE0101" strokeWidth="0.25" opacity={0.18}
        variants={draw(2.6, 0.6)} initial="hidden" animate={animate} />
      {/* Pole ticks */}
      {[{ x1: 712, y1: 6, x2: 728, y2: 6 }, { x1: 712, y1: 114, x2: 728, y2: 114 },
        { x1: 618, y1: 52, x2: 618, y2: 68 }, { x1: 822, y1: 52, x2: 822, y2: 68 }].map((t, i) => (
        <motion.line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="#FE0101" strokeWidth="1.1" opacity={0.5}
          variants={fadeIn(2.7 + i * 0.08)} initial="hidden" animate={animate} />
      ))}
      <motion.circle cx="720" cy="60" r="4" fill="#FE0101"
        variants={fadeIn(2.55)} initial="hidden" animate={animate} />

      {/* RIGHT — mirror of left */}
      <motion.path d="M 822,54 C 826,52 832,50 849,49 C 880,47 960,46 1080,46 C 1200,46 1350,48 1450,48"
        stroke="#FE0101" strokeWidth="0.3" strokeLinecap="round" opacity={0.22}
        variants={draw(1.5, 1.3)} initial="hidden" animate={animate} />
      <motion.path d="M 822,58 C 826,57 832,56 849,55 C 880,53 960,52 1080,52 C 1200,52 1350,54 1450,54"
        stroke="#FE0101" strokeWidth="1.7" strokeLinecap="round"
        variants={draw(1.45, 1.4)} initial="hidden" animate={animate} />
      <motion.path d="M 822,64 C 826,63 832,62 849,61 C 880,59 960,58 1080,58 C 1200,58 1350,60 1450,60"
        stroke="#FE0101" strokeWidth="0.55" strokeLinecap="round" opacity={0.45}
        variants={draw(1.52, 1.4)} initial="hidden" animate={animate} />
      <motion.path d="M 822,70 C 826,69 832,68 849,67 C 880,65 960,64 1080,64 C 1200,64 1350,66 1450,66"
        stroke="#FE0101" strokeWidth="0.25" strokeLinecap="round" opacity={0.18}
        variants={draw(1.58, 1.3)} initial="hidden" animate={animate} />

      {/* Label */}
      <motion.text x="720" y="56" textAnchor="middle" dominantBaseline="middle"
        fill="#FE0101" fontSize="7" letterSpacing="3" fontFamily="sans-serif"
        opacity={0} style={{ textTransform: "uppercase" }}>
        <animate attributeName="opacity" values="0;0.35;0.35" keyTimes="0;0.85;1"
          dur="3.5s" begin="2.8s" fill="freeze" />
        KC
      </motion.text>
    </svg>
  );
}

// ─── VARIANT 2: Art Deco Scrollwork ──────────────────────────────────────────
// Flowing lines that splay into curling scroll-ends. Centre: a pointed Art Deco
// badge with flanged wings. Inspired by 1920s–30s signwriting ornamentation.
function ArtDecoScrollwork({ animate }: { animate: string }) {
  return (
    <svg viewBox="0 0 1440 130" preserveAspectRatio="xMidYMid meet"
      className="w-full" style={{ height: "clamp(75px, 9vw, 130px)" }}
      fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* LEFT — main line with scroll terminus */}
      <motion.path
        d="M -10,60 C 60,60 160,58 280,55 C 380,53 460,53 540,56 C 580,58 600,60 618,62"
        stroke="#FE0101" strokeWidth="1.8" strokeLinecap="round"
        variants={draw(0, 1.4)} initial="hidden" animate={animate} />
      <motion.path
        d="M -10,65 C 60,65 160,63 280,60 C 380,58 460,58 540,61 C 580,63 600,65 618,67"
        stroke="#FE0101" strokeWidth="0.5" strokeLinecap="round" opacity={0.4}
        variants={draw(0.1, 1.4)} initial="hidden" animate={animate} />
      {/* Left scroll terminus — curling inward */}
      <motion.path
        d="M -10,60 C -20,50 -22,38 -14,32 C -6,26 4,30 8,40 C 12,50 6,58 -2,60"
        stroke="#FE0101" strokeWidth="1.2" strokeLinecap="round" opacity={0.7}
        variants={draw(1.45, 0.9)} initial="hidden" animate={animate} />
      <motion.path
        d="M 8,40 C 10,35 14,33 18,35 C 22,37 22,43 18,45"
        stroke="#FE0101" strokeWidth="0.7" strokeLinecap="round" opacity={0.5}
        variants={draw(1.8, 0.5)} initial="hidden" animate={animate} />

      {/* LEFT hairline with secondary scroll */}
      <motion.path
        d="M 80,52 C 160,50 280,48 400,48 C 500,48 580,52 610,56"
        stroke="#FE0101" strokeWidth="0.3" strokeLinecap="round" opacity={0.28}
        variants={draw(0.2, 1.2)} initial="hidden" animate={animate} />

      {/* CENTRE — Art Deco winged badge */}
      {/* Central pointed diamond */}
      <motion.path
        d="M 680,65 L 720,15 L 760,65 L 720,115 Z"
        stroke="#FE0101" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        variants={draw(1.3, 1.8)} initial="hidden" animate={animate} />
      {/* Inner diamond */}
      <motion.path
        d="M 700,65 L 720,35 L 740,65 L 720,95 Z"
        stroke="#FE0101" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" opacity={0.5}
        variants={draw(1.7, 1.4)} initial="hidden" animate={animate} />
      {/* Left wing flange */}
      <motion.path
        d="M 680,65 C 665,58 650,52 635,52 C 625,52 618,58 618,65 C 618,72 625,78 635,78 C 650,78 665,72 680,65"
        stroke="#FE0101" strokeWidth="0.9" strokeLinecap="round" opacity={0.65}
        variants={draw(2.0, 1.2)} initial="hidden" animate={animate} />
      {/* Right wing flange */}
      <motion.path
        d="M 760,65 C 775,58 790,52 805,52 C 815,52 822,58 822,65 C 822,72 815,78 805,78 C 790,78 775,72 760,65"
        stroke="#FE0101" strokeWidth="0.9" strokeLinecap="round" opacity={0.65}
        variants={draw(2.0, 1.2)} initial="hidden" animate={animate} />
      {/* Top & bottom centre flourish lines */}
      <motion.line x1="720" y1="15" x2="720" y2="5" stroke="#FE0101" strokeWidth="1" opacity={0.5}
        variants={draw(2.6, 0.4)} initial="hidden" animate={animate} />
      <motion.line x1="720" y1="115" x2="720" y2="125" stroke="#FE0101" strokeWidth="1" opacity={0.5}
        variants={draw(2.65, 0.4)} initial="hidden" animate={animate} />
      <motion.circle cx="720" cy="65" r="3.5" fill="#FE0101"
        variants={fadeIn(2.5)} initial="hidden" animate={animate} />

      {/* RIGHT — mirror main line */}
      <motion.path
        d="M 822,62 C 840,60 860,58 920,56 C 1000,53 1100,53 1200,55 C 1300,57 1390,60 1450,60"
        stroke="#FE0101" strokeWidth="1.8" strokeLinecap="round"
        variants={draw(1.45, 1.4)} initial="hidden" animate={animate} />
      <motion.path
        d="M 822,67 C 840,65 860,63 920,61 C 1000,58 1100,58 1200,60 C 1300,62 1390,65 1450,65"
        stroke="#FE0101" strokeWidth="0.5" strokeLinecap="round" opacity={0.4}
        variants={draw(1.55, 1.4)} initial="hidden" animate={animate} />
      {/* Right scroll terminus */}
      <motion.path
        d="M 1450,60 C 1460,50 1462,38 1454,32 C 1446,26 1436,30 1432,40 C 1428,50 1434,58 1442,60"
        stroke="#FE0101" strokeWidth="1.2" strokeLinecap="round" opacity={0.7}
        variants={draw(1.7, 0.9)} initial="hidden" animate={animate} />
      <motion.path
        d="M 1432,40 C 1430,35 1426,33 1422,35 C 1418,37 1418,43 1422,45"
        stroke="#FE0101" strokeWidth="0.7" strokeLinecap="round" opacity={0.5}
        variants={draw(2.0, 0.5)} initial="hidden" animate={animate} />
      <motion.path
        d="M 830,52 C 900,50 1020,48 1140,48 C 1250,48 1360,52 1400,56"
        stroke="#FE0101" strokeWidth="0.3" strokeLinecap="round" opacity={0.28}
        variants={draw(1.6, 1.2)} initial="hidden" animate={animate} />
    </svg>
  );
}

// ─── VARIANT 3: Hot Rod Dagger ────────────────────────────────────────────────
// Lines taper to sharp arrow points at both ends. Centre: vertical dagger blade
// with diverging speed-lines. Inspired by Ed "Big Daddy" Roth / kustom kulture.
function HotRodDagger({ animate }: { animate: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid meet"
      className="w-full" style={{ height: "clamp(70px, 8vw, 120px)" }}
      fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* LEFT — twin lines tapering from arrow point */}
      {/* Arrow point at far left */}
      <motion.path d="M 30,60 L 0,54 L 0,66 Z"
        stroke="#FE0101" strokeWidth="1" strokeLinejoin="round" fill="#FE0101" opacity={0.7}
        variants={fadeIn(0)} initial="hidden" animate={animate} />
      <motion.path d="M 22,58 L 0,54"
        stroke="#FE0101" strokeWidth="0.3" strokeLinecap="round" opacity={0.3}
        variants={draw(0.05, 0.3)} initial="hidden" animate={animate} />

      {/* Upper main line — left */}
      <motion.path d="M 28,57 C 80,55 160,53 260,51 C 360,49 460,49 545,51 C 578,52 598,54 612,57"
        stroke="#FE0101" strokeWidth="1.8" strokeLinecap="round"
        variants={draw(0.1, 1.3)} initial="hidden" animate={animate} />
      {/* Lower main line — left */}
      <motion.path d="M 28,63 C 80,65 160,67 260,69 C 360,71 460,71 545,69 C 578,68 598,66 612,63"
        stroke="#FE0101" strokeWidth="1.8" strokeLinecap="round"
        variants={draw(0.1, 1.3)} initial="hidden" animate={animate} />
      {/* Inner hairlines */}
      <motion.path d="M 60,59 C 140,57 240,56 360,55 C 460,54 540,55 590,57 C 600,58 608,59 612,60"
        stroke="#FE0101" strokeWidth="0.4" strokeLinecap="round" opacity={0.38}
        variants={draw(0.2, 1.2)} initial="hidden" animate={animate} />
      <motion.path d="M 60,61 C 140,63 240,64 360,65 C 460,66 540,65 590,63 C 600,62 608,61 612,60"
        stroke="#FE0101" strokeWidth="0.4" strokeLinecap="round" opacity={0.38}
        variants={draw(0.2, 1.2)} initial="hidden" animate={animate} />
      {/* Speed notches — left side */}
      {[120, 200, 300, 420].map((x, i) => (
        <motion.line key={i} x1={x} y1={55 - i * 0.5} x2={x} y2={65 + i * 0.5}
          stroke="#FE0101" strokeWidth="0.6" opacity={0.3}
          variants={fadeIn(0.4 + i * 0.06)} initial="hidden" animate={animate} />
      ))}

      {/* CENTRE — Dagger blade */}
      {/* Outer blade */}
      <motion.path d="M 680,60 L 720,8 L 760,60 L 720,112 Z"
        stroke="#FE0101" strokeWidth="1.5" strokeLinejoin="round"
        variants={draw(1.2, 1.6)} initial="hidden" animate={animate} />
      {/* Inner blade */}
      <motion.path d="M 698,60 L 720,28 L 742,60 L 720,92 Z"
        stroke="#FE0101" strokeWidth="0.7" strokeLinejoin="round" opacity={0.5}
        variants={draw(1.6, 1.2)} initial="hidden" animate={animate} />
      {/* Crossguard */}
      <motion.line x1="668" y1="60" x2="772" y2="60" stroke="#FE0101" strokeWidth="1.2"
        variants={draw(2.0, 0.7)} initial="hidden" animate={animate} />
      <motion.line x1="675" y1="55" x2="765" y2="55" stroke="#FE0101" strokeWidth="0.4" opacity={0.4}
        variants={draw(2.1, 0.7)} initial="hidden" animate={animate} />
      <motion.line x1="675" y1="65" x2="765" y2="65" stroke="#FE0101" strokeWidth="0.4" opacity={0.4}
        variants={draw(2.1, 0.7)} initial="hidden" animate={animate} />
      {/* Diverging speed-lines from dagger */}
      <motion.path d="M 680,60 C 665,52 645,48 618,57"
        stroke="#FE0101" strokeWidth="0.7" strokeLinecap="round" opacity={0.45}
        variants={draw(2.2, 0.6)} initial="hidden" animate={animate} />
      <motion.path d="M 680,60 C 665,68 645,72 618,63"
        stroke="#FE0101" strokeWidth="0.7" strokeLinecap="round" opacity={0.45}
        variants={draw(2.2, 0.6)} initial="hidden" animate={animate} />
      <motion.path d="M 760,60 C 775,52 795,48 822,57"
        stroke="#FE0101" strokeWidth="0.7" strokeLinecap="round" opacity={0.45}
        variants={draw(2.2, 0.6)} initial="hidden" animate={animate} />
      <motion.path d="M 760,60 C 775,68 795,72 822,63"
        stroke="#FE0101" strokeWidth="0.7" strokeLinecap="round" opacity={0.45}
        variants={draw(2.2, 0.6)} initial="hidden" animate={animate} />
      <motion.circle cx="720" cy="60" r="3" fill="#FE0101"
        variants={fadeIn(2.45)} initial="hidden" animate={animate} />

      {/* RIGHT — mirror of left */}
      <motion.path d="M 828,57 C 842,54 862,52 955,51 C 1040,49 1140,49 1240,51 C 1340,53 1400,55 1412,57"
        stroke="#FE0101" strokeWidth="1.8" strokeLinecap="round"
        variants={draw(1.45, 1.3)} initial="hidden" animate={animate} />
      <motion.path d="M 828,63 C 842,66 862,68 955,69 C 1040,71 1140,71 1240,69 C 1340,67 1400,65 1412,63"
        stroke="#FE0101" strokeWidth="1.8" strokeLinecap="round"
        variants={draw(1.45, 1.3)} initial="hidden" animate={animate} />
      <motion.path d="M 828,60 C 860,58 960,56 1060,55 C 1160,54 1280,55 1380,59 C 1400,60 1412,60 1412,60"
        stroke="#FE0101" strokeWidth="0.4" strokeLinecap="round" opacity={0.38}
        variants={draw(1.55, 1.2)} initial="hidden" animate={animate} />
      {[1050, 930, 810, 700].map((x, i) => (
        <motion.line key={i} x1={1440 - x + 300} y1={55 - i * 0.5} x2={1440 - x + 300} y2={65 + i * 0.5}
          stroke="#FE0101" strokeWidth="0.6" opacity={0.3}
          variants={fadeIn(1.6 + i * 0.06)} initial="hidden" animate={animate} />
      ))}
      {/* Arrow point at far right */}
      <motion.path d="M 1410,60 L 1440,54 L 1440,66 Z"
        stroke="#FE0101" strokeWidth="1" strokeLinejoin="round" fill="#FE0101" opacity={0.7}
        variants={fadeIn(1.45)} initial="hidden" animate={animate} />
    </svg>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
type Variant = 1 | 2 | 3;

export default function PinstripeAccent({
  variant = 1,
  inverted = false,
}: {
  variant?: Variant;
  inverted?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const animateState = isInView ? "visible" : "hidden";
  const bg = inverted ? "#111111" : "#0D0D0D";

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden select-none"
      style={{ background: bg }}
      aria-hidden="true"
    >
      {variant === 1 && <ClassicLozenge animate={animateState} />}
      {variant === 2 && <ArtDecoScrollwork animate={animateState} />}
      {variant === 3 && <HotRodDagger animate={animateState} />}
    </div>
  );
}
