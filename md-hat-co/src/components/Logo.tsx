import Link from "next/link";

// Primary horizontal lockup, rebuilt to the brand's signature:
// camo-filled "MD" monogram + slab "HAT COMPANY" over an "EST. 2023" rule.
//
// The monogram is an inline SVG that clips the site's real camo art into bold
// letterforms, with a keyline so the mark reads cleanly on dark or light
// surfaces. (The old CSS background-clip used the light-only camo and tight
// tracking, which smeared "MD" into an unreadable patch on the dark nav.)
export default function Logo({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  const ink = dark ? "#F2EEE6" : "#2E251B";
  const rule = dark ? "rgba(242,238,230,0.5)" : "rgba(107,79,51,0.55)";
  const keyline = dark ? "#EFE8D8" : "#241B11";

  return (
    <Link
      href="/"
      aria-label="MD Hat Company — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 82 54"
        role="img"
        aria-hidden="true"
        className="h-[2.45rem] w-auto shrink-0 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        style={{
          filter: dark
            ? "drop-shadow(0 2px 6px rgba(0,0,0,0.55))"
            : "drop-shadow(0 1px 2px rgba(46,37,27,0.18))",
        }}
      >
        <defs>
          <text
            id="md-letters"
            x="41"
            y="42"
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-roboto-slab), Georgia, serif",
              fontWeight: 900,
              fontSize: "48px",
              letterSpacing: "0.5px",
            }}
          >
            MD
          </text>
          <clipPath id="md-clip">
            <use href="#md-letters" />
          </clipPath>
        </defs>

        {/* Camo body — site's real duck-camo art, clipped to the letters */}
        <g clipPath="url(#md-clip)">
          <image
            href="/camo.svg"
            x="-46"
            y="-30"
            width="174"
            height="114"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>

        {/* Keyline — crisp edge so the mark separates from any background */}
        <use
          href="#md-letters"
          fill="none"
          stroke={keyline}
          strokeWidth="1.6"
          strokeLinejoin="round"
          paintOrder="stroke"
          opacity={dark ? 0.92 : 0.85}
        />
      </svg>

      <span className="flex flex-col">
        <span
          className="font-extrabold text-[0.92rem] leading-none tracking-[0.05em]"
          style={{ fontFamily: "var(--font-roboto-slab)", color: ink }}
        >
          HAT COMPANY
        </span>
        <span className="flex items-center gap-1.5 mt-[6px]">
          <span className="h-px flex-1 min-w-[10px]" style={{ background: rule }} />
          <span
            className="text-[0.49rem] tracking-[0.34em] font-semibold whitespace-nowrap"
            style={{ fontFamily: "var(--font-montserrat)", color: ink, opacity: 0.85 }}
          >
            EST. 2023
          </span>
          <span className="h-px flex-1 min-w-[10px]" style={{ background: rule }} />
        </span>
      </span>
    </Link>
  );
}
