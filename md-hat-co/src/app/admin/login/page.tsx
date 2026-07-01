"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/admin/inventory");
    router.refresh();
  };

  const labelClass = "block text-[#C7B291] text-[10px] tracking-[0.32em] uppercase mb-2";
  const inputClass =
    "w-full bg-[#1A140D] border border-[#6B4F33]/30 text-[#F2EEE6] px-4 py-3 text-sm placeholder-[#C7B291]/30 transition-colors duration-200 focus:outline-none focus:border-[#6A6F43] focus-visible:ring-2 focus-visible:ring-[#6A6F43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211A12]";

  return (
    <main className="min-h-screen bg-[#211A12] flex items-center justify-center px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: "url(/camo.svg)", backgroundSize: "560px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(106,111,67,0.16), transparent 70%)" }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm bg-[#251D14] border border-[#6B4F33]/25 p-8 sm:p-10 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)]"
      >
        <div className="flex justify-center mb-8">
          <Logo dark />
        </div>
        <p
          className="text-[#C7B291] text-[10px] tracking-[0.32em] uppercase text-center mb-8"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Owner Access
        </p>

        <div className="mb-5">
          <label className={labelClass} htmlFor="email" style={{ fontFamily: "var(--font-montserrat)" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            style={{ fontFamily: "var(--font-montserrat)" }}
          />
        </div>
        <div className="mb-8">
          <label className={labelClass} htmlFor="password" style={{ fontFamily: "var(--font-montserrat)" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            style={{ fontFamily: "var(--font-montserrat)" }}
          />
        </div>
        {error && (
          <p className="text-[#C7B291] text-sm mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3E4B34] hover:bg-[#6A6F43] active:bg-[#3E4B34] disabled:opacity-60 disabled:cursor-not-allowed text-[#F2EEE6] px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#251D14]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
