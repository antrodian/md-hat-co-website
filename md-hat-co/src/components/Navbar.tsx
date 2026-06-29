"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#2B2520]/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.jpg"
            alt="MD Hat Co."
            width={44}
            height={44}
            className="rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span
            className="font-heading font-bold text-[#F2E9DD] tracking-widest text-sm uppercase"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            MD Hat Co.
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {["Shop", "About", "Custom Order", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-[#F2E9DD]/70 hover:text-[#C67C3D] transition-colors duration-300 text-xs tracking-[0.15em] uppercase font-medium"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/shop"
            className="bg-[#8B1D1D] hover:bg-[#C67C3D] text-[#F2E9DD] text-xs tracking-[0.15em] uppercase font-semibold px-5 py-2.5 transition-colors duration-300"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Shop Hats →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#F2E9DD] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#F2E9DD] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#F2E9DD] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#2B2520] px-6 py-4 flex flex-col gap-4">
          {["Shop", "About", "Custom Order", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMenuOpen(false)}
              className="text-[#F2E9DD]/80 hover:text-[#C67C3D] text-sm tracking-widest uppercase"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
