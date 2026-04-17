import { PageHeader } from "@/components/ui/PageHeader";
import AboutPageContent from "@/sections/demo/AboutPageContent";
import LeadershipSection from "@/sections/home/LeadershipSection";

export default function AboutUs() {
  return (
    <div className="bg-white">
      <PageHeader 
        title="About us" 
        backgroundImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1920&auto=format&fit=crop"
      />
      
      {/* 1:1 About Content Page section */}
      <AboutPageContent />
      
      {/* Leadership Section - Message from Chairman/CEO */}
      <LeadershipSection />
      
    </div>
  );
}
