"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const RED = "#FE0101";
const WHT = "#ffffff";

// Brush-stroke ease — hesitates, rushes, feathers at end
const BE: [number, number, number, number] = [0.16, 0.84, 0.44, 1];

type Stroke = {
  d: string; stroke: string; width: number;
  opacity: number; delay: number; dur: number; glow: boolean;
};

const strokes: Stroke[] = [
  // ═══════════════════════════════════════════════════════════════
  // OUTER DIAMOND — the structural frame of the whole composition
  // ═══════════════════════════════════════════════════════════════
  { d:"M 720 220 L 940 400 L 720 580 L 500 400 Z",
    stroke:RED, width:2.0, opacity:0.44, delay:0,    dur:2.6, glow:true  },
  { d:"M 720 220 L 940 400 L 720 580 L 500 400 Z",
    stroke:WHT, width:0.5, opacity:0.18, delay:0.15, dur:2.6, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // NESTED INNER DIAMONDS — stacked smaller forms at center
  // ═══════════════════════════════════════════════════════════════
  { d:"M 720 258 L 882 400 L 720 542 L 558 400 Z",
    stroke:RED, width:1.6, opacity:0.38, delay:0.3,  dur:2.2, glow:false },
  { d:"M 720 295 L 830 400 L 720 505 L 610 400 Z",
    stroke:RED, width:1.4, opacity:0.34, delay:0.5,  dur:2.0, glow:false },
  { d:"M 720 335 L 788 400 L 720 465 L 652 400 Z",
    stroke:WHT, width:0.8, opacity:0.20, delay:0.65, dur:1.8, glow:false },
  { d:"M 720 362 L 758 400 L 720 438 L 682 400 Z",
    stroke:RED, width:0.9, opacity:0.28, delay:0.8,  dur:1.5, glow:false },
  { d:"M 720 380 L 742 400 L 720 420 L 698 400 Z",
    stroke:WHT, width:0.5, opacity:0.16, delay:0.9,  dur:1.2, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // TOP SPIKE — narrow blade rising from the diamond's top vertex
  // ═══════════════════════════════════════════════════════════════
  { d:"M 720 220 L 717 158 L 714 96 L 720 40 L 726 96 L 723 158 L 720 220",
    stroke:RED, width:1.8, opacity:0.46, delay:1.0,  dur:2.2, glow:true  },
  // Winglets — small blades branching from spike at two heights
  { d:"M 717 162 L 698 178 L 674 184",
    stroke:RED, width:1.4, opacity:0.38, delay:1.8,  dur:1.2, glow:false },
  { d:"M 723 162 L 742 178 L 766 184",
    stroke:RED, width:1.4, opacity:0.38, delay:1.8,  dur:1.2, glow:false },
  { d:"M 715 122 L 700 132 L 684 136",
    stroke:RED, width:1.0, opacity:0.30, delay:2.0,  dur:1.0, glow:false },
  { d:"M 725 122 L 740 132 L 756 136",
    stroke:RED, width:1.0, opacity:0.30, delay:2.0,  dur:1.0, glow:false },
  // White hairlines on spike
  { d:"M 720 220 L 717 158 L 714 96 L 720 40",
    stroke:WHT, width:0.4, opacity:0.14, delay:1.15, dur:2.2, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // BOTTOM SPIKE — mirror of top, pointing downward
  // ═══════════════════════════════════════════════════════════════
  { d:"M 720 580 L 717 642 L 714 704 L 720 760 L 726 704 L 723 642 L 720 580",
    stroke:RED, width:1.8, opacity:0.46, delay:1.0,  dur:2.2, glow:true  },
  { d:"M 717 638 L 698 622 L 674 616",
    stroke:RED, width:1.4, opacity:0.38, delay:1.8,  dur:1.2, glow:false },
  { d:"M 723 638 L 742 622 L 766 616",
    stroke:RED, width:1.4, opacity:0.38, delay:1.8,  dur:1.2, glow:false },
  { d:"M 715 678 L 700 668 L 684 664",
    stroke:RED, width:1.0, opacity:0.30, delay:2.0,  dur:1.0, glow:false },
  { d:"M 725 678 L 740 668 L 756 664",
    stroke:RED, width:1.0, opacity:0.30, delay:2.0,  dur:1.0, glow:false },
  { d:"M 720 580 L 717 642 L 714 704 L 720 760",
    stroke:WHT, width:0.4, opacity:0.14, delay:1.15, dur:2.2, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // LEFT UPPER WING — sweeping curve from left diamond vertex upward-left
  // ═══════════════════════════════════════════════════════════════
  { d:"M 500 400 C 456 366 392 322 330 296 S 220 278 160 298",
    stroke:RED, width:2.0, opacity:0.44, delay:1.4,  dur:2.8, glow:true  },
  { d:"M 500 400 C 456 373 392 330 330 304 S 220 286 160 306",
    stroke:RED, width:0.5, opacity:0.20, delay:1.55, dur:2.8, glow:false },

  // LEFT LOWER WING — mirror about y=400
  { d:"M 500 400 C 456 434 392 478 330 504 S 220 522 160 502",
    stroke:RED, width:2.0, opacity:0.44, delay:1.4,  dur:2.8, glow:true  },
  { d:"M 500 400 C 456 427 392 470 330 496 S 220 514 160 494",
    stroke:RED, width:0.5, opacity:0.20, delay:1.55, dur:2.8, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // RIGHT UPPER + LOWER WINGS — mirror of left about x=720
  // ═══════════════════════════════════════════════════════════════
  { d:"M 940 400 C 984 366 1048 322 1110 296 S 1220 278 1280 298",
    stroke:RED, width:2.0, opacity:0.44, delay:1.4,  dur:2.8, glow:true  },
  { d:"M 940 400 C 984 373 1048 330 1110 304 S 1220 286 1280 306",
    stroke:RED, width:0.5, opacity:0.20, delay:1.55, dur:2.8, glow:false },
  { d:"M 940 400 C 984 434 1048 478 1110 504 S 1220 522 1280 502",
    stroke:RED, width:2.0, opacity:0.44, delay:1.4,  dur:2.8, glow:true  },
  { d:"M 940 400 C 984 427 1048 470 1110 496 S 1220 514 1280 494",
    stroke:RED, width:0.5, opacity:0.20, delay:1.55, dur:2.8, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // INNER WING DETAIL LINES — fine parallel lines inside each wing
  // ═══════════════════════════════════════════════════════════════
  { d:"M 616 326 C 568 306 518 296 472 298",
    stroke:RED, width:0.9, opacity:0.24, delay:2.0,  dur:1.8, glow:false },
  { d:"M 616 474 C 568 494 518 504 472 502",
    stroke:RED, width:0.9, opacity:0.24, delay:2.0,  dur:1.8, glow:false },
  { d:"M 824 326 C 872 306 922 296 968 298",
    stroke:RED, width:0.9, opacity:0.24, delay:2.0,  dur:1.8, glow:false },
  { d:"M 824 474 C 872 494 922 504 968 502",
    stroke:RED, width:0.9, opacity:0.24, delay:2.0,  dur:1.8, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // WING TIP DAGGERS — sharp blades at the wing tips
  // ═══════════════════════════════════════════════════════════════
  { d:"M 224 284 L 186 258 L 152 234",
    stroke:RED, width:1.5, opacity:0.38, delay:2.6,  dur:1.4, glow:false },
  { d:"M 224 516 L 186 542 L 152 566",
    stroke:RED, width:1.5, opacity:0.38, delay:2.6,  dur:1.4, glow:false },
  { d:"M 1216 284 L 1254 258 L 1288 234",
    stroke:RED, width:1.5, opacity:0.38, delay:2.6,  dur:1.4, glow:false },
  { d:"M 1216 516 L 1254 542 L 1288 566",
    stroke:RED, width:1.5, opacity:0.38, delay:2.6,  dur:1.4, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // VERTEX DAGGER ACCENTS — blades from diamond's left/right corners
  // ═══════════════════════════════════════════════════════════════
  { d:"M 500 400 L 466 378 L 442 360",
    stroke:RED, width:1.2, opacity:0.32, delay:2.2,  dur:1.0, glow:false },
  { d:"M 500 400 L 466 422 L 442 440",
    stroke:RED, width:1.2, opacity:0.32, delay:2.2,  dur:1.0, glow:false },
  { d:"M 940 400 L 974 378 L 998 360",
    stroke:RED, width:1.2, opacity:0.32, delay:2.2,  dur:1.0, glow:false },
  { d:"M 940 400 L 974 422 L 998 440",
    stroke:RED, width:1.2, opacity:0.32, delay:2.2,  dur:1.0, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // OUTER ARMS — connect wing tips to the extreme tips
  // ═══════════════════════════════════════════════════════════════
  { d:"M 160 298 C 120 318 80 354 44 386",
    stroke:RED, width:1.8, opacity:0.42, delay:2.8,  dur:2.0, glow:true  },
  { d:"M 160 502 C 120 482 80 446 44 414",
    stroke:RED, width:1.8, opacity:0.42, delay:2.8,  dur:2.0, glow:true  },
  { d:"M 1280 298 C 1320 318 1360 354 1396 386",
    stroke:RED, width:1.8, opacity:0.42, delay:2.8,  dur:2.0, glow:true  },
  { d:"M 1280 502 C 1320 482 1360 446 1396 414",
    stroke:RED, width:1.8, opacity:0.42, delay:2.8,  dur:2.0, glow:true  },

  // ═══════════════════════════════════════════════════════════════
  // EXTREME TIP COMPLEXES — pointed formations at far left and right
  // ═══════════════════════════════════════════════════════════════
  { d:"M 44 386 L 14 394 L 0 400 L 14 406 L 44 414",
    stroke:RED, width:1.8, opacity:0.46, delay:3.4,  dur:1.6, glow:true  },
  { d:"M 44 386 L 18 398 L 0 400 L 18 402 L 44 414",
    stroke:WHT, width:0.5, opacity:0.18, delay:3.5,  dur:1.6, glow:false },
  { d:"M 20 393 L 6 386 L 0 400 L 6 390",
    stroke:RED, width:1.0, opacity:0.30, delay:3.7,  dur:1.0, glow:false },
  { d:"M 20 407 L 6 414 L 0 400 L 6 410",
    stroke:RED, width:1.0, opacity:0.30, delay:3.7,  dur:1.0, glow:false },
  { d:"M 1396 386 L 1426 394 L 1440 400 L 1426 406 L 1396 414",
    stroke:RED, width:1.8, opacity:0.46, delay:3.4,  dur:1.6, glow:true  },
  { d:"M 1396 386 L 1422 398 L 1440 400 L 1422 402 L 1396 414",
    stroke:WHT, width:0.5, opacity:0.18, delay:3.5,  dur:1.6, glow:false },
  { d:"M 1420 393 L 1434 386 L 1440 400",
    stroke:RED, width:1.0, opacity:0.30, delay:3.7,  dur:1.0, glow:false },
  { d:"M 1420 407 L 1434 414 L 1440 400",
    stroke:RED, width:1.0, opacity:0.30, delay:3.7,  dur:1.0, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // LONG OUTER SWEEPS — gentle arcs that trace the full design boundary
  // ═══════════════════════════════════════════════════════════════
  { d:"M 720 220 C 580 206 400 218 240 254 S 80 300 0 400",
    stroke:RED, width:1.0, opacity:0.22, delay:3.9,  dur:3.2, glow:false },
  { d:"M 720 220 C 860 206 1040 218 1200 254 S 1360 300 1440 400",
    stroke:RED, width:1.0, opacity:0.22, delay:3.9,  dur:3.2, glow:false },
  { d:"M 720 580 C 580 594 400 582 240 546 S 80 500 0 400",
    stroke:RED, width:1.0, opacity:0.22, delay:4.1,  dur:3.2, glow:false },
  { d:"M 720 580 C 860 594 1040 582 1200 546 S 1360 500 1440 400",
    stroke:RED, width:1.0, opacity:0.22, delay:4.1,  dur:3.2, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // SPEED LINES — fine radiating lines from top/bottom spike tips
  // ═══════════════════════════════════════════════════════════════
  { d:"M 714 80 L 660 88 L 600 100",   stroke:RED, width:0.8, opacity:0.24, delay:4.4, dur:1.4, glow:false },
  { d:"M 726 80 L 780 88 L 840 100",   stroke:RED, width:0.8, opacity:0.24, delay:4.4, dur:1.4, glow:false },
  { d:"M 714 760 L 660 752 L 600 740", stroke:RED, width:0.8, opacity:0.24, delay:4.4, dur:1.4, glow:false },
  { d:"M 726 760 L 780 752 L 840 740", stroke:RED, width:0.8, opacity:0.24, delay:4.4, dur:1.4, glow:false },

  // ═══════════════════════════════════════════════════════════════
  // GHOST ECHO — faint outer repeat for depth
  // ═══════════════════════════════════════════════════════════════
  { d:"M 720 196 L 966 400 L 720 604 L 474 400 Z",
    stroke:RED, width:0.3, opacity:0.10, delay:4.8,  dur:2.8, glow:false },
];

// Speed factor: compress draw time to ~4s, hold 2s, total cycle ~6s
const SPEED = 0.5;
const CYCLE_MS = 6_000;

export default function HeroPinstripe() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setCycle(c => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="ps-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="2.2 0 0 0 0.7  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="rg" />
          <feMerge><feMergeNode in="rg"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {strokes.map((s, i) => (
        <motion.path
          key={`${cycle}-${i}`}
          d={s.d}
          stroke={s.stroke}
          strokeWidth={s.width}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={s.opacity}
          filter={s.glow ? "url(#ps-glow)" : undefined}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: s.dur * SPEED, delay: s.delay * SPEED, ease: BE }}
        />
      ))}
    </svg>
  );
}
