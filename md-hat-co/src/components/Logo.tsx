import Link from "next/link";

// Adaptive horizontal lockup that mirrors the brand's primary logo:
// camo-filled "MD" + slab "HAT COMPANY" over an "EST. 2023" rule.
// Built in markup (not the PNG) so it stays crisp and legible on dark surfaces
// like the nav, where the brand's dark-ink wordmark would disappear.
export default function Logo({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  const ink = dark ? "#F2EEE6" : "#2E251B";
  const rule = dark ? "rgba(242,238,230,0.45)" : "rgba(107,79,51,0.55)";

  return (
    <Link
      href="/"
      aria-label="MD Hat Company — home"
      className={`flex items-center gap-2.5 group ${className}`}
    >
      <span
        className="camo-text font-black leading-[0.78] text-[2.1rem] tracking-[-0.05em] transition-transform duration-300 group-hover:scale-[1.03]"
        style={{ fontFamily: "var(--font-roboto-slab)" }}
      >
        MD
      </span>
      <span className="flex flex-col">
        <span
          className="font-extrabold text-[0.86rem] leading-none tracking-[0.04em]"
          style={{ fontFamily: "var(--font-roboto-slab)", color: ink }}
        >
          HAT COMPANY
        </span>
        <span className="flex items-center gap-1.5 mt-[5px]">
          <span className="h-px w-2.5" style={{ background: rule }} />
          <span
            className="text-[0.48rem] tracking-[0.32em] font-semibold whitespace-nowrap"
            style={{ fontFamily: "var(--font-montserrat)", color: ink, opacity: 0.85 }}
          >
            EST. 2023
          </span>
          <span className="h-px w-2.5" style={{ background: rule }} />
        </span>
      </span>
    </Link>
  );
}
