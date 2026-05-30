'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Bell, MessageSquare, Images, FileUser, LogOut } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
  { name: 'Vacancies', icon: <Briefcase size={20} />, path: '/admin/vacancies' },
  { name: 'Applications', icon: <FileUser size={20} />, path: '/admin/applications' },
  { name: 'Public Notices', icon: <Bell size={20} />, path: '/admin/notices' },
  { name: 'Gallery', icon: <Images size={20} />, path: '/admin/gallery' },
  { name: 'Contact Inquiries', icon: <MessageSquare size={20} />, path: '/admin/contacts' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-blue-400">Digourja</h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.path ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link href="/admin/logout" className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </Link>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Back to Site</span>
        </Link>
      </div>
    </div>
  )
}
