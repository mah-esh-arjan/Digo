'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, FileText, X } from 'lucide-react'
import { deleteNotice } from '@/app/actions/notices'

interface Notice { _id: string; title: string; content: string; fileUrl?: string; createdAt: string }

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchNotices = () => {
    setLoading(true)
    fetch('/api/notices', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } }).then(res => res.json()).then(data => { setNotices(data); setLoading(false) }).catch(() => setLoading(false))
  }

  useEffect(() => { fetchNotices() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('title', formData.title)
      fd.append('content', formData.content)
      if (file) fd.append('pdf', file)
      const res = await fetch('/api/admin/notices', { method: 'POST', cache: 'no-store', headers: { 'Cache-Control': 'no-cache' }, body: fd })
      if (!res.ok) throw new Error()
      setIsModalOpen(false); setFormData({ title: '', content: '' }); setFile(null); fetchNotices()
    } catch { alert('Failed to post notice.') } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return
    try { await deleteNotice(id); fetchNotices() } catch { alert('Failed to delete.') }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-slate-900">Public Notices</h1><p className="text-slate-500">Manage official announcements.</p></div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"><Plus size={20} /> Post Notice</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {loading ? <div className="text-center py-12 text-slate-500">Loading...</div> : notices.length === 0 ? <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">No notices posted yet.</div> : notices.map(n => (
          <div key={n._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center hover:border-blue-200 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FileText size={24} /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900">{n.title}</h3>{n.fileUrl && <a href={n.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline">View PDF</a>}</div>
                <p className="text-sm text-slate-500 mb-2">{new Date(n.createdAt).toLocaleDateString()}</p>
                <p className="text-slate-600 text-sm line-clamp-2">{n.content}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(n._id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={20} /></button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100"><h2 className="text-xl font-bold text-slate-900">Post New Public Notice</h2><button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Notice Title</label><input type="text" required value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Annual General Meeting" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Content</label><textarea required rows={4} value={formData.content} onChange={e => setFormData(p => ({ ...p, content: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Details..." /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Upload PDF (optional)</label><input type="file" accept=".pdf" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" /></div>
              <div className="pt-2"><button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400">{submitting ? 'Posting...' : 'Post Notice'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
