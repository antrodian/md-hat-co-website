import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CUSTOM_HAT_PRICE } from "@/lib/constants";

type CustomOrderPayload = {
  name: string;
  email: string;
  phone: string;
  hatStyle: string;
  hatColor: string;
  patchShape: string;
  patchDescription: string;
  patchText: string;
  quantity: string;
  notes: string;
};

export async function POST(req: Request) {
  const form = (await req.json()) as CustomOrderPayload;

  if (!form.name || !form.email || !form.hatStyle || !form.hatColor || !form.patchDescription) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const qty = Math.max(1, Math.min(50, Number(form.quantity) || 1));
  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL!;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: form.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Custom Patch Hat — ${form.hatStyle}`,
              description: form.patchDescription.slice(0, 500),
            },
            unit_amount: CUSTOM_HAT_PRICE * 100,
          },
          quantity: qty,
        },
      ],
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/custom-order`,
      metadata: {
        type: "custom",
        customer_name: form.name,
        customer_phone: form.phone ?? "",
        details: JSON.stringify({
          hatStyle: form.hatStyle,
          hatColor: form.hatColor,
          patchShape: form.patchShape,
          patchDescription: form.patchDescription,
          patchText: form.patchText,
          quantity: qty,
          notes: form.notes,
        }),
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
