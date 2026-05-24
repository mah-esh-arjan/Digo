import { HeroSection } from "@/components/ui/hero-section-2";
import { Link } from "react-router-dom";

export default function HomeHero() {
  return (
    <HeroSection
      logo={{
        url: "/image.png",
        alt: "Digo Urja Bikas Logo",
        text: "DIGO URJA BIKAS COMPANY PVT. LTD."
      }}
      slogan="POWERING THE FUTURE OF NEPAL"
      title={
        <>
          Sustainable <br />
          <span className="text-primary">Hydro Energy</span> <br />
          For Nepal.
        </>
      }
      subtitle="Digo Urja Bikas Company Pvt. Ltd. harnesses the pure power of the Kalinchowk Khola. Join us in flowing towards a sustainable, energy-rich tomorrow. Enhancing Nepal’s energy security by utilizing renewable hydro resources. Empowering the nation with sustainable, reliable, and clean electricity."
      callToAction={{
        text: "EXPLORE INVESTMENT",
        href: "/project-details",
      }}
      backgroundImage="/digo3.jpeg"
      contactInfo={{
        website: "http://digourja.com.np/",
        phone: "+977-1-5924279",
        address: "Kathmandu, Nepal",
      }}
      className="pt-24 min-h-[80vh]"
    />
  );
}