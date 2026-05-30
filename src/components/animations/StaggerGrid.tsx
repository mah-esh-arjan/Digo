'use client'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export const StaggerGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className={className}>
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={item} className={className}>
    {children}
  </motion.div>
)
