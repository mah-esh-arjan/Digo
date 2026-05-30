'use client'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { Quote } from 'lucide-react'

export default function LeadershipSection() {
  const leaders = [
    { name: 'Dr. Bishal Kumar Bhandari', role: 'Chairman', message: 'We are dedicated to excellence and completing the Kalinchowk Small Hydropower Project in just 15 months. This reflects our commitment to setting new industry standards and strengthening Nepal\u2019s energy sector.', image: '/chairman.jpeg', dark: false },
    { name: 'Prashant Chaulagain', role: 'Executive Director', message: 'Our team combines expertise in hydropower and capital markets to drive economic growth and promote sustainability. Together, we are on a journey toward absolute energy self-sufficiency.', image: '/executive.jpeg', dark: true },
  ]

  return (
    <section className="py-32 relative bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[50%] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <Container className="relative z-10">
        <FadeIn className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface shadow-sm border border-gray-100 text-primary font-bold text-xs uppercase tracking-widest mb-6">Our Leadership</div>
          <h2 className="text-5xl md:text-6xl font-black text-navy tracking-tighter leading-none">Visionary <span className="text-primary">Leadership</span></h2>
        </FadeIn>
        <div className="space-y-12">
          {leaders.map((leader, index) => (
            <FadeIn key={index} delay={index * 0.1} className={`group relative overflow-hidden rounded-[2.5rem] border ${leader.dark ? 'bg-navy border-white/5 text-white shadow-2xl shadow-navy/20' : 'bg-surface border-gray-100 text-navy shadow-xl shadow-gray-200/50'} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}>
              <div className="flex flex-col md:flex-row min-h-[400px]">
                <div className="w-full md:w-[30%] relative overflow-hidden h-[300px] md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent z-10 opacity-60" />
                  <img src={leader.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={leader.name} />
                  <div className="absolute top-0 right-0 w-1 h-full bg-primary/30 z-20" />
                </div>
                <div className="w-full md:w-[70%] p-10 md:p-16 flex flex-col justify-center relative">
                  <Quote className={`absolute top-10 right-10 w-24 h-24 ${leader.dark ? 'text-white/5' : 'text-gray-100'} -rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out`} />
                  <div className="relative z-10">
                    <div className={`text-accent font-black uppercase tracking-[0.2em] text-xs mb-4 ${leader.dark ? 'text-accent' : 'text-primary'}`}>{leader.role}</div>
                    <h3 className={`text-3xl md:text-4xl font-black mb-8 leading-tight ${leader.dark ? 'text-white' : 'text-navy'}`}>{leader.name}</h3>
                    <p className={`text-lg md:text-xl italic leading-relaxed relative ${leader.dark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-primary text-4xl leading-none absolute -left-6 -top-4 opacity-50">&ldquo;</span>
                      {leader.message}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
