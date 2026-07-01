"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { updateQty, toggleActive, deleteHat } from "@/app/admin/(dashboard)/inventory/actions";
import type { Hat } from "@/lib/types";

export default function HatRow({ hat }: { hat: Hat }) {
  const [qty, setQty] = useState(hat.qty_on_hand);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-4 p-4" style={{ fontFamily: "var(--font-montserrat)" }}>
      <div className="relative w-14 h-14 shrink-0 bg-[#EDE6D8] overflow-hidden">
        <Image src={hat.image_url} alt={hat.name} fill sizes="56px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[#2E251B] font-extrabold text-sm truncate uppercase tracking-wide"
          style={{ fontFamily: "var(--font-roboto-slab)" }}
        >
          {hat.name}
        </p>
        <p className="text-[#2E251B]/50 text-xs mt-0.5">
          {hat.patch} · {hat.style} · ${hat.price}
        </p>
      </div>
      <div>
        <label className="sr-only" htmlFor={`qty-${hat.id}`}>Quantity on hand</label>
        <input
          id={`qty-${hat.id}`}
          type="number"
          min={0}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          onBlur={() => startTransition(() => updateQty(hat.id, qty))}
          className="w-16 border border-[#6B4F33]/30 text-center px-2 py-1.5 text-sm transition-colors duration-200 focus:outline-none focus:border-[#6A6F43] focus-visible:ring-2 focus-visible:ring-[#6A6F43]"
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-[#2E251B]/60 shrink-0 cursor-pointer uppercase tracking-wide">
        <input
          type="checkbox"
          checked={hat.active}
          onChange={(e) => startTransition(() => toggleActive(hat.id, e.target.checked))}
          className="w-4 h-4 accent-[#3E4B34] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43]"
        />
        Active
      </label>
      <button
        onClick={() => {
          if (confirm(`Delete "${hat.name}"? This can't be undone.`)) {
            startTransition(() => deleteHat(hat.id));
          }
        }}
        disabled={isPending}
        className="text-[#6B4F33] hover:text-[#2E251B] text-xs uppercase tracking-wide cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] rounded-sm px-1"
      >
        Delete
      </button>
    </div>
  );
}
