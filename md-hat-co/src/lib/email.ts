import { Resend } from "resend";

export async function sendNewOrderEmail(order: {
  type: "stock" | "custom";
  customerName: string | null;
  customerEmail: string | null;
  amountTotal: number | null;
  summary: string;
}) {
  if (!process.env.RESEND_API_KEY || !process.env.OWNER_NOTIFICATION_EMAIL) return; // Not configured yet — skip silently.

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "MD Hat Co. Orders <orders@mdhatco.com>",
    to: process.env.OWNER_NOTIFICATION_EMAIL,
    subject: `New ${order.type === "custom" ? "custom" : "shop"} order — $${order.amountTotal ?? "?"}`,
    text: [
      `New order from ${order.customerName ?? "unknown"} (${order.customerEmail ?? "no email"})`,
      "",
      order.summary,
    ].join("\n"),
  });
}
