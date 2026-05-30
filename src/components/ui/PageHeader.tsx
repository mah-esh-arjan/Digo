'use client'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface PageHeaderProps { title: string; subtitle?: string; backgroundImage?: string }

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.map((seg, i) => {
    const label = seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    const isLast = i === segments.length - 1
    return isLast ? { label: title } : { label, href: '/' + segments.slice(0, i + 1).join('/') }
  })

  return (
    <div className="w-full border-b border-slate-200 bg-slate-50 pt-24 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        {subtitle && <p className="text-slate-500 mb-3">{subtitle}</p>}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-slate-900"><Home size={13} /><span>Home</span></Link>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={13} className="text-slate-400" />
              {crumb.href ? <Link href={crumb.href} className="hover:text-slate-900">{crumb.label}</Link>
                : <span className="text-slate-900 font-medium">{crumb.label}</span>}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}
