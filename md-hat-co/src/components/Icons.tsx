// Brand iconography — clean, bold, masculine. Per MD Hat Co. brand guidelines §9.
// All icons inherit `currentColor` and accept a className for sizing.

type IconProps = { className?: string; strokeWidth?: number };

const base = (className?: string) => `shrink-0 ${className ?? "w-6 h-6"}`;

/* ── Brand marks ──────────────────────────────────────────────────────── */

// Deer antlers — the mark stamped on every MD leather patch.
export function Antlers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={base(className)} aria-hidden>
      <path
        d="M24 44V22M24 22c0-4-3-6-3-10 0-3 1.5-5 1.5-8M24 22c0-4 3-6 3-10 0-3-1.5-5-1.5-8
           M21 12c-2.5 1-4 0-6-2M27 12c2.5 1 4 0 6-2
           M21.5 18c-3 1.5-5.5 1-8.5-1.5M26.5 18c3 1.5 5.5 1 8.5-1.5
           M24 22c-3.5 2-6 1.5-9.5-1M24 22c3.5 2 6 1.5 9.5-1"
        stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// Flying duck — Southern waterfowl heritage.
export function Duck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={base(className)} aria-hidden>
      <path
        d="M4 30c6 2 9-2 12-6 2-2.5 4-5 7-5 4 0 5 3 9 3 3 0 5-1.5 7-4
           M23 19c1-3 0-6-2-8M32 21c5 1 8 4 9 9"
        stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="18.5" cy="22.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

// Oak leaf — secondary accent, a nod to the timber.
export function OakLeaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={base(className)} aria-hidden>
      <path d="M24 44V14" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
      <path
        d="M24 6c-3 3-7 2-9 5 3 1 2 4 0 5 3 1 3 4 1 6 3 0 3 3 1 5 3 .5 4 3 6 4
           2-1 3-3.5 6-4-2-2-2-5 1-5-2-2-2-5 1-6-2-1-3-4 0-5-2-3-6-2-9-5"
        stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round"
      />
    </svg>
  );
}

// Leather patch — rounded form with a stitched border.
export function Patch({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={base(className)} aria-hidden>
      <rect x="7" y="11" width="34" height="26" rx="7"
        stroke="currentColor" strokeWidth={2.4} />
      <rect x="11.5" y="15.5" width="25" height="17" rx="4"
        stroke="currentColor" strokeWidth={1.6} strokeDasharray="3 3" />
    </svg>
  );
}

// Stitch run — the hand-stitch that joins patch to hat.
export function Stitch({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={base(className)} aria-hidden>
      <path d="M5 24h38" stroke="currentColor" strokeWidth={2.2} strokeDasharray="6 5" strokeLinecap="round" />
      {[10, 24, 38].map((x) => (
        <path key={x} d={`M${x - 4} 19l8 10M${x + 4} 19l-8 10`}
          stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" opacity={0.55} />
      ))}
    </svg>
  );
}

// Compass — built for the outdoors / orientation.
export function Compass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={base(className)} aria-hidden>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth={2.4} />
      <path d="M31 17l-4.5 9.5L17 31l4.5-9.5L31 17z"
        stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" />
      <circle cx="24" cy="24" r="1.6" fill="currentColor" />
    </svg>
  );
}

/* ── UI icons ─────────────────────────────────────────────────────────── */

export function Search({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={2} />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function Cart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden>
      <path d="M3 4h2.2l1.8 11.2a1.6 1.6 0 001.6 1.3h8.1a1.6 1.6 0 001.6-1.2L20.5 8H7"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className ?? "w-4 h-4")} aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2.2}
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
