'use client'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { motion } from 'framer-motion'

export default function PartnersSection() {
  const logos = Array.from({ length: 8 }, (_, i) => `Associate Partner ${i + 1}`)

  return (
    <section className="py-20 bg-background border-y border-gray-100 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <Container>
        <FadeIn className="text-center mb-10">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest relative inline-block">
            <span className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gray-300" />
            Our Associates & Partners
            <span className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gray-300" />
          </h4>
        </FadeIn>
      </Container>
      <div className="flex w-[200%] gap-12 md:gap-24 overflow-hidden mt-8">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, ease: 'linear', duration: 25 }} className="flex whitespace-nowrap gap-12 md:gap-24 items-center">
          {logos.concat(logos).map((logo, i) => (
            <div key={i} className="group flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 cursor-default">
              <span className="text-2xl font-extrabold text-navy tracking-tighter group-hover:text-primary transition-colors duration-300 relative inline-flex">
                {logo}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
