import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import type { CartItem } from "@/lib/types";

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: CartItem[] };

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data: hats, error } = await supabase
    .from("hats")
    .select("id, name, price, image_url, qty_on_hand, active")
    .in(
      "id",
      items.map((i) => i.hatId),
    );

  if (error || !hats) {
    return NextResponse.json({ error: "Could not verify inventory" }, { status: 500 });
  }

  const line_items = items.map((item) => {
    const hat = hats.find((h: { id: string }) => h.id === item.hatId);
    if (!hat || !hat.active || hat.qty_on_hand < item.qty) {
      throw new Error(`"${item.name}" is no longer available in that quantity.`);
    }
    return {
      price_data: {
        currency: "usd",
        product_data: { name: hat.name, images: [hat.image_url] },
        unit_amount: Math.round(hat.price * 100),
      },
      quantity: item.qty,
    };
  });

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL!;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        type: "stock",
        items: JSON.stringify(
          items.map((i) => ({ hatId: i.hatId, name: i.name, qty: i.qty, price: i.price })),
        ),
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed" },
      { status: 400 },
    );
  }
}
