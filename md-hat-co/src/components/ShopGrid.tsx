"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Antlers, ArrowRight } from "@/components/Icons";

const SOLO = "/products/ChatGPT Image Jun 29, 2026 at 02_00_31 PM.png";
const TRIO = "/products/ChatGPT Image Jun 29, 2026 at 02_00_35 PM.png";

type Hat = {
  id: number;
  name: string;
  category: "Leather Patch" | "Camo" | "Name Hats" | "Pre-Designed";
  price: number;
  blank: "Richardson 112" | "Yupoong 6606";
  color: string;
  img: string;
  tag?: "Bestseller" | "New" | "Custom";
};

// Real MD Hat Co lines + colorways from mdhatco.com. Product photography
// drops into each card as it's shot.
const HATS: Hat[] = [
  { id: 1, name: "Custom Leather Patch", category: "Leather Patch", price: 27.99, blank: "Richardson 112", color: "Grey / Black",   img: SOLO, tag: "Bestseller" },
  { id: 2, name: "Custom Leather Patch", category: "Leather Patch", price: 27.99, blank: "Richardson 112", color: "Loden / Black",  img: TRIO },
  { id: 3, name: "Camo Leather Patch",   category: "Camo",          price: 29.99, blank: "Richardson 112", color: "Camo / Black",   img: SOLO, tag: "New" },
  { id: 4, name: "Custom Name Hat",      category: "Name Hats",     price: 27.99, blank: "Yupoong 6606",   color: "Black / Grey",   img: TRIO, tag: "Custom" },
  { id: 5, name: "Custom Leather Patch", category: "Leather Patch", price: 27.99, blank: "Yupoong 6606",   color: "Caramel / Black", img: SOLO },
  { id: 6, name: "Soccer Name Hat",      category: "Name Hats",     price: 27.99, blank: "Yupoong 6606",   color: "Grey / Green",   img: TRIO },
  { id: 7, name: "Camo Leather Patch",   category: "Camo",          price: 29.99, blank: "Richardson 112", color: "Grey / Orange",  img: SOLO, tag: "New" },
  { id: 8, name: "Hats for the People",  category: "Pre-Designed",  price: 27.99, blank: "Richardson 112", color: "Ready to Ship",  img: TRIO },
];

const CATEGORIES = ["All", "Leather Patch", "Camo", "Name Hats", "Pre-Designed"] as const;
const BLANKS = ["All", "Richardson 112", "Yupoong 6606"] as const;
const SORTS = ["Featured", "Price: Low to High", "Price: High to Low"] as const;

function HatCard({ hat }: { hat: Hat }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
      transition={{
        layout: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.5 },
        clipPath: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      className="group"
    >
      <Link href="/custom-order" className="block cursor-pointer focus-visible:outline-none">
        <div className="relative overflow-hidden bg-gradient-to-b from-white to-[#EDE6D8] aspect-[4/5] mb-4 border border-[#6B4F33]/12 group-hover:border-[#6A6F43]/55 transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-20px_rgba(46,37,27,0.45)] group-focus-visible:ring-2 group-focus-visible:ring-[#6A6F43]">
          <Image
            src={hat.img}
            alt={`${hat.name} — ${hat.color} ${hat.blank} with real leather patch`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {hat.tag && (
            <span
              className={`absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1 text-[#F2EEE6] ${
                hat.tag === "New" ? "bg-[#6A6F43]" : hat.tag === "Custom" ? "bg-[#6B4F33]" : "bg-[#3E4B34]"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {hat.tag}
            </span>
          )}

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
              className="text-[#3E4B34] font-bold text-sm shrink-0 tabular-nums"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              ${hat.price.toFixed(2)}
            </span>
          </div>
          <p
            className="text-[#2E251B]/55 text-[0.7rem] tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {hat.color} · {hat.blank}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function FilterRow({
  label, options, active, onSelect,
}: {
  label: string; options: readonly string[]; active: string; onSelect: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span
        className="text-[#2E251B]/55 text-[10px] tracking-[0.3em] uppercase w-12 shrink-0"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {label}
      </span>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => {
          const isActive = active === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-semibold cursor-pointer border transition-[color,background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EEE6] ${
                isActive
                  ? "bg-[#2E251B] text-[#F2EEE6] border-[#2E251B]"
                  : "bg-transparent text-[#2E251B] border-[#6B4F33]/30 hover:border-[#6A6F43] hover:text-[#3E4B34]"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ShopGrid() {
  const [category, setCategory] = useState<string>("All");
  const [blank, setBlank] = useState<string>("All");
  const [sort, setSort] = useState<string>("Featured");

  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-40px" });

  const filtered = useMemo(() => {
    let list = HATS.filter(
      (h) => (category === "All" || h.category === category) && (blank === "All" || h.blank === blank),
    );
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, blank, sort]);

  const clearFilters = () => { setCategory("All"); setBlank("All"); setSort("Featured"); };

  return (
    <>
      {/* Header band */}
      <section className="relative bg-[#211A12] pt-36 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.14] pointer-events-none"
          style={{ backgroundImage: "url(/camo.svg)", backgroundSize: "560px" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% -10%, rgba(106,111,67,0.18), transparent 70%)" }}
        />
        <div ref={headRef} className="relative max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 text-[#C7B291] text-xs tracking-[0.34em] uppercase mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <Antlers className="w-5 h-5 text-[#6A6F43]" />
            Every Hat We Make
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={headInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#F2EEE6] text-5xl sm:text-6xl font-black tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              The Full Rack
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[#F2EEE6]/60 text-sm leading-[1.8] mt-5 max-w-md"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Every hat starts as a quality blank and gets a real leather patch
            stitched on by hand. Pick a colorway, or upload your logo and build
            your own — bulk discounts on every order of 10 or more.
          </motion.p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-5 pb-8 mb-10 border-b border-[#6B4F33]/15">
            <FilterRow label="Type" options={CATEGORIES} active={category} onSelect={setCategory} />
            <FilterRow label="Blank" options={BLANKS} active={blank} onSelect={setBlank} />

            <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
              <motion.span
                key={filtered.length}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="text-[#2E251B]/55 text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {filtered.length} {filtered.length === 1 ? "Hat" : "Hats"}
              </motion.span>

              <label className="flex items-center gap-3">
                <span
                  className="text-[#2E251B]/55 text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent border border-[#6B4F33]/30 text-[#2E251B] text-[11px] tracking-[0.1em] uppercase px-3 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] hover:border-[#6A6F43] transition-[border-color] duration-300"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((hat) => (
                  <HatCard key={hat.id} hat={hat} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p
                className="text-[#2E251B] text-lg font-extrabold mb-2"
                style={{ fontFamily: "var(--font-roboto-slab)" }}
              >
                No hats match that combination.
              </p>
              <p
                className="text-[#2E251B]/55 text-sm mb-6"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Try loosening a filter — or start a custom build.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 border border-[#2E251B] text-[#2E251B] hover:bg-[#2E251B] hover:text-[#F2EEE6] px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
