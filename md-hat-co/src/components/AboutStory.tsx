"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";

const PARAGRAPHS = [
  `MD Hat Company started with a simple frustration: every hat on the shelf
   looked the same — same stitched-on patch, same rubber logo, same nothing.
   Morgan wanted a hat that actually said something. So she taught herself
   leather work.`,
  `The first patches were rough. Antlers cut a little crooked, stitching that
   wandered. She kept at it on the kitchen table between shifts, pressing
   marks into full-grain hide until the lines came out clean. Friends asked
   for their own. Then friends of friends.`,
  `One hat became ten. Ten became a brand. What hasn't changed is the
   standard: a trusted blank, hide worth tooling, and a stitch that won't
   quit. Every hat that leaves the shop still gets Morgan's hands on it
   before it gets yours.`,
];

export default function AboutStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 px-6 bg-[#F2EEE6]">
      <StitchSeam />
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div className="lg:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-[#6B4F33] text-xs tracking-[0.34em] uppercase mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <span className="w-8 h-px bg-[#6A6F43]/55" />
              How It Started
            </motion.p>

            <div className="flex flex-col gap-6 max-w-lg">
              {PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: "easeOut" }}
                  className="text-[#2E251B]/70 text-sm leading-[1.8]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-[#2E251B] text-lg mt-8 font-extrabold tracking-wide"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              — Morgan, Founder
            </motion.p>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[4/5] bg-[#211A12] overflow-hidden">
              <Image
                src="/story-turkey-hunter.jpg"
                alt="MD Hat Co. illustration — a hunter in an MDHC camo cap kneeling behind a fanned wild turkey, Est. 2023 Tennessee"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-6"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
