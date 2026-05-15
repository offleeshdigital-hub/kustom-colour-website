"use client";

import { motion } from "framer-motion";
import TurbulentFlow from "@/components/TurbulentFlow";
import HeroPinstripe from "@/components/HeroPinstripe";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.4 + i * 0.18,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      {/* Turbulent flow shader background */}
      <TurbulentFlow />

      {/* Abstract pinstripe art */}
      <HeroPinstripe />

      {/* Background gradient wash over shader */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FE0101]/[0.04] via-transparent to-[#FE0101]/[0.02] pointer-events-none" />

      {/* Horizontal rule accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FE0101]/40 to-transparent" />


      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 md:pt-28">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mb-8 md:mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#FE0101] block" />
          <span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-white/40">
            Hervey Bay, Queensland · Est. 30+ Years
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden">
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-bungee text-[clamp(3.2rem,11vw,10.5rem)] leading-none tracking-tight text-white mb-2"
          >
            KUSTOM
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-bungee text-[clamp(3.2rem,11vw,10.5rem)] leading-none tracking-tight text-[#FE0101]"
          >
            COLOUR
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[clamp(2.6rem,7vw,7rem)] text-white/85 leading-none mt-1 mb-6 md:mb-8 pl-1"
            style={{ fontFamily: "'Ridenation', cursive", fontStyle: 'italic', transform: 'skewX(-6deg)', display: 'inline-block' }}
          >
            Design
          </motion.p>
        </div>

        {/* Sub-line + CTA row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="text-base md:text-xl text-white/50 font-light leading-relaxed max-w-md">
            Bespoke signage, airbrushing, vehicle wraps &amp; hand-painted art.
            <br />
            <span className="text-white/80 font-medium">
              Thirty years of craft. Zero compromise.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-[#FE0101] text-white font-semibold text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              Get a Quote
            </a>
            <a
              href="#services"
              className="inline-block px-8 py-4 border border-white/20 text-white font-semibold text-sm tracking-widest uppercase hover:border-[#FE0101] hover:text-[#FE0101] transition-colors duration-200 cursor-pointer"
            >
              Our Work
            </a>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 md:mt-20 pt-8 border-t border-[#1F1F1F] grid grid-cols-3 gap-6 md:gap-0 md:flex md:items-center md:gap-16"
        >
          {[
            { value: "30+", label: "Years Experience" },
            { value: "15", label: "Five-Star Reviews" },
            { value: "14+", label: "Service Categories" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-[#FE0101]">
                {stat.value}
              </span>
              <span className="text-xs text-white/40 tracking-widest uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D0D0D] to-transparent pointer-events-none" />
    </section>
  );
}
