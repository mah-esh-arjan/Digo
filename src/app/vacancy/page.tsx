import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import JobList from '@/sections/vacancy/JobList'

export default function Vacancy() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 bg-surface min-h-screen">
        <Container>
          <FadeIn><h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Careers & Vacancy</h1><p className="text-gray-600 max-w-2xl text-lg mb-12">Join us in our mission to empower Nepal with clean, reliable, and sustainable energy solutions.</p></FadeIn>
          <JobList />
        </Container>
      </div>
      <Footer />
    </>
  )
}
