'use client'
import { HeroSection } from '@/components/ui/hero-section-2'

export default function HomeHero() {
  return (
    <HeroSection
      title={
        <>Sustainable <br /><span className="text-primary">Hydro Energy</span> <br />For Nepal.</>
      }
      subtitle="Digo Urja Bikas Company Pvt. Ltd. harnesses the pure power of the Kalinchowk Khola. Join us in flowing towards a sustainable, energy-rich tomorrow. Enhancing Nepal's energy security by utilizing renewable hydro resources. Empowering the nation with sustainable, reliable, and clean electricity."
      callToAction={{ text: 'EXPLORE INVESTMENT', href: '/project-details' }}
      backgroundImage="/digo3.jpeg"
      className="pt-24 min-h-[80vh]"
    />
  )
}
