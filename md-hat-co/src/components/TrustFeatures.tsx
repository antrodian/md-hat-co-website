"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Patch, Duck } from "@/components/Icons";

const FEATURES = [
  {
    Icon: Compass,
    title: "Premium Quality",
    body: "Top brands and durable materials. Every hat is built on a blank chosen to hold up in the field.",
  },
  {
    Icon: Patch,
    title: "Custom Patches",
    body: "Your design, our craftsmanship. Each leather patch is hand-tooled and stitched on by hand.",
  },
  {
    Icon: Duck,
    title: "Made for Hunters",
    body: "Rooted in hunting tradition and Southern heritage. Built for the hunt — and made to last.",
  },
];

export default function TrustFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-[#F2EEE6] px-6 py-16 sm:py-20 border-b border-[#6B4F33]/12">
      <div ref={ref} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:divide-x md:divide-[#6B4F33]/15">
        {FEATURES.map(({ Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-0 md:px-9 lg:px-12 text-center md:text-left"
          >
            <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#3E4B34]/8 text-[#3E4B34]">
              <Icon className="w-8 h-8" />
            </div>
            <h3
              className="text-[#2E251B] text-lg font-extrabold tracking-[0.01em] uppercase mb-2.5"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              {title}
            </h3>
            <p
              className="text-[#2E251B]/60 text-sm leading-[1.75] max-w-xs mx-auto md:mx-0"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
