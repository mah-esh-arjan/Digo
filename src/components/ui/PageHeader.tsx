import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHeader({ title, subtitle, backgroundImage = "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1920&auto=format&fit=crop" }: PageHeaderProps) {
  return (
    <div className="relative h-[45vh] min-h-[400px] w-full flex items-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          className="w-full h-full object-cover scale-110"
          alt={title}
        />
        <div className="absolute inset-0 bg-navy/70 backdrop-blur-[2px]" />
      </div>

      <Container className="relative z-10 pt-20">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic">
              {title}
            </h1>
            
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest text-white/60 uppercase">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} className="text-primary" />
              <span className="text-white">Pages</span>
              <ChevronRight size={14} className="text-primary" />
              <span className="text-primary">{title}</span>
            </div>
            
            {subtitle && (
              <p className="mt-8 text-xl text-white/80 max-w-2xl font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </FadeIn>
      </Container>

      {/* Dynamic bottom wave/edge */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
