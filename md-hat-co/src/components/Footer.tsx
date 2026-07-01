import Link from "next/link";
import Image from "next/image";
import { Antlers, ArrowRight } from "@/components/Icons";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Hats", href: "/shop" },
      { label: "Custom Patches", href: "/custom-order" },
      { label: "Bestsellers", href: "/shop" },
      { label: "New Arrivals", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Process", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contact">
      {/* Brand band — the real horizontal logo on its native bone field */}
      <div className="bg-[#F2EEE6] py-11 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-5">
          <span className="hidden sm:block h-px flex-1 max-w-[140px] bg-[#6B4F33]/25" />
          <Image
            src="/logo-horizontal.png"
            alt="MD Hat Company"
            width={2172}
            height={724}
            className="h-14 sm:h-16 w-auto"
            priority={false}
          />
          <span className="hidden sm:block h-px flex-1 max-w-[140px] bg-[#6B4F33]/25" />
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#211A12] px-6 pt-16 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Blurb */}
          <div className="col-span-2 md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5 mb-5 text-[#6A6F43]">
              <Antlers className="w-7 h-7" />
              <span
                className="text-[#C7B291] text-[0.62rem] tracking-[0.35em] uppercase"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Built for the Hunt
              </span>
            </div>
            <p
              className="text-[#F2EEE6]/55 text-sm leading-[1.8] mb-7"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Premium blank hats finished with hand-crafted leather patches. Rooted
              in hunting tradition and Southern craftsmanship — quality gear made to
              age in the field, not on a shelf.
            </p>
            <Link
              href="/custom-order"
              className="group inline-flex items-center gap-2.5 text-[#C7B291] hover:text-[#F2EEE6] text-xs tracking-[0.22em] uppercase font-semibold border-b border-[#6B4F33] hover:border-[#6A6F43] pb-1.5 transition-colors duration-300"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Start a Custom Order
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3
                className="text-[#F2EEE6] text-[0.7rem] tracking-[0.28em] uppercase font-bold mb-5"
                style={{ fontFamily: "var(--font-roboto-slab)" }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#F2EEE6]/55 hover:text-[#6A6F43] text-[0.82rem] tracking-wide transition-colors duration-200"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tagline bar — mirrors the brand-guideline footer */}
      <div className="bg-[#2F3F2E] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-[#F2EEE6]/70 text-[0.62rem] sm:text-xs tracking-[0.22em] uppercase text-center"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Custom Hats · Custom Patches · Built for the Hunt
          </p>
          <p
            className="text-[#F2EEE6]/40 text-[0.62rem] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            © 2026 MD Hat Co. · Est. 2023
          </p>
        </div>
      </div>
    </footer>
  );
}
