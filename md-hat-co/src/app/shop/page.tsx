import Navbar from "@/components/Navbar";
import ShopGrid, { DEMO_HATS } from "@/components/ShopGrid";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import type { Hat } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop — MD Hat Company",
  description:
    "Browse every MD Hat Company hat. Premium blank caps finished with hand-tooled leather patches. Built for the hunt.",
};

async function getHats(): Promise<Hat[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return DEMO_HATS;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hats")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error || !data) return DEMO_HATS;
  return data as Hat[];
}

export default async function ShopPage() {
  const hats = await getHats();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F2EEE6]">
        <ShopGrid hats={hats} />
      </main>
      <Footer />
    </>
  );
}
