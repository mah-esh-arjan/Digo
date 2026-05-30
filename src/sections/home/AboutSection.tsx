'use client'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      <Container className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <FadeIn className="order-2 lg:order-1 relative h-full w-full min-h-[500px]">
          <div className="relative w-full h-[500px] md:h-[600px] group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-[3rem] transform -rotate-6 scale-95 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700 ease-out z-0 blur-md" />
            <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0 0 0 0)' }} transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }} viewport={{ once: true, margin: '-100px' }} className="absolute inset-0 rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
              <img src="/digo4.jpeg" alt="Construction" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-80" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 md:-right-12 glass-card p-6 md:p-8 rounded-3xl z-20 max-w-[280px] shadow-[0_20px_50px_rgba(0,31,70,0.2)] border border-white/60 bg-white/70 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-accent text-navy flex items-center justify-center font-bold text-xl shadow-lg">15</div>
                <div><p className="font-bold text-navy leading-tight">Months</p><p className="text-sm text-gray-500">Target Time</p></div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '60%' }} transition={{ duration: 1.5, delay: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-primary to-accent h-full rounded-full" />
              </div>
            </motion.div>
          </div>
        </FadeIn>
        <FadeIn className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface shadow-sm border border-gray-100 text-primary font-semibold text-sm mb-6">Corporate Profile</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-8 tracking-tight">Powering Nepal&apos;s <br /><span className="text-gradient">Tomorrow</span>.</h2>
          <div className="space-y-10">
            <div className="group"><h4 className="text-2xl font-bold text-navy flex items-center gap-3 mb-4 group-hover:text-primary transition-colors"><div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"><CheckCircle2 className="w-5 h-5" /></div>Our Mission</h4><p className="text-gray-600 text-lg leading-relaxed">To empower Nepal with clean, reliable, and sustainable energy solutions while setting unprecedented industry records for project execution and transparency.</p></div>
            <div className="group"><h4 className="text-2xl font-bold text-navy flex items-center gap-3 mb-4 group-hover:text-accent transition-colors"><div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-navy transition-all"><CheckCircle2 className="w-5 h-5" /></div>Our Vision</h4><p className="text-gray-600 text-lg leading-relaxed">To create job opportunities for more than 1 million people by actively constructing a minimum of 10,000 MWs of sustainable energy infrastructure globally.</p></div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
