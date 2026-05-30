'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

export interface HeroSectionProps {
  className?: string
  title: React.ReactNode
  subtitle: string
  callToAction: { text: string; href: string }
  backgroundImage: string
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, title, subtitle, callToAction, backgroundImage }, ref) => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    }
    const itemVariants: any = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    }

    return (
      <motion.section ref={ref} className={cn('relative flex w-full flex-col overflow-hidden bg-background text-foreground md:flex-row', className)}
        initial="hidden" animate="visible" variants={containerVariants}>
        <div className="flex w-full flex-col justify-between p-8 md:w-[40%] md:p-12 lg:p-16">
          <div className="flex justify-center text-center">
            <motion.main variants={itemVariants} className="text-center">
              <motion.h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl" variants={itemVariants}>{title}</motion.h1>
              <motion.p className="my-8 max-w-md text-base text-muted-foreground" variants={itemVariants}>{subtitle}</motion.p>
              <Link href={callToAction.href}
                className="inline-flex items-center gap-2 px-8 py-3 text-lg font-bold tracking-widest text-white bg-primary hover:bg-primary-dark rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                {callToAction.text} &rarr;
              </Link>
            </motion.main>
          </div>
        </div>
        <motion.div className="w-full min-h-[400px] bg-cover bg-center md:w-[60%] md:min-h-full"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: 'circOut' }} />
      </motion.section>
    )
  }
)
HeroSection.displayName = 'HeroSection'
export { HeroSection }
