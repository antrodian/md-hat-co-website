import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import TrustFeatures from "@/components/TrustFeatures";
import FeaturedHats from "@/components/FeaturedHats";
import CraftProcess from "@/components/CraftProcess";
import AboutTeaser from "@/components/AboutTeaser";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustFeatures />
        <FeaturedHats />
        <CraftProcess />
        <AboutTeaser />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
