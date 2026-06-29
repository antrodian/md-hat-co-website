"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import StitchSeam from "@/components/StitchSeam";

const PLACEHOLDER_HATS = [
  { id: 1, name: "Trail Boss",  patch: "Longhorn",  price: "$65", color: "Olive" },
  { id: 2, name: "Ranch Hand",  patch: "Mountains", price: "$65", color: "Charcoal" },
  { id: 3, name: "Summit",      patch: "Pine Tree",  price: "$70", color: "Tan" },
  { id: 4, name: "Drifter",     patch: "Custom",    price: "$75", color: "Black" },
];

function HatSVG() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" fill="none" className="opacity-25">
      <path d="M12 36 Q12 8 32 5 Q52 8 52 36 Z" fill="#C67C3D" />
      <ellipse cx="32" cy="37" rx="29" ry="6" fill="#C67C3D" />
    </svg>
  );
}

function HatCard({ hat, index }: { hat: typeof PLACEHOLDER_HATS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Cursor-tracked 3D tilt
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(mvX, { stiffness: 150, damping: 15 });
  const rotateX = useSpring(mvY, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mvX.set(((e.clientX - r.left) / r.width  - 0.5) * 9);
    mvY.set(-((e.clientY - r.top)  / r.height - 0.5) * 9);
  };
  const onLeave = () => { mvX.set(0); mvY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={inView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : {}}
      transition={{
        opacity:  { duration: 0.6, delay: index * 0.08 },
        clipPath: { duration: 0.65, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group cursor-pointer"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-[#3B2314]/10 aspect-square mb-4 border border-[#C67C3D]/10 group-hover:border-[#C67C3D]/40 transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_45px_-18px_rgba(59,35,20,0.55)]">
        {/* Ghosted longhorn brand watermark */}
        <Image
          src="/brand-mark.png"
          alt=""
          fill
          aria-hidden
          className="object-contain p-10 opacity-0 group-hover:opacity-[0.10] transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
          <HatSVG />
          <p
            className="text-[#8C857C] text-[10px] tracking-widest uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {hat.color}
          </p>
        </div>

        {/* Hover depth overlay */}
        <div className="absolute inset-0 bg-[#2B2520]/0 group-hover:bg-[#2B2520]/15 transition-[background-color] duration-300" />

        {/* "View Hat" — spring slide */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#8B1D1D] text-[#F2E9DD] text-center py-3 text-xs tracking-widest uppercase translate-y-full group-hover:translate-y-0"
          style={{
            fontFamily: "var(--font-montserrat)",
            transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          View Hat →
        </div>
      </div>

      <div className="px-1">
        <div className="flex justify-between items-start mb-1">
          <h3
            className="text-[#3B2314] font-bold text-sm tracking-wider uppercase"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {hat.name}
          </h3>
          <span
            className="text-[#C67C3D] font-semibold text-sm"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {hat.price}
          </span>
        </div>
        <p
          className="text-[#8C857C] text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {hat.patch} Patch
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturedHats() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-24 px-6 bg-[#F2E9DD]">
      <StitchSeam />
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center gap-3 text-[#C67C3D] text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <span className="w-8 h-px bg-[#C67C3D]/55" />
            Featured Collection
            <span className="w-8 h-px bg-[#C67C3D]/55" />
          </motion.p>
          <motion.div
            className="overflow-hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={titleInView ? { clipPath: "inset(0 0 0% 0)" } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2
              className="text-[#2B2520] text-4xl sm:text-5xl font-bold tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-zilla)", fontWeight: 700 }}
            >
              The Lineup
            </h2>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-4 w-16 h-0.5 bg-[#C67C3D] mx-auto"
            style={{ transformOrigin: "center" }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PLACEHOLDER_HATS.map((hat, i) => (
            <HatCard key={hat.id} hat={hat} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-center mt-14"
        >
          <a
            href="/shop"
            className="inline-flex items-center gap-3 border border-[#3B2314] text-[#3B2314] hover:bg-[#3B2314] hover:text-[#F2E9DD] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer transition-colors duration-300"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            View All Hats →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
