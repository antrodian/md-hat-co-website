"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";

export default function CTABanner() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section ref={sectionRef} className="relative py-28 px-6 bg-[#8B1D1D] overflow-hidden">
      <StitchSeam tone="cream" />

      {/* Leather grain — banner reads as branded hide */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.14] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url(/leather.jpg)" }}
      />

      {/* Giant branded longhorn behind the words */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl pointer-events-none"
        style={{ y: ghostY }}
      >
        <div className="relative w-full" style={{ aspectRatio: "568 / 260" }}>
          <Image
            src="/brand-mark.png"
            alt=""
            fill
            className="object-contain"
            style={{ filter: "brightness(0)", opacity: 0.13, mixBlendMode: "multiply" }}
          />
        </div>
      </motion.div>

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-[#F2E9DD]/50 text-xs tracking-[0.4em] uppercase mb-6"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          <span className="w-8 h-px bg-[#F2E9DD]/35" />
          Made To Order
          <span className="w-8 h-px bg-[#F2E9DD]/35" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#F2E9DD] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          style={{ fontFamily: "var(--font-zilla)", fontWeight: 700 }}
        >
          Your Head.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#C67C3D] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-10"
          style={{ fontFamily: "var(--font-zilla)", fontWeight: 700 }}
        >
          Our Leather.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-[#F2E9DD]/60 text-sm tracking-wide leading-relaxed max-w-md mx-auto mb-12"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Pick from the lineup or bring us your design.
          Every patch is cut, stamped, and stitched by hand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/shop"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-[#F2E9DD] hover:bg-[#C67C3D] text-[#8B1D1D] hover:text-[#F2E9DD] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 -left-1/3 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent -translate-x-[250%] group-hover:translate-x-[550%] transition-transform duration-[900ms] ease-out"
            />
            <span className="relative">Shop the Collection →</span>
          </a>
          <a
            href="/custom-order"
            className="inline-flex items-center justify-center gap-3 border border-[#F2E9DD]/40 hover:border-[#F2E9DD] text-[#F2E9DD]/70 hover:text-[#F2E9DD] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Build a Custom Patch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
