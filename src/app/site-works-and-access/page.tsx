import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import GallerySection from '@/sections/site-works/GallerySection'

export default function SiteWorks() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 bg-surface min-h-screen">
        <Container>
          <FadeIn><h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Site Works & Access</h1><p className="text-gray-600 max-w-2xl text-lg mb-12">Explore the latest progress and on-ground activities of the Kalinchowk Hydropower Project in Dolakha.</p></FadeIn>
          <GallerySection />
        </Container>
      </div>
      <Footer />
    </>
  )
}
