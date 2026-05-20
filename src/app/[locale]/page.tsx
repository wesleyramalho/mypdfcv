import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingTemplates from "@/components/landing/LandingTemplates";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingCTA from "@/components/landing/LandingCTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <LandingTemplates />
      <LandingFAQ />
      <LandingCTA />
      <Footer />
    </main>
  );
}
