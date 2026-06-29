import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import FeaturedHats from "@/components/FeaturedHats";
import CraftProcess from "@/components/CraftProcess";
import AboutTeaser from "@/components/AboutTeaser";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <FeaturedHats />
        <CraftProcess />
        <AboutTeaser />
        <CTABanner />
      </main>
    </>
  );
}
