import Navbar from "@/components/Navbar";
import CustomOrderForm from "@/components/CustomOrderForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Order | MD Hat Co.",
  description:
    "Design your own leather patch hat. Describe your patch, pick your hat, and Morgan will hand-craft it for you.",
};

export default function CustomOrderPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#2B2520] min-h-screen">

        {/* Page header */}
        <div className="pt-32 pb-16 px-6 border-b border-[#C67C3D]/10">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-[#C67C3D] text-[10px] tracking-[0.4em] uppercase mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              ★ Made To Order ★
            </p>
            <h1
              className="text-[#F2E9DD] text-4xl sm:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Build Your Hat.
            </h1>
            <p
              className="text-[#8C857C] text-sm leading-[1.8] max-w-lg"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Tell us what you want. Morgan cuts and stamps every leather patch
              by hand — so bring a detailed idea or a rough sketch. Either works.
            </p>
          </div>
        </div>

        {/* Form */}
        <CustomOrderForm />

      </main>
    </>
  );
}
