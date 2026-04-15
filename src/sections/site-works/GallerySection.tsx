import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

const images = [
  "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356f58?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1473623910398-3330623da354?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581094369446-ee2eb34d3b14?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1621644788107-11fd7bcf14ac?w=500&h=400&fit=crop",
];

export default function GallerySection() {
  return (
    <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((src, i) => (
        <StaggerItem key={i} className="group relative rounded-2xl overflow-hidden shadow-sm bg-white aspect-[4/3] cursor-pointer">
          <img src={src} alt="Site Work" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span className="text-white font-bold tracking-widest text-sm uppercase">Phase {i+1} Progress</span>
          </div>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}