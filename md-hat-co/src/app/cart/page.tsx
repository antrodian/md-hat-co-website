"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Antlers, ArrowRight } from "@/components/Icons";
import { useCart } from "@/lib/cart/CartContext";

export default function CartPage() {
  const { items, setQty, removeItem, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#F2EEE6] pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p
            className="flex items-center gap-2.5 text-[#6B4F33] text-xs tracking-[0.34em] uppercase mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <Antlers className="w-4 h-4 text-[#6A6F43]" />
            Ready When You Are
          </p>
          <h1
            className="text-[#2E251B] text-3xl sm:text-4xl font-black uppercase tracking-tight mb-10"
            style={{ fontFamily: "var(--font-roboto-slab)" }}
          >
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-[#2E251B]/60 text-sm mb-6"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Your cart is empty.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#3E4B34] hover:bg-[#6A6F43] text-[#F2EEE6] px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Shop Hats <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6 mb-10">
                {items.map((item) => (
                  <div
                    key={item.hatId}
                    className="flex items-center gap-5 border-b border-[#6B4F33]/15 pb-6"
                  >
                    <div className="relative w-20 h-20 shrink-0 bg-[#EDE6D8] overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-[#2E251B] font-extrabold text-sm uppercase tracking-wide mb-1"
                        style={{ fontFamily: "var(--font-roboto-slab)" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[#2E251B]/55 text-xs" style={{ fontFamily: "var(--font-montserrat)" }}>
                        ${item.price} each
                      </p>
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => setQty(item.hatId, Number(e.target.value))}
                      className="w-16 bg-transparent border border-[#6B4F33]/30 text-[#2E251B] text-center px-2 py-2 text-sm transition-colors duration-200 focus:outline-none focus:border-[#6A6F43] focus-visible:ring-2 focus-visible:ring-[#6A6F43]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    />
                    <span
                      className="text-[#3E4B34] font-bold text-sm w-16 text-right"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.hatId)}
                      aria-label={`Remove ${item.name}`}
                      className="text-[#2E251B]/40 hover:text-[#6B4F33] text-xs uppercase tracking-wide cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] rounded-sm"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-[#2E251B] text-sm tracking-[0.2em] uppercase font-semibold"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Subtotal
                </span>
                <span
                  className="text-[#2E251B] text-2xl font-black"
                  style={{ fontFamily: "var(--font-roboto-slab)" }}
                >
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {error && (
                <p className="text-[#6B4F33] text-sm mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#3E4B34] hover:bg-[#6A6F43] disabled:opacity-60 disabled:cursor-not-allowed text-[#F2EEE6] px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EEE6]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {loading ? "Redirecting..." : "Checkout"} <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
