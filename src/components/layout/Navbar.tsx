'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Container } from './Container'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about-us' },
    { name: 'Projects', path: '/project-details' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Public Notice', path: '/public-notice' },
    { name: 'Vacancy', path: '/vacancy' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.05)] h-16'
        : 'bg-white/80 backdrop-blur-md h-24 border-b border-gray-50 shadow-[0_2px_15px_rgba(0,0,0,0.02)]'
    }`}>
      <Container className="h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative transition-all duration-500 ${scrolled ? 'h-10' : 'h-14'}`}>
              <img src="/image.png" alt="Digo Urja Bikas Logo" className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`font-black tracking-tight text-navy transition-all duration-500 ${scrolled ? 'text-lg' : 'text-2xl'} leading-none`}>DIGO URJA BIKAS</span>
              <span className={`font-bold tracking-[0.2em] text-primary transition-all duration-500 ${scrolled ? 'text-[8px]' : 'text-[10px]'} mt-1`}>COMPANY PVT. LTD.</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10 font-bold text-sm tracking-wide">
            {links.map((l) => (
              <Link key={l.path} href={l.path} className="transition-all duration-300 relative group flex items-center py-2 text-gray-600 hover:text-primary">
                {l.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-primary shadow-[0_0_10px_rgba(0,71,171,0.2)]" />
              </Link>
            ))}
            <Link href="/contact-us" className="rounded-full px-8 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-primary hover:bg-navy text-white shadow-[0_4px_15px_rgba(0,71,171,0.2)] font-bold text-sm">
              Contact Us
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg transition-colors text-navy" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-100 px-6 py-8 space-y-6 shadow-2xl relative">
            {links.map((l) => (
              <Link key={l.path} href={l.path} className="block text-gray-800 font-bold text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                {l.name}
              </Link>
            ))}
            <Link href="/contact-us" onClick={() => setIsOpen(false)}
              className="block w-full bg-primary hover:bg-navy rounded-full h-12 text-base font-bold shadow-lg text-center leading-[3rem] text-white">
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
