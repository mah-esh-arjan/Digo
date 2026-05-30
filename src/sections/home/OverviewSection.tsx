'use client'
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn'
import { Container } from '@/components/layout/Container'
import { Activity, Droplets, MapPin, Zap } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { icon: MapPin, label: 'Location', value: 'Baglung', isNumber: false },
  { icon: Zap, label: 'Capacity', value: 7.96, suffix: ' MW', isNumber: true },
  { icon: Droplets, label: 'Catchment Area', value: 118.53, suffix: ' km&sup2;', isNumber: true },
  { icon: Activity, label: 'Annual Energy', value: 40.71, suffix: ' GWh', isNumber: true },
]

function Counter({ from = 0, to, duration = 2, decimals = 0 }: { from?: number; to: number; duration?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(from + (to - from) * easeOutQuart)
        if (progress < 1) window.requestAnimationFrame(step)
      }
      window.requestAnimationFrame(step)
    }
  }, [isInView, from, to, duration])

  return <span ref={ref}>{count.toFixed(decimals)}</span>
}

export default function OverviewSection() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-navy/[0.03] to-transparent pointer-events-none" />
      <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-[20%] bottom-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <Container className="relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-20 text-balance">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-sm mb-6">Data Visualization</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-6 tracking-tight">Project Overview</h2>
          <p className="text-gray-600 text-lg">Committed to ethical investment and innovation, our project brings scalable clean energy to the national grid with measurable impact.</p>
        </FadeIn>
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
              whileHover={{ y: -8, scale: 1.02 }} className="group relative p-8 glass flex flex-col items-center text-center rounded-3xl overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/40 text-primary flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300">
                  <stat.icon className="w-8 h-8 relative z-10" />
                </div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                <div className="text-4xl font-extrabold text-navy mb-1 group-hover:text-primary transition-colors duration-300">
                  {stat.isNumber ? (
                    <><Counter to={stat.value as number} decimals={stat.value.toString().includes('.') ? 2 : 0} /><span className="text-2xl text-gray-400 ml-1 font-medium">{stat.suffix}</span></>
                  ) : stat.value}
                </div>
              </div>
            </motion.div>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  )
}
