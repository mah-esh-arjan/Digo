'use client'
import { FadeIn } from '@/components/animations/FadeIn'
import { useState } from 'react'
import { submitContact } from '@/app/actions/contacts'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    try {
      await submitContact(data)
      setStatus({ type: 'success', message: 'Your message has been sent successfully!' })
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn delay={0.2} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-navy mb-6">Send us a Message</h3>
      {status && (
        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input required name="firstName" placeholder="John" className="w-full flex h-9 rounded-md border border-gray-200 bg-surface px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input required name="lastName" placeholder="Doe" className="w-full flex h-9 rounded-md border border-gray-200 bg-surface px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" required name="email" placeholder="john@example.com" className="w-full flex h-9 rounded-md border border-gray-200 bg-surface px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Your Message</label>
          <textarea required name="message" placeholder="How can we help you?" className="flex min-h-[150px] w-full rounded-md border border-gray-200 bg-surface px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950" />
        </div>
        <button type="submit" disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark h-12 text-lg rounded-xl transition-all font-medium text-white disabled:opacity-50">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </FadeIn>
  )
}
