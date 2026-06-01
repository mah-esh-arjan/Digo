import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { PageHeader } from '@/components/ui/PageHeader'
import AboutPageContent from '@/sections/demo/AboutPageContent'
import LeadershipSection from '@/sections/home/LeadershipSection'

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <main className="bg-white flex-1">
        <PageHeader title="About us" />
        <AboutPageContent />
        <LeadershipSection />
      </main>
      <Footer />
    </>
  )
}
