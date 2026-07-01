import { createClient } from "@/lib/supabase/server";
import OrderRow from "@/components/admin/OrderRow";
import type { Order } from "@/lib/types";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div style={{ fontFamily: "var(--font-montserrat)" }}>
      <p className="text-[#6B4F33] text-[10px] tracking-[0.32em] uppercase mb-2">Who's Waiting On What</p>
      <h1
        className="text-[#2E251B] text-2xl font-black uppercase tracking-tight mb-8"
        style={{ fontFamily: "var(--font-roboto-slab)" }}
      >
        Orders
      </h1>
      <div className="bg-white border border-[#6B4F33]/15 divide-y divide-[#6B4F33]/10 shadow-[0_16px_40px_-28px_rgba(46,37,27,0.5)]">
        {(orders as Order[] | null)?.map((order) => <OrderRow key={order.id} order={order} />)}
        {!orders?.length && (
          <p className="text-[#2E251B]/50 text-sm p-6">No orders yet — they'll show up here as soon as someone checks out.</p>
        )}
      </div>
    </div>
  );
}
