"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";
import { ArrowRight } from "@/components/Icons";

export default function CTABanner() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #6B4F33 0%, #543d27 55%, #3a2a19 100%)" }}
    >
      <StitchSeam tone="cream" />

      {/* Camo texture — reads as branded hide */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.13] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url(/camo.svg)", backgroundSize: "560px" }}
      />

      {/* Drifting camo wash for depth */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -inset-y-[10%] bg-cover bg-center opacity-[0.10] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url(/camo.svg)", backgroundSize: "720px", y: ghostY }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-[#F2EEE6]/55 text-xs tracking-[0.34em] uppercase mb-6"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          <span className="w-8 h-px bg-[#C7B291]/45" />
          Made to Order
          <span className="w-8 h-px bg-[#C7B291]/45" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#F2EEE6] text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.02em] mb-2"
          style={{ fontFamily: "var(--font-roboto-slab)" }}
        >
          Your Design.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#C7B291] text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.02em] mb-9"
          style={{ fontFamily: "var(--font-roboto-slab)" }}
        >
          Our Craft.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-[#F2EEE6]/70 text-base leading-[1.7] max-w-md mx-auto mb-11"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Upload your logo or pick a ready-made design. Every leather patch is
          stitched on by hand — one hat or a hundred, with bulk pricing built in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/custom-order"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-[#F2EEE6] hover:bg-[#3E4B34] text-[#3a2a19] hover:text-[#F2EEE6] px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#543d27]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 -left-1/3 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent -translate-x-[250%] group-hover:translate-x-[550%] transition-transform duration-[900ms] ease-out"
            />
            <span className="relative flex items-center gap-3">
              Build a Custom Patch
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/shop"
            className="group inline-flex items-center justify-center gap-3 border border-[#F2EEE6]/40 hover:border-[#F2EEE6] text-[#F2EEE6]/80 hover:text-[#F2EEE6] px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#543d27]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Shop the Collection
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
