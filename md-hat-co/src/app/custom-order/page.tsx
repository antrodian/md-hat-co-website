import Navbar from "@/components/Navbar";
import CustomOrderForm from "@/components/CustomOrderForm";
import Footer from "@/components/Footer";
import { Antlers } from "@/components/Icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Patches | MD Hat Company",
  description:
    "Design your own leather patch hat. Describe your patch, pick your cap, and we'll hand-tool and stitch it. Built for the hunt.",
};

export default function CustomOrderPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#211A12] min-h-screen">
        {/* Page header */}
        <div className="relative pt-32 pb-16 px-6 border-b border-[#6B4F33]/20 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.13] pointer-events-none"
            style={{ backgroundImage: "url(/camo.svg)", backgroundSize: "560px" }}
          />
          <div className="relative max-w-3xl mx-auto">
            <p
              className="flex items-center gap-2.5 text-[#C7B291] text-[0.7rem] tracking-[0.34em] uppercase mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <Antlers className="w-5 h-5 text-[#6A6F43]" />
              Made to Order
            </p>
            <h1
              className="text-[#F2EEE6] text-4xl sm:text-5xl font-black leading-[1.02] tracking-[-0.02em] mb-5"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              Build Your Hat.
            </h1>
            <p
              className="text-[#F2EEE6]/60 text-sm leading-[1.8] max-w-lg"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Tell us what you want. Every leather patch is cut and tooled by hand —
              so bring a detailed idea or a rough sketch. Either one works.
            </p>
          </div>
        </div>

        <CustomOrderForm />
      </main>
      <Footer />
    </>
  );
}
