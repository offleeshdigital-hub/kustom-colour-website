"use client";

import { motion } from "framer-motion";

const services = [
  {
    name: "Complete Signage",
    desc: "End-to-end signage solutions — from concept and design to fabrication and installation.",
    size: "large",
  },
  {
    name: "Vehicle Wraps",
    desc: "Full and partial wraps that turn your fleet into moving billboards.",
    size: "small",
  },
  {
    name: "Airbrushing & Murals",
    desc: "Custom airbrushed artwork and large-format murals — walls, vehicles, helmets.",
    size: "small",
  },
  {
    name: "Hand-Painted Signwriting",
    desc: "Traditional craft with a modern edge. Lettering that no machine can replicate.",
    size: "medium",
  },
  {
    name: "Pinstriping",
    desc: "Old-school artistry applied to vehicles, panels and show pieces.",
    size: "medium",
  },
  {
    name: "Graphic Design & Logos",
    desc: "Brand identity built to last — logos, layouts and visual systems.",
    size: "small",
  },
  {
    name: "Shop Fronts",
    desc: "Storefront graphics and window treatments that demand attention.",
    size: "small",
  },
  {
    name: "3D & Routered Lettering",
    desc: "Dimensional letters and cut signage with real physical presence.",
    size: "small",
  },
  {
    name: "Business Cards & Print",
    desc: "Premium print collateral that reflects the quality of your brand.",
    size: "small",
  },
  {
    name: "Caravan Graphics",
    desc: "Custom livery for caravans and RVs — personal or commercial.",
    size: "small",
  },
  {
    name: "Flags & Banners",
    desc: "Large-format promotional flags and banners for events and retail.",
    size: "small",
  },
  {
    name: "Stickers & Graphics",
    desc: "Cut and printed stickers for any application — indoor or outdoor.",
    size: "small",
  },
  {
    name: "One-Way Window Vinyl",
    desc: "Privacy and branding in one — see out, brand in.",
    size: "small",
  },
  {
    name: "Promotional Products",
    desc: "Branded merchandise and custom promo items for your business.",
    size: "small",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Services() {
  const featured = services.slice(0, 3);
  const rest = services.slice(3);

  return (
    <section id="services" className="py-24 md:py-36 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#FE0101] block mb-4">
              What We Do
            </span>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-none text-white tracking-wide">
              THE FULL
              <br />
              <span className="text-[#797979]">SPECTRUM.</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-xs text-sm leading-relaxed md:text-right">
            From traditional handcraft to digital precision — if it carries your
            brand, we make it extraordinary.
          </p>
        </div>

        {/* Featured top row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1F1F1F] mb-px"
        >
          {featured.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              className="bg-[#0D0D0D] p-8 md:p-10 group cursor-pointer hover:bg-[#141414] transition-colors duration-300"
            >
              <div className="w-8 h-px bg-[#FE0101] mb-6 group-hover:w-16 transition-all duration-300" />
              <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white mb-3 group-hover:text-[#FE0101] transition-colors duration-300">
                {service.name.toUpperCase()}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Rest grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-[#1F1F1F]"
        >
          {rest.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              className="bg-[#0D0D0D] p-6 md:p-8 group cursor-pointer hover:bg-[#141414] transition-colors duration-300"
            >
              <div className="w-6 h-px bg-[#FE0101]/50 mb-4 group-hover:w-12 group-hover:bg-[#FE0101] transition-all duration-300" />
              <h3 className="font-display text-lg md:text-xl tracking-wide text-white/80 group-hover:text-white transition-colors duration-200">
                {service.name.toUpperCase()}
              </h3>
              <p className="text-white/30 text-xs leading-relaxed mt-2 group-hover:text-white/50 transition-colors duration-200">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted brands */}
        <div className="mt-16 pt-12 border-t border-[#1F1F1F]">
          <p className="text-xs tracking-[0.3em] uppercase text-white/20 mb-6 text-center">
            Trusted Materials
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {["ARLON", "ORACAL", "AVERY DENNISON", "3M"].map((brand) => (
              <span
                key={brand}
                className="font-display text-xl md:text-2xl tracking-[0.2em] text-white/15 hover:text-white/40 transition-colors duration-200 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
