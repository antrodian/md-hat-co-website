import Navbar from "@/components/Navbar";
import ShopGrid from "@/components/ShopGrid";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — MD Hat Company",
  description:
    "Browse every MD Hat Company hat. Quality Richardson and Yupoong blanks finished with real leather patches. Custom logos welcome, bulk pricing on 10+.",
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
