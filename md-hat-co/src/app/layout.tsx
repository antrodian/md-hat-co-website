import type { Metadata } from "next";
import { Playfair_Display_SC, Montserrat, Zilla_Slab } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display_SC({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Heavy slab display — rugged, thick, no thin hairlines. Hero headline.
const zilla = Zilla_Slab({
  variable: "--font-zilla",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MD Hat Co. | Leather Patch Hats",
  description: "Premium leather patch hats built for the outdoors and shaped by craftsmanship. Authentic. Durable. Polished style for every trail and town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${zilla.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
