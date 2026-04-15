import { HeroSection } from "@/components/ui/hero-section-2";

export default function HomeHero() {
  return (
    <HeroSection
      logo={{
        url: "/logo.jpg",
        alt: "Digourja Logo",
        text: "Digourja"
      }}
      slogan="POWERING THE FUTURE OF NEPAL"
      title={
        <>
          Sustainable <br />
          <span className="text-primary">Hydro Energy</span> <br />
          For Nepal.
        </>
      }
      subtitle="Digourja Ltd. harnesses the pure power of the Kalinchowk Khola. Join us in flowing towards a sustainable, energy-rich tomorrow."
      callToAction={{
        text: "EXPLORE INVESTMENT",
        href: "#investment",
      }}
      backgroundImage="/digo3.jpeg"
      contactInfo={{
        website: "http://digourja.com.np/",
        phone: "+977-1-4XXXXXX",
        address: "Kathmandu, Nepal",
      }}
      className="pt-24 min-h-[80vh]"
    />
  );
}