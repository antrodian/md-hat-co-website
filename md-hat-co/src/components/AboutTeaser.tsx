"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";
import { ArrowRight } from "@/components/Icons";

const STORY_IMG = "/story-turkey-hunter.jpg";

export default function AboutTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const quoteWords = "She couldn't find a hat worth wearing. So she made one.".split(" ");

  return (
    <section id="story" className="relative py-24 px-6 bg-[#F2EEE6]">
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
            <div className="relative aspect-[4/5] bg-[#F0E8DC] overflow-hidden flex items-center justify-center">
              <Image
                src={STORY_IMG}
                alt="MD Hat Co. illustration — a hunter in MDHC camo kneeling behind a fanned wild turkey, EST. 2023 Tennessee"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-4"
              />
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#6A6F43]/55" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#6A6F43]/55" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#6A6F43]/55" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#6A6F43]/55" />
            </div>
          </motion.div>

          {/* Text side */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 text-[#6B4F33] text-xs tracking-[0.34em] uppercase mb-6 justify-center lg:justify-start"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <span className="w-8 h-px bg-[#6A6F43]/55" />
              The Story
            </motion.p>

            <div
              className="text-[#2E251B] text-3xl sm:text-4xl font-extrabold leading-tight mb-8 border-l-[3px] border-[#6A6F43] pl-6 flex flex-wrap gap-x-3 gap-y-1"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              {quoteWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.48, delay: 0.22 + i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              className="text-[#2E251B]/60 text-sm leading-[1.8] mb-8 max-w-md"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              MD Hat Company started with a simple frustration: every hat on the
              shelf looked the same. So Morgan began tooling her own leather
              patches, pressing her own marks, and stitching them onto quality
              blanks built for the outdoors. One hat became ten. Ten became a brand.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="text-[#2E251B]/60 text-sm leading-[1.8] mb-10 max-w-md"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Every hat leaves the shop carrying something you can&apos;t buy off a
              rack — the evidence of real hands, and a heritage built for the hunt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.82 }}
              className="flex justify-center lg:justify-start"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-[#2E251B] text-xs tracking-[0.24em] uppercase font-semibold border-b border-[#6A6F43] pb-1 hover:text-[#6A6F43] cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:text-[#6A6F43]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Read the Full Story
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
