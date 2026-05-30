'use client'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerGrid, StaggerItem } from '@/components/animations/StaggerGrid'
import { TrendingUp, ShieldCheck, Leaf, Globe } from 'lucide-react'

const reasons = [
  { icon: TrendingUp, title: 'High Demand', desc: 'Constant national energy deficit guarantees power purchase agreements and consistent returns.' },
  { icon: ShieldCheck, title: 'Govt. Backed', desc: 'National policies strongly support and subsidize renewable energy initiatives in Nepal.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Clean, renewable hydro energy effectively reducing national carbon footprints.' },
  { icon: Globe, title: 'Economic Impact', desc: 'Creating thousands of jobs and driving local and regional economic development.' },
]

export default function WhyInvestSection() {
  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-[20%] w-[40vw] h-[40vw] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <Container className="relative z-10">
        <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 text-primary font-semibold text-sm mb-6">Strategic Advantages</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-6">Why Invest With Us</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Investing in Digo Urja Bikas means placing your capital where high demand meets robust guarantees and profound ecological impact.</p>
        </FadeIn>
        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <StaggerItem key={i} className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-accent/30 shadow-[0_4px_20px_-10px_rgba(0,31,70,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,224,255,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 border border-white/50 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500 z-10 overflow-hidden">
                <r.icon className="w-8 h-8 text-primary relative z-10 group-hover:text-accent transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4 relative z-10">{r.title}</h3>
              <p className="text-gray-600 leading-relaxed relative z-10 flex-grow">{r.desc}</p>
              <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500 absolute bottom-0 left-0" />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  )
}
