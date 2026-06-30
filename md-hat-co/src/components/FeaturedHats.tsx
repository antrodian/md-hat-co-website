"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Antlers, ArrowRight } from "@/components/Icons";
import StitchSeam from "@/components/StitchSeam";

const SOLO = "/products/ChatGPT Image Jun 29, 2026 at 02_00_31 PM.png";
const TRIO = "/products/ChatGPT Image Jun 29, 2026 at 02_00_35 PM.png";

// Demo lineup — the blaze duck-camo trucker is the live SKU; additional
// colorways/photography drop in here as they're shot.
const HATS = [
  { id: 1, name: "The Blaze 112", patch: "Antler", color: "Blaze Camo", price: "$42", img: SOLO, tag: "Bestseller" },
  { id: 2, name: "Backcountry",   patch: "Antler", color: "Blaze Camo", price: "$42", img: TRIO, tag: null },
  { id: 3, name: "Marsh King",    patch: "Antler", color: "Blaze Camo", price: "$44", img: SOLO, tag: "New" },
  { id: 4, name: "Timberline",    patch: "Antler", color: "Blaze Camo", price: "$44", img: TRIO, tag: null },
];

function HatCard({ hat, index, show }: { hat: (typeof HATS)[0]; index: number; show: boolean }) {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(mvX, { stiffness: 150, damping: 15 });
  const rotateX = useSpring(mvY, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    mvY.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => { mvX.set(0); mvY.set(0); };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={show ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : {}}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.08 },
        clipPath: { duration: 0.65, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group"
    >
      <Link href="/shop" className="block cursor-pointer focus-visible:outline-none">
        <div className="relative overflow-hidden bg-gradient-to-b from-white to-[#EDE6D8] aspect-square mb-4 border border-[#6B4F33]/12 group-hover:border-[#6A6F43]/55 transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-20px_rgba(46,37,27,0.45)] group-focus-visible:ring-2 group-focus-visible:ring-[#6A6F43]">
          <Image
            src={hat.img}
            alt={`${hat.name} — ${hat.color} trucker with leather ${hat.patch} patch`}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {hat.tag && (
            <span
              className={`absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 text-[#F2EEE6] ${
                hat.tag === "New" ? "bg-[#6A6F43]" : "bg-[#3E4B34]"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {hat.tag}
            </span>
          )}

          {/* View bar — moss slide-up */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#3E4B34] text-[#F2EEE6] flex items-center justify-center gap-2 py-3 text-xs tracking-[0.15em] uppercase translate-y-full group-hover:translate-y-0"
            style={{ fontFamily: "var(--font-montserrat)", transition: "transform 0.42s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            View Hat <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="px-0.5">
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3
              className="text-[#2E251B] font-extrabold text-sm tracking-wide uppercase"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              {hat.name}
            </h3>
            <span
              className="text-[#3E4B34] font-bold text-sm shrink-0"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {hat.price}
            </span>
          </div>
          <p
            className="text-[#2E251B]/55 text-[0.7rem] tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {hat.patch} Patch · {hat.color}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedHats() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  // One observer on the grid drives the staggered card reveal — per-card
  // observers proved unreliable on mobile (left column failed to latch).
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-6 bg-[#F2EEE6]">
      <StitchSeam />
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center gap-2.5 text-[#6B4F33] text-xs tracking-[0.34em] uppercase mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <Antlers className="w-5 h-5 text-[#6A6F43]" />
            Featured Collection
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 70, opacity: 0 }}
              animate={titleInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#2E251B] text-4xl sm:text-5xl font-black tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              This Season&apos;s Lineup
            </motion.h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 w-16 h-[3px] bg-[#6A6F43] mx-auto"
            style={{ transformOrigin: "center" }}
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HATS.map((hat, i) => (
            <HatCard key={hat.id} hat={hat} index={i} show={gridInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-center mt-14"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 border border-[#2E251B] text-[#2E251B] hover:bg-[#2E251B] hover:text-[#F2EEE6] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EEE6]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            View All Hats
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
