"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Search, Cart, ArrowRight } from "@/components/Icons";
import { useCart } from "@/lib/cart/CartContext";

const NAV = [
  { label: "Shop Hats", href: "/shop" },
  { label: "Custom Patches", href: "/custom-order" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,border-color] duration-500 border-b ${
        scrolled
          ? "bg-[#211A12]/95 backdrop-blur-md py-3 shadow-[0_14px_40px_-22px_rgba(0,0,0,0.9)] border-[#6B4F33]/30"
          : "bg-gradient-to-b from-[#211A12]/70 to-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between gap-4">
        <Logo dark />

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-[#F2EEE6]/75 hover:text-[#F2EEE6] transition-colors duration-300 text-[0.7rem] tracking-[0.18em] uppercase font-semibold after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-[#6A6F43] hover:after:w-full after:transition-[width] after:duration-300 focus-visible:outline-none focus-visible:text-[#F2EEE6]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Utility icons */}
          <button
            aria-label="Search"
            className="hidden sm:grid place-items-center w-10 h-10 rounded-full text-[#F2EEE6]/80 hover:text-[#F2EEE6] hover:bg-[#F2EEE6]/8 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43]"
          >
            <Search className="w-[19px] h-[19px]" />
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative grid place-items-center w-10 h-10 rounded-full text-[#F2EEE6]/80 hover:text-[#F2EEE6] hover:bg-[#F2EEE6]/8 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43]"
          >
            <Cart className="w-[21px] h-[21px]" />
            {count > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#6A6F43] text-[#F2EEE6] text-[9px] font-bold grid place-items-center leading-none">
                {count}
              </span>
            )}
          </Link>

          {/* Primary CTA — moss, per brand UI */}
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 bg-[#3E4B34] hover:bg-[#6A6F43] text-[#F2EEE6] text-[0.7rem] tracking-[0.16em] uppercase font-semibold pl-5 pr-4 py-2.5 ml-1 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211A12]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Shop Hats <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2.5 ml-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-[2px] bg-[#F2EEE6] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#F2EEE6] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-[#F2EEE6] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-400 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#211A12] px-6 py-5 flex flex-col gap-4 border-t border-[#6B4F33]/30">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#F2EEE6]/85 hover:text-[#6A6F43] text-sm tracking-[0.15em] uppercase font-semibold transition-colors duration-200"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex items-center justify-center gap-2 bg-[#3E4B34] text-[#F2EEE6] text-xs tracking-[0.16em] uppercase font-semibold px-5 py-3 transition-colors duration-300"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Shop Hats <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
