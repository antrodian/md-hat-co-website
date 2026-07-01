-- MD Hat Co. — Supabase schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

-- Inventory: hats the owner has made and can sell right now.
create table if not exists hats (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  patch text not null check (patch in ('Antler', 'Duck', 'Custom')),
  style text not null check (style in ('Trucker', 'Structured', 'Snapback')),
  price numeric(10,2) not null check (price >= 0),
  image_url text not null,
  qty_on_hand integer not null default 0 check (qty_on_hand >= 0),
  tag text check (tag in ('Bestseller', 'New', 'Custom')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Orders: both stock-hat cart purchases and custom-patch orders land here.
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  type text not null check (type in ('stock', 'custom')),
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped')),
  customer_name text,
  customer_email text,
  shipping_address jsonb,
  items jsonb,            -- stock orders: [{hat_id, name, qty, price}]
  custom_details jsonb,   -- custom orders: hat style/color, patch shape/text/description, qty, notes
  amount_total numeric(10,2),
  created_at timestamptz not null default now()
);

alter table hats enable row level security;
alter table orders enable row level security;

-- Public (anon) can read active, in-stock hats — this is what the shop grid queries.
create policy "public read active hats" on hats
  for select using (active = true);

-- Only authenticated users (the owner) can write inventory.
create policy "owner manage hats" on hats
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Only authenticated users (the owner) can read/update orders.
-- Orders are inserted by the server (service role key) from the Stripe webhook, not by the public.
create policy "owner read orders" on orders
  for select using (auth.role() = 'authenticated');

create policy "owner update orders" on orders
  for update using (auth.role() = 'authenticated');

-- Called from the Stripe webhook (service role) after a paid order to decrement stock.
create or replace function decrement_hat_qty(hat_id uuid, amount integer)
returns void as $$
  update hats
  set qty_on_hand = greatest(qty_on_hand - amount, 0)
  where id = hat_id;
$$ language sql;

-- Storage bucket for hat photos — create via Supabase dashboard (Storage > New bucket) named "hat-photos", public.
