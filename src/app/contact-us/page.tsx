import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import ContactForm from '@/sections/contact/ContactForm'
import ContactInfo from '@/sections/contact/ContactInfo'

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20">
        <Container>
          <FadeIn><div className="text-center mb-16"><h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Get in Touch</h1><p className="text-gray-600 text-lg">We&apos;re here to answer any questions about our projects or investment opportunities.</p></div></FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20"><ContactInfo /><ContactForm /></div>
          <FadeIn delay={0.4}><div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.44976721532!2d85.3123456!3d27.7001234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAwLjQiTiA4NcKwMTgnNDQuNCJF!5e0!3m2!1sen!2snp!4v1650000000000!5m2!1sen!2snp" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location"></iframe>
          </div></FadeIn>
        </Container>
      </div>
      <Footer />
    </>
  )
}
