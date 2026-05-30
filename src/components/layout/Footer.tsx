import Link from 'next/link'
import { Container } from './Container'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <img src="/image.png" alt="Digo Urja Bikas Logo" className="w-10 h-10 rounded-lg bg-white p-1 shadow-lg transition-transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">DIGO URJA BIKAS</span>
                <span className="text-[8px] font-medium tracking-wider text-gray-400">COMPANY PVT. LTD.</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enhancing Nepal&apos;s energy security by utilizing renewable hydro resources. Empowering the nation with sustainable, reliable, and clean electricity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="https://nea.org.np/en" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Nepal Electricity Authority (NEA)</a></li>
              <li><a href="https://moewri.gov.np" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Ministry of Energy</a></li>
              <li><a href="https://doed.gov.np" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Department of Electricity Development</a></li>
              <li><a href="https://aepc.gov.np" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Alternative Energy Promotion Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Opportunities</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/invest-now" className="hover:text-accent transition-colors">Investment</Link></li>
              <li><Link href="/vacancy" className="hover:text-accent transition-colors">Careers & Vacancy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-accent shrink-0 mt-1" /> Pepsicola 32, Kathmandu, Nepal</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> 015924279</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> info@digourja.com.np</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Trioplus technology Pvt. Ltd. All rights reserved. Designed for Nepal.
        </div>
      </Container>
    </footer>
  )
}
