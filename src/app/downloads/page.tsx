'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import { FileText, Download } from 'lucide-react'

const documents = [
  { name: 'Annual Report 2024', size: '2.4 MB', type: 'PDF' },
  { name: 'Environment Impact Assessment (EIA)', size: '4.8 MB', type: 'PDF' },
  { name: 'Project Brochure - Okhaldhunga', size: '1.1 MB', type: 'PDF' },
  { name: 'Company Profile', size: '3.2 MB', type: 'PDF' },
]

export default function Downloads() {
  return (
    <>
      <Navbar />
      <div className="bg-white pb-24">
        <PageHeader title="Downloads" />
        <Container className="mt-20">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl font-black text-navy mb-4">Resource Center</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Access and download our latest reports, project details, and corporate documents.</p>
            </FadeIn>
            <div className="grid gap-4">
              {documents.map((doc, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:bg-navy hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><FileText size={28} /></div>
                      <div><h3 className="font-bold text-navy text-xl group-hover:text-white transition-colors">{doc.name}</h3><div className="flex items-center gap-3 mt-1"><span className="text-xs font-bold text-primary uppercase group-hover:text-primary-light">{doc.type}</span><span className="text-sm text-gray-400 group-hover:text-gray-300">{doc.size}</span></div></div>
                    </div>
                    <button className="flex items-center gap-2 bg-white text-navy font-bold px-6 py-3 rounded-xl shadow-sm hover:bg-primary hover:text-white transition-all hover:-translate-x-2"><Download size={20} /><span className="hidden md:inline">Download</span></button>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}
