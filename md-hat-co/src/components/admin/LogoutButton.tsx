"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-[#F2EEE6]/60 hover:text-[#F2EEE6] text-xs tracking-[0.15em] uppercase transition-colors duration-200 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] rounded-sm px-1"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      Log Out
    </button>
  );
}
