import type { Metadata } from "next";
import { Roboto_Slab, Montserrat } from "next/font/google";
import { CartProvider } from "@/lib/cart/CartContext";
import "./globals.css";

// Heading face — robust slab, the closest Google Fonts match to the brand's
// "Robusta Slab". Heavy weights only; no thin hairlines.
const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Body face — per brand guidelines.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MD Hat Company | Custom Hats. Built for the Hunt.",
  description:
    "Premium blank hats finished with hand-crafted custom leather patches. Rooted in hunting tradition and Southern craftsmanship. Built for the outdoors. Est. 2023.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoSlab.variable} ${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
