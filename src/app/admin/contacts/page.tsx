'use client'
import { useState, useEffect } from 'react'
import { Mail, Phone, User, Calendar, Trash2 } from 'lucide-react'
import { getContacts, deleteContact } from '@/app/actions/contacts'

interface Contact { _id: string; name: string; email: string; phone?: string; message: string; createdAt: string }

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContacts().then(data => { setContacts(data as any); setLoading(false) })
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    try { await deleteContact(id); setContacts(prev => prev.filter(c => c._id !== id)) } catch { alert('Failed to delete.') }
  }

  return (
    <div className="p-8">
      <header className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Inquiries</h1><p className="text-slate-500">View messages from the contact form.</p></header>
      <div className="space-y-6">
        {loading ? <div className="text-center py-12 text-slate-500">Loading...</div> : contacts.map(c => (
          <div key={c._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full"><User size={14} className="text-blue-500" /><span className="font-medium">{c.name}</span></span>
                <span className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full"><Mail size={14} className="text-blue-500" /><span>{c.email}</span></span>
                {c.phone && <span className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full"><Phone size={14} className="text-blue-500" /><span>{c.phone}</span></span>}
                <span className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full"><Calendar size={14} className="text-blue-500" /><span>{new Date(c.createdAt).toLocaleDateString()}</span></span>
              </div>
              <p className="text-slate-700 leading-relaxed bg-blue-50/30 p-4 rounded-xl border border-blue-50">{c.message}</p>
            </div>
            <button onClick={() => handleDelete(c._id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={20} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}
