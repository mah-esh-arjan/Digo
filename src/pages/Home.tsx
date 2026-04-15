import HeroSection from "@/sections/home/HeroSection";
import OverviewSection from "@/sections/home/OverviewSection";
import InvestmentSection from "@/sections/home/InvestmentSection";
import WhyInvestSection from "@/sections/home/WhyInvestSection";
import AboutSection from "@/sections/home/AboutSection";
import LeadershipSection from "@/sections/home/LeadershipSection";
import TechnicalHighlights from "@/sections/home/TechnicalHighlights";
import PartnersSection from "@/sections/home/PartnersSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <InvestmentSection />
      <WhyInvestSection />
      <AboutSection />
      <LeadershipSection />
      <TechnicalHighlights />
      <PartnersSection />
    </>
  );
}