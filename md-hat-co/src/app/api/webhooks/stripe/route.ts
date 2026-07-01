import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { sendNewOrderEmail } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err instanceof Error ? err.message : err}` },
      { status: 400 },
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const supabase = createServiceClient();
  const type = session.metadata?.type === "custom" ? "custom" : "stock";

  const shipping = session.collected_information?.shipping_details ?? null;

  if (type === "stock") {
    const items = JSON.parse(session.metadata?.items ?? "[]") as {
      hatId: string;
      name: string;
      qty: number;
      price: number;
    }[];

    await supabase.from("orders").insert({
      stripe_session_id: session.id,
      type: "stock",
      status: "paid",
      customer_name: shipping?.name ?? null,
      customer_email: session.customer_details?.email ?? null,
      shipping_address: shipping?.address ?? null,
      items,
      amount_total: (session.amount_total ?? 0) / 100,
    });

    for (const item of items) {
      await supabase.rpc("decrement_hat_qty", { hat_id: item.hatId, amount: item.qty });
    }

    await sendNewOrderEmail({
      type: "stock",
      customerName: shipping?.name ?? null,
      customerEmail: session.customer_details?.email ?? null,
      amountTotal: (session.amount_total ?? 0) / 100,
      summary: items.map((i) => `${i.qty} × ${i.name}`).join("\n"),
    });
  } else {
    const details = JSON.parse(session.metadata?.details ?? "{}");

    await supabase.from("orders").insert({
      stripe_session_id: session.id,
      type: "custom",
      status: "paid",
      customer_name: session.metadata?.customer_name ?? null,
      customer_email: session.customer_details?.email ?? null,
      shipping_address: shipping?.address ?? null,
      custom_details: details,
      amount_total: (session.amount_total ?? 0) / 100,
    });

    await sendNewOrderEmail({
      type: "custom",
      customerName: session.metadata?.customer_name ?? null,
      customerEmail: session.customer_details?.email ?? null,
      amountTotal: (session.amount_total ?? 0) / 100,
      summary: `${details.quantity}× custom ${details.hatStyle} — ${details.patchDescription}`,
    });
  }

  return NextResponse.json({ received: true });
}
