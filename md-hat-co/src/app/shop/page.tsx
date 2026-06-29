import Navbar from "@/components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — MD Hat Co.",
  description:
    "Browse all leather patch hats. Premium quality, hand-crafted patches on quality blanks.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F2E9DD]">
        <ShopGrid />
      </main>
    </>
  );
}
