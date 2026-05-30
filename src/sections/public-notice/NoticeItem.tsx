'use client'
import { StaggerItem } from '@/components/animations/StaggerGrid'
import { Calendar, Download } from 'lucide-react'

export default function NoticeItem({ title, date, desc, fileUrl }: { title: string; date: string; desc: string; fileUrl?: string }) {
  return (
    <StaggerItem className="bg-surface border border-gray-100 p-8 rounded-2xl group hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3"><Calendar className="w-4 h-4" /> {date}</div>
      <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">{title}</h3>
      <p className="text-gray-600 mb-6">{desc}</p>
      {fileUrl ? (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-sm flex items-center gap-2 group-hover:text-primary-dark transition-colors">
          Download PDF <Download className="w-4 h-4" />
        </a>
      ) : (
        <span className="text-gray-400 font-bold text-sm flex items-center gap-2 cursor-not-allowed">
          No PDF Available <Download className="w-4 h-4 opacity-50" />
        </span>
      )}
    </StaggerItem>
  )
}
