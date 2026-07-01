"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Inventory", href: "/admin/inventory" },
  { label: "Orders", href: "/admin/orders" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-montserrat)" }}>
      {LINKS.map((link) => {
        const active = pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] rounded-sm ${
              active ? "text-[#F2EEE6]" : "text-[#F2EEE6]/60 hover:text-[#F2EEE6]"
            }`}
          >
            {link.label}
            {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#6A6F43]" />}
          </Link>
        );
      })}
    </nav>
  );
}
