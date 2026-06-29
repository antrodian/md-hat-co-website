"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Hat = {
  id: number;
  name: string;
  patch: string;
  price: number;
  color: "Olive" | "Charcoal" | "Tan" | "Black";
  style: "Structured" | "Relaxed" | "Trucker";
  tag?: "Bestseller" | "New" | "Custom";
};

const HATS: Hat[] = [
  { id: 1, name: "Trail Boss",  patch: "Longhorn",   price: 65, color: "Olive",    style: "Structured", tag: "Bestseller" },
  { id: 2, name: "Ranch Hand",  patch: "Mountains",  price: 65, color: "Charcoal", style: "Trucker" },
  { id: 3, name: "Summit",      patch: "Pine Tree",  price: 70, color: "Tan",      style: "Structured", tag: "New" },
  { id: 4, name: "Drifter",     patch: "Custom",     price: 75, color: "Black",    style: "Relaxed",    tag: "Custom" },
  { id: 5, name: "Ridgeline",   patch: "Elk Skull",  price: 70, color: "Olive",    style: "Trucker" },
  { id: 6, name: "Lowland",     patch: "Wheat",      price: 65, color: "Tan",      style: "Relaxed" },
  { id: 7, name: "High Plains", patch: "Compass",    price: 72, color: "Charcoal", style: "Structured", tag: "New" },
  { id: 8, name: "Homestead",   patch: "Cabin",      price: 68, color: "Black",    style: "Trucker" },
];

const COLORS = ["All", "Olive", "Charcoal", "Tan", "Black"] as const;
const STYLES = ["All", "Structured", "Relaxed", "Trucker"] as const;
const SORTS = ["Featured", "Price: Low to High", "Price: High to Low"] as const;

// Swatch hexes for the color filter dots
const SWATCH: Record<string, string> = {
  Olive: "#5A5A3C",
  Charcoal: "#2B2520",
  Tan: "#C67C3D",
  Black: "#1A1714",
};

function HatSVG() {
  return (
    <svg width="72" height="54" viewBox="0 0 64 48" fill="none" className="opacity-25">
      <path d="M12 36 Q12 8 32 5 Q52 8 52 36 Z" fill="#C67C3D" />
      <ellipse cx="32" cy="37" rx="29" ry="6" fill="#C67C3D" />
    </svg>
  );
}

function HatCard({ hat }: { hat: Hat }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
      whileHover={{ scale: 1.022 }}
      whileTap={{ scale: 0.978 }}
      transition={{
        layout:    { type: "spring", stiffness: 320, damping: 30 },
        opacity:   { duration: 0.5 },
        clipPath:  { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        scale:     { type: "spring", stiffness: 280, damping: 22 },
      }}
      className="group cursor-pointer"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-[#3B2314]/10 aspect-[4/5] mb-4 border border-[#C67C3D]/10 group-hover:border-[#C67C3D]/35 transition-[border-color] duration-300">
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
          <HatSVG />
          <p
            className="text-[#8C857C] text-[10px] tracking-widest uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {hat.color}
          </p>
        </div>

        {/* Tag badge */}
        {hat.tag && (
          <span
            className="absolute top-3 left-3 bg-[#8B1D1D] text-[#F2E9DD] text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {hat.tag}
          </span>
        )}

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
            ${hat.price}
          </span>
        </div>
        <p
          className="text-[#8C857C] text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {hat.patch} Patch · {hat.style}
        </p>
      </div>
    </motion.div>
  );
}

function FilterRow({
  label,
  options,
  active,
  onSelect,
  swatches = false,
}: {
  label: string;
  options: readonly string[];
  active: string;
  onSelect: (v: string) => void;
  swatches?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span
        className="text-[#8C857C] text-[10px] tracking-[0.3em] uppercase w-12 shrink-0"
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
              className={`inline-flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-medium cursor-pointer border transition-[color,background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67C3D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2E9DD] ${
                isActive
                  ? "bg-[#3B2314] text-[#F2E9DD] border-[#3B2314]"
                  : "bg-transparent text-[#3B2314] border-[#C67C3D]/30 hover:border-[#C67C3D] hover:text-[#8B1D1D]"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {swatches && opt !== "All" && (
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: SWATCH[opt] }}
                />
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ShopGrid() {
  const [color, setColor] = useState<string>("All");
  const [style, setStyle] = useState<string>("All");
  const [sort, setSort] = useState<string>("Featured");

  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-40px" });

  const filtered = useMemo(() => {
    let list = HATS.filter(
      (h) => (color === "All" || h.color === color) && (style === "All" || h.style === style),
    );
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [color, style, sort]);

  const clearFilters = () => {
    setColor("All");
    setStyle("All");
    setSort("Featured");
  };

  return (
    <>
      {/* Header — charcoal band that clears the fixed navbar */}
      <section className="relative bg-[#2B2520] pt-36 pb-16 px-6 overflow-hidden">
        {/* Faint radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% -10%, rgba(198,124,61,0.14), transparent 70%)",
          }}
        />
        <div ref={headRef} className="relative max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#C67C3D] text-xs tracking-[0.4em] uppercase mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            ★ Every Hat We Make ★
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={headInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[#F2E9DD] text-5xl sm:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Full Rack
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[#8C857C] text-sm leading-[1.8] mt-5 max-w-md"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Every piece starts as a quality blank and earns its patch by hand. Pick a
            color, pick a profile — or bring your own design.
          </motion.p>
        </div>
      </section>

      {/* Filter bar + grid */}
      <section className="px-6 py-14">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col gap-5 pb-8 mb-10 border-b border-[#C67C3D]/15">
            <FilterRow label="Color" options={COLORS} active={color} onSelect={setColor} swatches />
            <FilterRow label="Style" options={STYLES} active={style} onSelect={setStyle} />

            {/* Count + sort */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
              <motion.span
                key={filtered.length}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className="text-[#8C857C] text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {filtered.length} {filtered.length === 1 ? "Hat" : "Hats"}
              </motion.span>

              <label className="flex items-center gap-3">
                <span
                  className="text-[#8C857C] text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent border border-[#C67C3D]/30 text-[#3B2314] text-[11px] tracking-[0.1em] uppercase px-3 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67C3D] hover:border-[#C67C3D] transition-[border-color] duration-300"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((hat) => (
                  <HatCard key={hat.id} hat={hat} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty state */
            <div className="text-center py-24">
              <p
                className="text-[#3B2314] text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                No hats match that combination.
              </p>
              <p
                className="text-[#8C857C] text-sm mb-6"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Try loosening a filter — or start a custom build.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 border border-[#3B2314] text-[#3B2314] hover:bg-[#3B2314] hover:text-[#F2E9DD] px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67C3D]"
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
