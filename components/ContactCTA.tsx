"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-[#111111] relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FE0101]/[0.05] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FE0101]/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#FE0101] block mb-6">
                Get In Touch
              </span>
              <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-none text-white tracking-wide mb-8">
                READY TO
                <br />
                MAKE YOUR
                <br />
                <span className="text-[#FE0101]">MARK?</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-sm">
                Tell us about your project. Whether it&rsquo;s a single sticker or a
                complete brand rollout — every great sign starts with a
                conversation.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-[#FE0101]" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-white/30">
                      Location
                    </p>
                    <p className="text-white font-medium">
                      Hervey Bay, Queensland
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-px h-8 bg-[#FE0101]" />
                  <div>
                    <p className="text-xs tracking-widest uppercase text-white/30">
                      Social
                    </p>
                    <a
                      href="https://www.instagram.com/kustom_colour_design/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-[#FE0101] transition-colors duration-200 cursor-pointer"
                    >
                      @kustom_colour_design
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-widest uppercase text-white/40 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-[#0D0D0D] border border-[#1F1F1F] text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#FE0101] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-widest uppercase text-white/40 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-[#0D0D0D] border border-[#1F1F1F] text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#FE0101] transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-xs tracking-widest uppercase text-white/40 mb-2"
                >
                  Service Required
                </label>
                <select
                  id="service"
                  className="w-full bg-[#0D0D0D] border border-[#1F1F1F] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FE0101] transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="bg-[#0D0D0D]">
                    Select a service...
                  </option>
                  {[
                    "Complete Signage",
                    "Vehicle Wraps",
                    "Airbrushing & Murals",
                    "Hand-Painted Signwriting",
                    "Pinstriping",
                    "Graphic Design & Logos",
                    "Shop Fronts",
                    "3D & Routered Lettering",
                    "Business Cards & Print",
                    "Other",
                  ].map((s) => (
                    <option key={s} value={s} className="bg-[#0D0D0D]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs tracking-widest uppercase text-white/40 mb-2"
                >
                  Tell Us About Your Project
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Describe your project, timeline and any specific requirements..."
                  className="w-full bg-[#0D0D0D] border border-[#1F1F1F] text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#FE0101] transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FE0101] text-white font-semibold text-sm tracking-widest uppercase py-4 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
