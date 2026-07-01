"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart/CartContext";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center bg-[#211A12] px-6 py-32">
        <div className="text-center max-w-md">
          <div className="w-16 h-px bg-[#6A6F43] mx-auto mb-8" />
          <h1
            className="text-[#F2EEE6] text-3xl font-black uppercase tracking-tight mb-4"
            style={{ fontFamily: "var(--font-roboto-slab)" }}
          >
            Order Confirmed.
          </h1>
          <p
            className="text-[#F2EEE6]/60 text-sm leading-[1.8] mb-8"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Thanks for your order — a receipt is on its way to your inbox.
            We&apos;ll follow up personally with shipping details soon.
          </p>
          <Link
            href="/shop"
            className="text-[#C7B291] text-xs tracking-[0.24em] uppercase border-b border-[#6B4F33] hover:border-[#6A6F43] hover:text-[#F2EEE6] transition-colors duration-200"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
