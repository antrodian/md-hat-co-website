import Navbar from "@/components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — MD Hat Company",
  description:
    "Browse every MD Hat Company hat. Premium blank caps finished with hand-tooled leather patches. Built for the hunt.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F2EEE6]">
        <ShopGrid />
      </main>
      <Footer />
    </>
  );
}
