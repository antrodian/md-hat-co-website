"use client";

import { useTransition } from "react";
import { markShipped } from "@/app/admin/(dashboard)/orders/actions";
import type { Order } from "@/lib/types";

export default function OrderRow({ order }: { order: Order }) {
  const [isPending, startTransition] = useTransition();
  const address = order.shipping_address as { line1?: string; city?: string; state?: string; postal_code?: string } | null;

  return (
    <div className="p-5 flex flex-col gap-3" style={{ fontFamily: "var(--font-montserrat)" }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-[#2E251B] font-extrabold text-sm uppercase tracking-wide flex items-center flex-wrap gap-2"
            style={{ fontFamily: "var(--font-roboto-slab)" }}
          >
            {order.customer_name ?? "Unknown"} — ${order.amount_total}
            <span
              className="text-[10px] uppercase tracking-wide px-2 py-0.5 bg-[#6B4F33]/15 text-[#6B4F33]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {order.type}
            </span>
          </p>
          <p className="text-[#2E251B]/50 text-xs mt-1">{order.customer_email}</p>
          <p className="text-[#2E251B]/40 text-xs">{new Date(order.created_at).toLocaleString()}</p>
        </div>
        {order.status !== "shipped" ? (
          <button
            onClick={() => startTransition(() => markShipped(order.id))}
            disabled={isPending}
            className="shrink-0 bg-[#3E4B34] hover:bg-[#6A6F43] active:bg-[#3E4B34] disabled:opacity-50 disabled:cursor-not-allowed text-[#F2EEE6] px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] focus-visible:ring-offset-2"
          >
            Mark Shipped
          </button>
        ) : (
          <span className="shrink-0 text-[10px] uppercase tracking-wide px-3 py-2 bg-[#3E4B34]/10 text-[#3E4B34]">
            Shipped
          </span>
        )}
      </div>

      {order.type === "stock" && order.items && (
        <ul className="text-[#2E251B]/70 text-xs">
          {order.items.map((i, idx) => (
            <li key={idx}>{i.qty} × {i.name}</li>
          ))}
        </ul>
      )}

      {order.type === "custom" && order.custom_details && (
        <div className="text-[#2E251B]/70 text-xs bg-[#F2EEE6] p-3">
          <p>{order.custom_details.quantity}× {order.custom_details.hatStyle} — {order.custom_details.hatColor}</p>
          <p>Patch: {order.custom_details.patchShape || "no preference"}{order.custom_details.patchText ? ` — "${order.custom_details.patchText}"` : ""}</p>
          <p className="mt-1">{order.custom_details.patchDescription}</p>
          {order.custom_details.notes && <p className="mt-1 italic">{order.custom_details.notes}</p>}
        </div>
      )}

      {address && (
        <p className="text-[#2E251B]/50 text-xs">
          Ship to: {address.line1}, {address.city}, {address.state} {address.postal_code}
        </p>
      )}
    </div>
  );
}
