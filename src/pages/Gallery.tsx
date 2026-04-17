import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { PageHeader } from "@/components/ui/PageHeader";

const galleryImages = [
  {
    src: "/digo1.jpeg",
    title: "Site Survey",
    category: "Exploration"
  },
  {
    src: "/deigo2.jpeg",
    title: "Construction Phase",
    category: "Infrastructure"
  },
  {
    src: "/digo3.jpeg",
    title: "Turbine Installation",
    category: "Engineering"
  },
  {
    src: "/digo4.jpeg",
    title: "Project completion",
    category: "Infrastructure"
  },
  {
    src: "https://images.unsplash.com/photo-1541944743827-e04bb64ca638?q=80&w=800",
    title: "Dam Structure",
    category: "Construction"
  },
  {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800",
    title: "Power Grid",
    category: "Energy"
  }
];

export default function Gallery() {
  return (
    <div className="bg-white pb-24">
      <PageHeader 
        title="Gallery" 
        backgroundImage="https://images.unsplash.com/photo-1542614391-4475560b37ea?q=80&w=1920&auto=format&fit=crop"
      />
      
      <Container className="mt-20">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl font-black text-navy mb-4">Our Project Gallery</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Witness the transformation of Nepal's landscapes into sustainable energy hubs through our various project phases.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((img, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl bg-gray-100 border border-gray-100 cursor-pointer">
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.category}
                  </span>
                  <h3 className="text-white text-2xl font-black translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {img.title}
                  </h3>
                  <div className="mt-6 w-12 h-12 rounded-full bg-white text-navy flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-150">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  );
}
