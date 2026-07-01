"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Antlers } from "@/components/Icons";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const leatherY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  const words = "She couldn't find a hat worth wearing.".split(" ");

  return (
    <section ref={sectionRef} className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#211A12]">
      {/* Leather texture — grounds the story page in the material itself */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -top-[10%] -bottom-[10%] bg-cover bg-center"
        style={{ backgroundImage: "url(/leather.jpg)", y: leatherY }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(33,26,18,0.55) 0%, rgba(33,26,18,0.75) 55%, #211A12 100%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 text-[#C7B291] text-xs tracking-[0.34em] uppercase mb-6"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          <Antlers className="w-5 h-5 text-[#6A6F43]" />
          Our Story
        </motion.p>

        <h1
          className="text-[#F2EEE6] text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.03] tracking-[-0.02em] max-w-3xl flex flex-wrap gap-x-4 gap-y-1"
          style={{ fontFamily: "var(--font-roboto-slab)" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + words.length * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block text-[#6A6F43]"
          >
            So she made one.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-[#F2EEE6]/55 text-sm tracking-[0.2em] uppercase mt-8"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Est. 2023 · Tennessee
        </motion.p>
      </div>
    </section>
  );
}
