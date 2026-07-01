export type Hat = {
  id: string;
  name: string;
  patch: "Antler" | "Duck" | "Custom";
  price: number;
  style: "Trucker" | "Structured" | "Snapback";
  image_url: string;
  qty_on_hand: number;
  tag?: "Bestseller" | "New" | "Custom" | null;
  active: boolean;
};

export type CartItem = {
  hatId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export type Order = {
  id: string;
  type: "stock" | "custom";
  status: "pending" | "paid" | "shipped";
  customer_name: string | null;
  customer_email: string | null;
  shipping_address: Record<string, unknown> | null;
  items: { hatId: string; name: string; qty: number; price: number }[] | null;
  custom_details: {
    hatStyle: string;
    hatColor: string;
    patchShape: string;
    patchDescription: string;
    patchText: string;
    quantity: number;
    notes: string;
  } | null;
  amount_total: number | null;
  created_at: string;
};
