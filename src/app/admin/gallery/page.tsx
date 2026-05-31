'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, X, ImageIcon } from 'lucide-react'
import { deleteGalleryImage } from '@/app/actions/gallery'

interface GalleryImage { _id: string; title: string; category: string; imageUrl: string }

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', category: '' })
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchImages = () => {
    setLoading(true)
    fetch('/api/gallery', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } }).then(res => res.json()).then(data => { setImages(data); setLoading(false) }).catch(() => setLoading(false))
  }

  useEffect(() => { fetchImages() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return alert('Please select an image.')
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('title', formData.title)
      fd.append('category', formData.category)
      fd.append('image', file)
      const res = await fetch('/api/admin/gallery', { method: 'POST', cache: 'no-store', headers: { 'Cache-Control': 'no-cache' }, body: fd })
      if (!res.ok) throw new Error()
      setIsModalOpen(false); setFormData({ title: '', category: '' }); setPreview(null); fetchImages()
    } catch { alert('Failed to upload.') } finally { setSubmitting(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    try { await deleteGalleryImage(id); fetchImages() } catch { alert('Failed to delete.') }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-slate-900">Gallery</h1><p className="text-slate-500">Manage project gallery images.</p></div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"><Plus size={20} /> Upload Image</button>
      </div>
      {loading ? <p className="text-slate-500">Loading...</p> : images.length === 0 ? <p className="text-slate-500">No images uploaded yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img._id} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-sm">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 text-center">
                <p className="text-white font-semibold text-sm">{img.title}</p>
                <p className="text-white/70 text-xs">{img.category}</p>
                <button onClick={() => handleDelete(img._id)} className="mt-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100"><h2 className="text-xl font-bold text-slate-900">Upload Image</h2><button onClick={() => { setIsModalOpen(false); setPreview(null) }} className="text-slate-400 hover:text-slate-600"><X size={24} /></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div onClick={() => fileRef.current?.click()} className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors overflow-hidden bg-slate-50">
                {preview ? <img src={preview} className="w-full h-full object-cover" alt="preview" /> : <div className="flex flex-col items-center gap-2 text-slate-400"><ImageIcon size={32} /><span className="text-sm">Click to select image</span></div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setPreview(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Title</label><input type="text" required value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Turbine Installation" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Category</label><input type="text" required value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Engineering" /></div>
              <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400">{submitting ? 'Uploading...' : 'Upload'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
