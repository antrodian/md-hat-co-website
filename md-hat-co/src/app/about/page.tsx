import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutValues from "@/components/AboutValues";
import AboutQuote from "@/components/AboutQuote";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | MD Hat Company",
  description:
    "MD Hat Company started with one hand-tooled leather patch and a hat worth wearing. Meet Morgan, the founder, and the Tennessee hunting tradition behind every hat.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutQuote />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
