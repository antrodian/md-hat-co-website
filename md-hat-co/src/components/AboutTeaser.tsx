"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";

function WorkshopSVG() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-20">
      {/* Simple leather stamp tool silhouette */}
      <rect x="28" y="2" width="8" height="28" rx="4" fill="#C67C3D" />
      <rect x="20" y="28" width="24" height="8" rx="2" fill="#C67C3D" />
      <ellipse cx="32" cy="50" rx="12" ry="10" fill="#C67C3D" />
      <rect x="22" y="36" width="20" height="14" rx="1" fill="#C67C3D" />
    </svg>
  );
}

export default function AboutTeaser() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const quoteWords = "She couldn't find a hat worth wearing. So she made one.".split(" ");

  return (
    <section className="relative py-24 px-6 bg-[#F2E9DD]">
      <StitchSeam />
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 bg-[#3B2314]/10 flex items-center justify-center flex-col gap-3">
                <WorkshopSVG />
                <p
                  className="text-[#8C857C] text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Workshop Photo
                </p>
              </div>
              {/* Leather tan tint overlay on hover */}
              <div className="absolute inset-0 bg-[#C67C3D]/0 hover:bg-[#C67C3D]/5 transition-[background-color] duration-500" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#C67C3D]/50" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#C67C3D]/50" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#C67C3D]/50" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#C67C3D]/50" />
            </div>
          </motion.div>

          {/* Text side */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 text-[#C67C3D] text-xs tracking-[0.4em] uppercase mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <span className="w-8 h-px bg-[#C67C3D]/55" />
              The Story
            </motion.p>

            {/* Pull quote — word-by-word stagger */}
            <div
              className="text-[#2B2520] text-3xl sm:text-4xl font-bold leading-tight mb-8 border-l-2 border-[#C67C3D] pl-6 flex flex-wrap gap-x-3 gap-y-1"
              style={{ fontFamily: "var(--font-zilla)", fontWeight: 600 }}
            >
              {quoteWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.48,
                    delay: 0.22 + i * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.58, ease: "easeOut" }}
              className="text-[#8C857C] text-sm leading-[1.8] mb-8 max-w-md"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              MD Hat Co. started with a simple frustration: every hat on the shelf
              looked the same. Morgan began cutting her own leather patches,
              pressing her own designs, and hand-stitching them onto quality
              blanks. One hat became ten. Ten became a business.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="text-[#8C857C] text-sm leading-[1.8] mb-10 max-w-md"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Every hat leaves the workshop with something you can&apos;t buy off
              a rack — the evidence of actual hands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.82 }}
            >
              <a
                href="/about"
                className="group inline-flex items-center gap-3 text-[#3B2314] text-xs tracking-[0.25em] uppercase font-semibold border-b border-[#C67C3D] pb-1 hover:text-[#C67C3D] cursor-pointer transition-colors duration-300"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Read the Full Story
                <span className="transition-[transform] duration-300 group-hover:translate-x-1" style={{ display: "inline-block" }}>→</span>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
