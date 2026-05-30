'use client'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ vacancies: 0, notices: 0, contacts: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/vacancies').then(r => r.json()),
      fetch('/api/notices').then(r => r.json()),
    ]).then(([vacancies, notices]) => {
      setStats({ vacancies: vacancies.length, notices: notices.length, contacts: 0 })
    })
  }, [])

  return (
    <div className="p-8">
      <header className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Dashboard</h1><p className="text-slate-500">Welcome to the digourja CMS.</p></header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"><h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Vacancies</h3><p className="text-4xl font-bold text-slate-900">{stats.vacancies}</p></div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"><h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Public Notices</h3><p className="text-4xl font-bold text-slate-900">{stats.notices}</p></div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"><h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Inquiries</h3><p className="text-4xl font-bold text-blue-600">{stats.contacts}</p></div>
      </div>
    </div>
  )
}
