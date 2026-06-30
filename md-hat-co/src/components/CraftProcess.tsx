"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";
import { Stitch } from "@/components/Icons";

const STEPS = [
  {
    num: "01",
    label: "Source",
    headline: "The Right Blank",
    body: "Every hat starts with a trusted blank — Richardson 112 truckers chosen for fit, structure, and time spent in the field.",
  },
  {
    num: "02",
    label: "Design",
    headline: "The Patch",
    body: "Each leather patch is sketched and refined before a blade touches hide. The mark has to earn its place on the hat.",
  },
  {
    num: "03",
    label: "Craft",
    headline: "Cut & Tool",
    body: "Full-grain leather, cut and tooled by hand. The antler mark is burned and pressed with intention — every line on purpose.",
  },
  {
    num: "04",
    label: "Finish",
    headline: "Stitched On",
    body: "Patch meets hat with a stitch that won't quit. Tight, clean, permanent. Built for the hunt and made to last.",
  },
];

function Step({ step, index, lineInView }: { step: (typeof STEPS)[0]; index: number; lineInView: boolean }) {
  // Reveal is driven by the section's single grid observer (lineInView) —
  // per-step observers failed to latch the first column on mobile.
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={lineInView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : {}}
      transition={{
        opacity: { duration: 0.55, delay: 0.35 + index * 0.09 },
        clipPath: { duration: 0.65, delay: 0.35 + index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      className="relative pt-8 pr-8"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={lineInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.28 + index * 0.3, type: "spring", stiffness: 350, damping: 20 }}
        className="absolute top-0 left-0 w-2.5 h-2.5 -translate-y-[5px] rounded-full bg-[#6A6F43]"
        style={{ boxShadow: "0 0 8px 2px rgba(106,111,67,0.45)" }}
      />

      <span
        className="block text-[#C7B291]/65 text-[10px] tracking-[0.4em] uppercase mb-5"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {step.num} / {step.label}
      </span>

      <h3
        className="text-[#F2EEE6] text-xl font-extrabold mb-3 tracking-wide uppercase"
        style={{ fontFamily: "var(--font-roboto-slab)" }}
      >
        {step.headline}
      </h3>

      <p
        className="text-[#F2EEE6]/55 text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {step.body}
      </p>
    </motion.div>
  );
}

export default function CraftProcess() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const camoY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section id="process" ref={sectionRef} className="relative py-24 px-6 bg-[#2F3F2E] overflow-hidden">
      <StitchSeam />
      {/* Camo texture — material continuity, drifts on scroll */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -inset-y-[8%] bg-cover bg-center opacity-[0.14] pointer-events-none"
        style={{ backgroundImage: "url(/camo.svg)", backgroundSize: "640px", y: camoY }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div ref={headRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 text-[#C7B291] text-xs tracking-[0.34em] uppercase mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <Stitch className="w-6 h-6 text-[#6A6F43]" />
            The Process
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={headInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#F2EEE6] text-4xl sm:text-5xl font-black max-w-xl tracking-[-0.02em] leading-[1.05]"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              How Every Hat Gets Made
            </motion.h2>
          </div>
        </div>

        <div ref={gridRef} className="relative">
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-[#C7B291]/12" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={gridInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-[#6A6F43]"
            style={{ transformOrigin: "left", opacity: 0.6 }}
          />
          <motion.div
            aria-hidden
            className="hidden lg:block absolute top-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, #E4E0C8 0%, #6A6F43 55%, transparent 100%)",
              boxShadow: "0 0 10px 3px rgba(106,111,67,0.7)",
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
