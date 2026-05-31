 'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import CloudinaryImage from '@/components/ui/CloudinaryImage'

const staticImages = [
  { src: '/digo1.jpeg', title: 'Site Survey', category: 'Exploration' },
  { src: '/deigo2.jpeg', title: 'Construction Phase', category: 'Infrastructure' },
  { src: '/digo3.jpeg', title: 'Turbine Installation', category: 'Engineering' },
  { src: '/digo4.jpeg', title: 'Project completion', category: 'Infrastructure' },
]

export default function Gallery() {
  const [dynamicImages, setDynamicImages] = useState<{ src: string; title: string; category: string }[]>([])

  useEffect(() => {
    fetch('/api/gallery', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } })
      .then(res => res.json())
      .then(data => setDynamicImages(data.map((img: { imageUrl: string; title: string; category: string }) => ({ src: img.imageUrl, title: img.title, category: img.category }))))
      .catch(() => {})
  }, [])

  const allImages = [...staticImages, ...dynamicImages]

  return (
    <>
      <Navbar />
      <div className="bg-white pb-24">
        <PageHeader title="Gallery" />
        <Container className="mt-20">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl font-black text-navy mb-4">Our Project Gallery</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Witness the transformation of Nepal&apos;s landscapes into sustainable energy hubs through our various project phases.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allImages.map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl bg-gray-100 border border-gray-100 cursor-pointer">
                  <CloudinaryImage src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" width={800} height={600} />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.category}</span>
                    <h3 className="text-white text-2xl font-black translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.title}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}
