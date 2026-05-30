'use client'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPageContent() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <Container className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <FadeIn className="order-2 lg:order-1 relative h-full w-full min-h-[500px]">
          <div className="relative w-full h-[500px] md:h-[600px] group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-[3rem] blur-md" />
            <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0 0 0 0)' }} transition={{ duration: 1 }} viewport={{ once: true }} className="absolute inset-0 rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
              <img src="/digo4.jpeg" alt="15 Years Experience" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}
              className="absolute -top-10 -left-10 lg:-left-20 bg-primary w-40 h-40 rounded-full border-8 border-white shadow-2xl z-20 flex flex-col items-center justify-center text-white p-4 text-center">
              <span className="text-4xl font-black">15+</span>
              <span className="text-xs font-bold uppercase tracking-tight leading-tight">Years Experience</span>
            </motion.div>
          </div>
        </FadeIn>
        <FadeIn className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface shadow-sm border border-gray-100 text-primary font-semibold text-sm mb-6 uppercase tracking-widest">About Us</div>
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-8 tracking-tight leading-tight">15+ Years Experience In <br /><span className="text-primary italic">Hydro Energy Industry</span></h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>Digo Urja Bikas Company PVT. LTD was established in 2021 with the main aim of developing hydropower projects and generating electricity in various parts of the country.</p>
            <p>The company is formed by the effort of highly dedicated and qualified personnel who have sound and in-depth knowledge in identifying and selecting hydropower projects for further development.</p>
            <ul className="space-y-4 pt-4">
              {['Clean and reliable hydropower energy company', 'Innovative development strategy with local focus', 'Committed to maximum energy efficiency', 'Strong financial and technical leadership'].map((text, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-navy"><CheckCircle2 className="text-primary w-6 h-6 shrink-0" /><span>{text}</span></li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
