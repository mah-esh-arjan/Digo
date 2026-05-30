'use client'
import { useState } from 'react'
import { StaggerItem } from '@/components/animations/StaggerGrid'
import { MapPin, Briefcase, Clock, X, Upload } from 'lucide-react'

interface JobProps { id: string; title: string; type: string; location: string; date: string }

export default function JobCard({ id, title, type, location, date }: JobProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [cv, setCv] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cv) return alert('Please attach your CV.')
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('vacancyId', id)
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('message', form.message)
      fd.append('cv', cv)
      const res = await fetch('/api/admin/applications', { method: 'POST', body: fd })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || 'Failed to submit application.')
      }
      setSubmitted(true)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to submit application.')
    } finally { setSubmitting(false) }
  }

  return (
    <>
      <StaggerItem className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" /> {type}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {location}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {date}</span>
          </div>
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-navy hover:bg-primary rounded-xl px-8 h-12 w-full md:w-auto text-white font-medium">Apply Now</button>
      </StaggerItem>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <div><h2 className="text-xl font-bold text-slate-900">Apply for {title}</h2><p className="text-sm text-slate-500">{location} &middot; {type}</p></div>
              <button onClick={() => { setIsOpen(false); setSubmitted(false) }} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                <p className="text-slate-500">We&apos;ll review your application and get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label><input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="John Doe" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone</label><input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="+977 98XXXXXXXX" /></div>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Email</label><input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="you@example.com" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Cover Letter (optional)</label><textarea rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" placeholder="Why are you a good fit?" /></div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CV / Resume <span className="text-red-500">*</span></label>
                  <label className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border-2 border-dashed border-slate-200 hover:border-blue-400 cursor-pointer transition-colors bg-slate-50">
                    <Upload size={18} className="text-slate-400" />
                    <span className="text-sm text-slate-500">{cv ? cv.name : 'Click to upload PDF or DOC'}</span>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setCv(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-navy text-white font-semibold py-2.5 rounded-lg hover:bg-primary transition-colors disabled:opacity-60">{submitting ? 'Submitting...' : 'Submit Application'}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
