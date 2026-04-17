import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Quote } from "lucide-react";

export default function LeadershipSection() {
  return (
    <section className="py-32 relative bg-surface overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[50%] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 text-primary font-semibold text-sm mb-6">
            Leadership
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight">Our Message</h2>
        </FadeIn>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 relative">
          
          <FadeIn delay={0.1} className="group glass-card p-10 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start relative overflow-hidden transition-all duration-500">
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            
            <Quote className="absolute top-6 right-6 w-32 h-32 text-gray-100/50 -rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out z-0" />
            
            <div className="relative z-10 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
              <img src="chairman.jpeg" className="relative w-28 h-28 rounded-full object-cover shrink-0 ring-4 ring-white shadow-xl" alt="Chairman" />
            </div>
            
            <div className="relative z-10">
              <h4 className="font-extrabold text-2xl text-navy mb-1 group-hover:text-primary transition-colors duration-300">Dr. Bishal Kumar Bhandari</h4>
              <p className="text-accent uppercase font-bold tracking-wider text-xs mb-6">Chairman</p>
              <p className="text-gray-600 italic text-base md:text-lg leading-relaxed relative">
                <span className="text-primary text-2xl leading-none absolute -left-4 -top-2">"</span>
                We are dedicated to excellence and completing the Kalinchowk Small Hydropower Project in just 15 months. This reflects our commitment to setting new industry standards and strengthening Nepal’s energy sector.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="group relative p-10 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start overflow-hidden transition-all duration-500 shadow-[0_20px_50px_-12px_rgba(0,31,70,0.3)] bg-navy hover:shadow-[0_25px_60px_-10px_rgba(0,224,255,0.2)] hover:-translate-y-2">
            {/* Blue to Cyan Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-primary-dark z-0" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 z-0" />
            
            <Quote className="absolute top-6 right-6 w-32 h-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out z-0" />
            
            <div className="relative z-10 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent to-white rounded-full blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
              <img src="executive.jpeg" className="relative w-28 h-28 rounded-full object-cover shrink-0 ring-4 ring-white/10 shadow-2xl" alt="CEO" />
            </div>
            
            <div className="relative z-10">
              <h4 className="font-extrabold text-2xl text-white mb-1 group-hover:text-accent transition-colors duration-300">Prashant Chaulagain</h4>
              <p className="text-primary-light text-accent uppercase font-bold tracking-wider text-xs mb-6">Executive Director</p>
              <p className="text-gray-300 italic text-base md:text-lg leading-relaxed relative">
                <span className="text-accent text-2xl leading-none absolute -left-4 -top-2">"</span>
                Our team combines expertise in hydropower and capital markets to drive economic growth and promote sustainability. Together, we are on a journey toward absolute energy self-sufficiency.
              </p>
            </div>
          </FadeIn>
          
        </div>
      </Container>
    </section>
  );
}