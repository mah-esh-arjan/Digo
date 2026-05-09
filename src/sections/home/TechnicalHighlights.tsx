import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

const data: { key: string; value: string; highlight?: boolean }[] = [
  { key: "Project Name", value: "Kalinchowk Khola", highlight: true },
  { key: "Project Capacity", value: "3.00 MW" },
  { key: "Generated Energy", value: "16.96 GWh annually" },
  { key: "PPA Status", value: "Approved & Draft Unavailable" },
  { key: "Completion Target", value: "2.5 Years" },
  { key: "Turbine Type", value: "Pelton" },
  { key: "Gross Head", value: "120m" }
];

export default function TechnicalHighlights() {
  return (
    <section className="py-32 relative bg-background">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <Container>
        <FadeIn className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-sm mb-6">
            Specifications
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight">Technical Highlights</h2>
        </FadeIn>
        
        <div className="max-w-4xl mx-auto relative group z-10">
          {/* Subtle glow behind table */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-primary/10 to-accent/10 blur-xl opacity-50 group-hover:opacity-100 transition duration-700 pointer-events-none" />
          
          <div className="relative glass-card border border-white/60 rounded-3xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-xl transition-all duration-300">
            <StaggerGrid className="divide-y divide-gray-100/80">
              {data.map((item, i) => (
                <StaggerItem 
                  key={i} 
                  className={`group/row flex flex-col sm:flex-row justify-between p-6 md:p-8 transition-all duration-300 relative overflow-hidden ${item.highlight ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-gray-50/50'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent -translate-x-[100%] group-hover/row:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className={`font-bold text-lg relative z-10 mb-2 sm:mb-0 transition-colors duration-300 ${item.highlight ? 'text-primary' : 'text-gray-800 group-hover/row:text-primary'}`}>{item.key}</span>
                  <span className={`font-semibold text-lg relative z-10 transition-colors duration-300 ${item.highlight ? 'text-green-500 font-black' : 'text-primary group-hover/row:text-accent'}`}>{item.value}</span>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </Container>
    </section>
  );
}