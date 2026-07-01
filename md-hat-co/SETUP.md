# E-commerce Setup — Accounts & Keys

Three free accounts needed. Each gives you keys that go in `.env.local` (create
this file in `md-hat-co/` — copy `.env.example` and fill it in. It's git-ignored,
never committed) and in Vercel's env var settings for the live site.

---

## 1. Supabase (database, login, photo storage)

1. Go to supabase.com → sign up → **New Project**. Pick a name, password, region.
2. Once created: **Project Settings → API**.
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (click reveal) → `SUPABASE_SERVICE_ROLE_KEY` — keep this one secret, it bypasses all security rules.
3. **SQL Editor → New query** → paste the contents of `supabase/schema.sql` from this repo → Run. This creates the `hats` and `orders` tables.
4. **Storage → New bucket** → name it exactly `hat-photos` → toggle **Public bucket** on → Create.
5. **Authentication → Users → Add user** → create the owner's login (her email + a password). This is the only account that can log into `/admin`.

## 2. Stripe (payments)

1. Go to stripe.com → sign up (use the business's real info — needed before going live, test mode works immediately for setup).
2. **Developers → API keys**.
   - `Secret key` → `STRIPE_SECRET_KEY`
3. **Developers → Webhooks → Add endpoint**.
   - Endpoint URL: `https://<your-live-domain>/api/webhooks/stripe` (once deployed — can't set this up against localhost)
   - Events to send: select `checkout.session.completed`
   - After creating, click the endpoint → reveal **Signing secret** → `STRIPE_WEBHOOK_SECRET`
4. Stripe starts in **test mode** — orders won't charge real cards. Flip to live mode (top-left toggle) and repeat steps 2–3 for live keys once ready to accept real payments.

## 3. Resend (order notification emails)

1. Go to resend.com → sign up.
2. **API Keys → Create API Key** → `RESEND_API_KEY`.
3. Set `OWNER_NOTIFICATION_EMAIL` to whatever email should get "new order" pings.
4. To send from a custom address (not the shared dev address in the code), add and verify your domain under **Domains** — otherwise the notification email still works, it just comes from Resend's shared sender.

---

## Where the keys go

**Local dev** — `md-hat-co/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
OWNER_NOTIFICATION_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production (Vercel)** — Project → Settings → Environment Variables → add each one, same names. Set `NEXT_PUBLIC_SITE_URL` to the real domain.

Once `.env.local` has real Supabase values, restart `npm run dev` — the shop grid switches from demo hats to whatever's in the `hats` table, and `/admin` becomes reachable.

## After keys are in

1. Log into `/admin/login` with the owner account created in step 1.5.
2. Add real hats under **Inventory** — photo, name, patch, style, price, qty.
3. Test a real checkout with Stripe test card `4242 4242 4242 4242`, any future expiry/CVC — confirm the order shows up under **Orders** and (if Resend is set) the notification email arrives.
4. Switch Stripe to live mode + live webhook before taking real money.
