"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Nae",
    role: "Local Guide · 14 reviews",
    text: "Kustom Colour Design saw my vision and worked tirelessly with me on the design until I was 100% happy. This was a passion project and they delivered beyond expectation.",
  },
  {
    name: "Paige Sutton",
    role: "Verified Customer",
    text: "Great product and service. Very professional and does an amazing job. Highly recommend.",
  },
  {
    name: "James House",
    role: "Verified Customer",
    text: "Anthony did an amazing job on our hand painted heritage signs at Brooklyn House — finished and installed on time. Great work.",
  },
  {
    name: "Jaidon Poole",
    role: "Verified Customer",
    text: "Quality workmanship, always delivers on time. Top bloke. The fleet of sign-written trucks look consistent and great.",
  },
  {
    name: "Joel Davies",
    role: "8 reviews · Bright Spark Services",
    text: "Above and beyond — highest quality work. Look forward to working with you again soon.",
  },
  {
    name: "asbulldogz",
    role: "Local Guide · 39 reviews",
    text: "Second to none — service, advice, and workmanship. Wouldn't hesitate to use them again or recommend to anyone wanting quality work. 10/10.",
  },
  {
    name: "Chris Nitschke",
    role: "Verified Customer",
    text: "Fantastic — a true artist. The work is second to none. The passion and hard work shows. Recommend 100%.",
  },
  {
    name: "Vipul Patel",
    role: "Verified Customer",
    text: "Great experience. The staff were friendly and knowledgeable, helping me choose the perfect look. Quality is excellent. Will definitely return.",
  },
  {
    name: "T J",
    role: "Decoy Café, Scarness",
    text: "From initial consultation to design and proofing, the professional approach and communication was outstanding. We love our new café signage.",
  },
  {
    name: "Ronnie Roos",
    role: "7 reviews",
    text: "Stickers, signs and painted images on concrete — quality excellent, quick turnaround. He listens to what I want and I love his style of graphics! Recommended A+++.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-[#FE0101]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-36 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#FE0101] block mb-4">
              Client Reviews
            </span>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-none text-white tracking-wide">
              15 REVIEWS.
              <br />
              <span className="text-[#FE0101]">15 STARS.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-display text-5xl text-white">5.0</div>
              <div className="flex justify-end mt-1">
                <StarRating />
              </div>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-1">
                Google Business
              </p>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1A1A]"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariants}
              className="bg-[#0D0D0D] p-7 md:p-8 hover:bg-[#111111] transition-colors duration-300 group"
            >
              <StarRating />
              <p className="text-white/60 text-sm leading-relaxed mt-4 mb-6 group-hover:text-white/75 transition-colors duration-200">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#1A1A1A] group-hover:border-[#FE0101]/20 transition-colors duration-200">
                <div className="w-8 h-8 rounded-full bg-[#FE0101]/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-sm text-[#FE0101]">
                    {review.name[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{review.name}</p>
                  <p className="text-white/30 text-xs">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Final CTA card */}
          <motion.div
            variants={cardVariants}
            className="bg-[#FE0101] p-7 md:p-8 flex flex-col justify-between cursor-pointer hover:bg-white group transition-colors duration-300"
          >
            <div>
              <span className="font-display text-4xl text-white group-hover:text-black block leading-none transition-colors duration-300">
                YOUR
                <br />
                REVIEW
                <br />
                NEXT.
              </span>
            </div>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-white group-hover:text-black font-semibold text-sm tracking-widest uppercase transition-colors duration-300"
            >
              Work With Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
