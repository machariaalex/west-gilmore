import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import LatestSermon from "@/components/home/LatestSermon";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ScriptureHighlight from "@/components/home/ScriptureHighlight";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <LatestSermon />
      <UpcomingEvents />
      <ScriptureHighlight />
      <CTASection />
    </>
  );
}
