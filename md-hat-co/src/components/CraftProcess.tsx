"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";

const STEPS = [
  {
    num: "01",
    label: "Source",
    headline: "The Right Blank",
    body: "Every hat starts with a quality base. We hand-select blanks built to last — structured brims, clean profiles, materials that age well.",
  },
  {
    num: "02",
    label: "Design",
    headline: "The Patch Pattern",
    body: "Each leather patch is sketched and refined before a single tool touches hide. The design has to earn its place on the hat.",
  },
  {
    num: "03",
    label: "Craft",
    headline: "Cut & Stamp",
    body: "Full-grain leather, cut by hand. Every stamp pressed with intention. The burn marks and tool lines are the signature — not a flaw.",
  },
  {
    num: "04",
    label: "Finish",
    headline: "Hand Stitched",
    body: "Patch meets hat with a stitch that won't quit. Tight, clean, permanent. You'll wear this hat out before it falls apart.",
  },
];

function Step({ step, index, lineInView }: { step: (typeof STEPS)[0]; index: number; lineInView: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={inView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : {}}
      transition={{
        opacity:  { duration: 0.55, delay: 0.35 + index * 0.09 },
        clipPath: { duration: 0.65, delay: 0.35 + index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      className="relative pt-8 pr-8"
    >
      {/* Dot on the drawing line — reveals with step */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={lineInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.28 + index * 0.3, type: "spring", stiffness: 350, damping: 20 }}
        className="absolute top-0 left-0 w-2.5 h-2.5 -translate-y-[5px] rounded-full bg-[#C67C3D]"
        style={{ boxShadow: "0 0 8px 2px rgba(198,124,61,0.45)" }}
      />

      <span
        className="block text-[#C67C3D]/50 text-[10px] tracking-[0.4em] uppercase mb-5"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {step.num} / {step.label}
      </span>

      <h3
        className="text-[#F2E9DD] text-xl font-bold mb-3 tracking-wide"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {step.headline}
      </h3>

      <p
        className="text-[#8C857C] text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {step.body}
      </p>
    </motion.div>
  );
}

export default function CraftProcess() {
  const sectionRef = useRef(null);
  const headRef  = useRef(null);
  const gridRef  = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const grainY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-[#2B2520] overflow-hidden">
      <StitchSeam />
      {/* Leather grain — material continuity with the hero, drifts on scroll */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -inset-y-[8%] bg-cover bg-center opacity-[0.10] pointer-events-none"
        style={{ backgroundImage: "url(/leather.jpg)", y: grainY }}
      />
      <div className="relative max-w-7xl mx-auto">

        <div ref={headRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-[#C67C3D] text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <span className="w-8 h-px bg-[#C67C3D]/55" />
            The Process
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={headInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#F2E9DD] text-4xl sm:text-5xl font-bold max-w-md tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-zilla)", fontWeight: 700 }}
            >
              How Every Hat Gets Made
            </motion.h2>
          </div>
        </div>

        {/* Grid with animated connector line */}
        <div ref={gridRef} className="relative">
          {/* Ghost track line */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-[#C67C3D]/12" />
          {/* Drawing line — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={gridInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-[#C67C3D]"
            style={{ transformOrigin: "left", opacity: 0.65 }}
          />
          {/* Ember tracing the timeline — a spark from the branding iron */}
          <motion.div
            aria-hidden
            className="hidden lg:block absolute top-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, #FFE3A0 0%, #C67C3D 55%, transparent 100%)",
              boxShadow: "0 0 10px 3px rgba(198,124,61,0.7)",
            }}
            initial={{ left: "0%", opacity: 0 }}
            animate={gridInView ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 2.0, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.4, delay: 1.6 }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {STEPS.map((step, i) => (
              <Step key={step.num} step={step} index={i} lineInView={gridInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
