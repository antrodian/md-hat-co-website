"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Patch, Duck } from "@/components/Icons";

const FEATURES = [
  {
    Icon: Patch,
    title: "Your Logo, Real Leather",
    body: "Upload your logo and we stitch it onto a genuine leather patch — six shapes, your choice of leather color, on a quality Richardson or Yupoong blank.",
  },
  {
    Icon: Compass,
    title: "Bulk Pricing",
    body: "Order 10 and save, order 100 and save more. The more hats you buy, the lower the price — built for teams, brands, and events.",
  },
  {
    Icon: Duck,
    title: "Born from Motion Ducks",
    body: "We started making custom hats for our own waterfowl brand. They were too good to keep to ourselves — so now we make them for everyone.",
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
