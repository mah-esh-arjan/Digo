import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import { Zap, MapPin, BarChart3, Clock, DollarSign, Waves } from 'lucide-react'

export default function ProjectDetail() {
  const project = {
    name: 'Bhuji Khola Hydroelectric Project',
    capacity: '7.96 MW',
    location: 'Dhorpatan Municipality, Burtibang, Baglung',
    river: 'Bhuji Khola',
    type: 'Run-of-River (ROR)',
    catchmentArea: '118.53 Km\u00b2',
    totalEnergy: '40.71 GWh',
    cost: 'NRs. 990.08 million',
    payback: '8.18 Years',
    developer: 'Topkegola Hydropower Private Limited',
    image: '/digo1.jpeg',
  }

  const stats = [
    { label: 'Installed Capacity', value: project.capacity, icon: Zap },
    { label: 'Location', value: 'Baglung, Gandaki', icon: MapPin },
    { label: 'Annual Energy', value: project.totalEnergy, icon: Waves },
    { label: 'Project Cost', value: project.cost, icon: DollarSign },
    { label: 'Payback Period', value: project.payback, icon: Clock },
    { label: 'Design Flow', value: '5.42 m\u00b3/s', icon: BarChart3 },
  ]

  return (
    <>
      <Navbar />
      <div className="bg-white pb-32">
        <PageHeader title={project.name} />
        <Container className="mt-20">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <FadeIn><div className="aspect-video w-full rounded-4xl overflow-hidden shadow-2xl border-8 border-gray-50"><img src={project.image} alt={project.name} className="w-full h-full object-cover" /></div></FadeIn>
              <FadeIn><h2 className="text-4xl font-black text-navy mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                  <p>The <strong>{project.name}</strong> is a high-efficiency <strong>{project.type}</strong> hydropower project located in the <strong>{project.location}</strong>. Harnessing the power of the <strong>{project.river}</strong>, this project is designed to generate significant clean energy for the national grid.</p>
                  <p>The project features a diversion weir of 44.0m length and 6.0m height, with a headrace pipe spanning 2460m. The electromechanical system consists of two units of Horizontal Shaft Francis Turbines, each with a capacity of 3.98 MW.</p>
                </div>
              </FadeIn>
              <FadeIn><h2 className="text-4xl font-black text-navy mb-8">Technical Highlights</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[{ title: 'Diversion Weir', desc: '44.0 m length, Concrete Free Overflow' }, { title: 'Gross Head', desc: '180.0 m' }, { title: 'Headrace Pipe', desc: '2460 m length, 1.80 m Diameter' }, { title: 'Power House', desc: 'Surface type (21m x 9m x 9m)' }, { title: 'Transmission', desc: '33 kV 3-phase line (7.50 Km)' }, { title: 'River Basin', desc: 'Badigad River Basin' }].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 font-bold"><p className="text-primary text-sm uppercase tracking-widest mb-1">{item.title}</p><p className="text-navy text-lg">{item.desc}</p></div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-1"><FadeIn className="sticky top-32">
              <div className="bg-navy rounded-4xl p-8 text-white shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-12 translate-x-12" />
                <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">Salient Features</h3>
                <div className="space-y-8">
                  {stats.map((s, i) => (
                    <div key={i} className="flex gap-4 items-start group/stat">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover/stat:bg-primary transition-colors"><s.icon size={20} /></div>
                      <div><p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">{s.label}</p><p className="text-lg font-black text-white">{s.value}</p></div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10"><p className="text-sm font-medium text-white/70 italic text-center leading-relaxed">&quot;Driving economic growth and promoting sustainability through absolute energy self-sufficiency.&quot;</p></div>
              </div>
            </FadeIn></div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}
