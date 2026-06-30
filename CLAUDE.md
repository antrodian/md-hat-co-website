# CLAUDE.md — MD Hat Co. Website

## What

Client website project for MD Hat Co. — a custom leather patch hat brand. Next.js 14 site, brand assets, and BASE workspace management. Goal: a visually distinctive, fully functional storefront that stands apart from generic e-commerce templates.

---

## Why

Andrew is a perfectionist builder. Work shipped from this workspace must meet a high visual and functional standard. No crude output. Every detail is intentional. The site must feel premium — like the brand it represents.

---

## Who

**MD Hat Co.** (mdhatco.com) — Custom leather patch hats. "Awesome · Custom · Hats."

- **MD = Motion Ducks** — a waterfowl brand the client owns. MD Hat Co spun out
  to make custom hats for Motion Ducks, then opened to other waterfowl companies,
  businesses, teams, and the public. Bulk/B2B is core, not just DTC.
- Buys blank hats (Richardson 112, Yupoong 6606) and stitches on real leather
  patches with the customer's uploaded logo
- Aesthetic: waterfowl/camo/outdoors, rugged but refined (NOT western/cowboy)
- Flow: Pick blank → color → patch shape → leather color → upload logo → quantity
- Patch shapes: Rectangle, Square, Hexagon, Circle, Oval, Contour
- Colorways: Grey/Black, Black/Grey, Grey/Green, Grey/Orange, Loden/Black, Caramel/Black
- Real prices: Custom Leather Patch $27.99, Camo $29.99, Name Hats $27.99
- Bulk tiers (per hat): 10+ $25.19 · 20+ $23.79 · 35+ $22.39 · 50+ $20.99 · 100+ $18.19
- Contact: email only (no public phone/address). Est. 2023.
- Client: Andrew's sister (paid work)

---

## Where

```
morgan hat website/
├── md-hat-co/          # Next.js 14 app (App Router, TypeScript, src/ dir)
│   ├── src/app/        # Pages + layouts
│   ├── src/components/ # Reusable UI components
│   └── public/         # Static assets
├── brand_assests/      # Brand Guidelines.png, square logo.jpg
└── .base/              # BASE workspace management
```

---

## How

### Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

### Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 14 (App Router) | TypeScript, src/ dir |
| Styling | Tailwind CSS v4 | Brand tokens in globals.css |
| Animation | GSAP + Framer Motion | GSAP for hero sequences, Framer for scroll |
| Fonts | Playfair Display SC + Montserrat | Per brand guidelines |
| E-commerce | TBD | Wired in later — UI first |

### Brand Tokens

| Token | Hex | Use |
|-------|-----|-----|
| Oxblood | `#8B1D1D` | Primary CTA, accents |
| Saddle Brown | `#3B2314` | Body text, dark elements |
| Leather Tan | `#C67C3D` | Highlights, hover states |
| Cream | `#F2E9DD` | Page background, light text |
| Charcoal | `#2B2520` | Hero background, nav |
| Warm Gray | `#8C857C` | Secondary text |

### Pages Planned

| Page | Status | Notes |
|------|--------|-------|
| Home | In progress | Hero animation, featured hats, process, CTA |
| Shop | Pending | Product grid, filters |
| About | Pending | Craftsmanship story |
| Custom Order | Pending | Form-based custom patch request |

### Brand Assets

- Always check `brand_assests/` before designing — logos, color guides, images live there
- Use real assets where available — no placeholders when the real thing exists
- Logo present: use it. Color palette defined: use exact hex values, never invent brand colors

### Local Server

- Dev server: `npm run dev` inside `md-hat-co/` — serves at `http://localhost:3000`
- Always serve from localhost — never screenshot a `file:///` URL
- If server already running, do not start a second instance

### Screenshot Workflow

- Screenshot from `http://localhost:3000` using Puppeteer or the Read tool on saved PNGs
- After screenshotting: compare against reference, fix mismatches, re-screenshot — minimum 2 rounds
- Stop only when no visible differences remain or user says so
- When comparing, be specific: "heading is 32px but reference shows ~24px", "gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows

### Reference Image Rules

- If reference image provided: match layout, spacing, typography, and color exactly. Use placeholders (`https://placehold.co/WIDTHxHEIGHT`) for images. Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below)

---

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Use brand tokens only.
- **Shadows:** Never flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never same font for headings and body. Playfair Display SC for headings, Montserrat for body. Tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add gradient overlay (`bg-gradient-to-t from-black/60`) and color treatment layer with `mix-blend-multiply`.
- **Spacing:** Intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces need a layering system (base → elevated → floating) — not all at the same z-plane.

---

## Hard Rules

- NEVER use generic e-commerce UI patterns — every component must feel custom and premium
- NEVER commit placeholder content as final — mark clearly with comments
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- E-commerce/payment logic is out of scope until UI phase is complete
- Mobile-first, but desktop is the showcase
