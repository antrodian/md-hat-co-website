"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Antlers, OakLeaf, Duck } from "@/components/Icons";

const VALUES = [
  {
    icon: Compass,
    title: "Built for the Outdoors",
    body: "Every hat has to survive a real trail, a real duck blind, a real Tennessee summer — not just a shelf.",
  },
  {
    icon: Antlers,
    title: "A Mark That Means Something",
    body: "The antler isn't decoration. It's the same mark Morgan burned into the first patch she ever sold.",
  },
  {
    icon: OakLeaf,
    title: "Real Materials, No Shortcuts",
    body: "Full-grain leather and trusted blanks. Nothing printed, nothing rubber, nothing that peels.",
  },
  {
    icon: Duck,
    title: "Southern Roots",
    body: "Hunting tradition runs through the brand the way it runs through the family that started it.",
  },
];

export default function AboutValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 px-6 bg-[#211A12] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: "url(/camo-light.svg)", backgroundSize: "600px" }}
      />
      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 text-[#C7B291] text-xs tracking-[0.34em] uppercase mb-4"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          <span className="w-8 h-px bg-[#6A6F43]/55" />
          What We Believe
        </motion.p>
        <h2
          className="text-[#F2EEE6] text-3xl sm:text-4xl font-black tracking-[-0.02em] mb-14 max-w-lg"
          style={{ fontFamily: "var(--font-roboto-slab)" }}
        >
          Nothing on this hat is an accident.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <v.icon className="w-9 h-9 text-[#6A6F43] mb-5" />
              <h3
                className="text-[#F2EEE6] text-base font-extrabold mb-3 tracking-wide"
                style={{ fontFamily: "var(--font-roboto-slab)" }}
              >
                {v.title}
              </h3>
              <p
                className="text-[#F2EEE6]/55 text-sm leading-[1.7]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
