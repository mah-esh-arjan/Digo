'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { FadeIn } from '@/components/animations/FadeIn'

const SHARE_PAR_VALUE = 100
const PAYMENT_OPTIONS = [
  { label: '10%', value: 0.1 },
  { label: '20%', value: 0.2 },
  { label: '100% (Full)', value: 1 },
]

export default function InvestNow() {
  const [form, setForm] = useState({ name: '', permanentAddress: '', temporaryAddress: '', contactInfo: '', numberOfShares: '', paymentOption: 1, declared: false })
  const [submitted, setSubmitted] = useState(false)

  const numShares = parseInt(form.numberOfShares) || 0
  const totalAmount = numShares * SHARE_PAR_VALUE
  const payableNow = totalAmount * form.paymentOption
  const remainingAmount = totalAmount - payableNow

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <PageHeader title="Invest Now" subtitle="Share Commitment Form" />
        <div className="pt-20 pb-32"><Container><FadeIn><div className="max-w-lg mx-auto text-center py-20">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"><svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
          <h2 className="text-3xl font-bold text-navy mb-4">Commitment Received</h2>
          <p className="text-gray-500 mb-8">Thank you, <span className="font-semibold text-navy">{form.name}</span>. Your share commitment for <span className="font-semibold text-navy">{numShares} shares</span> (NPR {totalAmount.toLocaleString()}) has been recorded. Our team will contact you shortly with payment instructions.</p>
          <button onClick={() => setSubmitted(false)} className="text-accent underline text-sm hover:text-navy transition-colors">Submit another commitment</button>
        </div></FadeIn></Container></div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <PageHeader title="Invest Now" subtitle="Share Commitment Form" />
      <div className="pt-16 pb-32 bg-slate-50">
        <Container><FadeIn>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-navy mb-1">Share Commitment</h2>
            <p className="text-gray-500 text-sm mb-8">Fill in your details to commit to purchasing shares in Digo Urja Bikas Company Pvt. Ltd.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label><input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Permanent Address</label><input name="permanentAddress" value={form.permanentAddress} onChange={handleChange} required placeholder="District, Province" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Temporary Address</label><input name="temporaryAddress" value={form.temporaryAddress} onChange={handleChange} placeholder="Current address (if different)" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Contact Info</label><input name="contactInfo" value={form.contactInfo} onChange={handleChange} required placeholder="Phone number or email" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" /></div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">No. of Shares <span className="text-slate-400 font-normal">(A)</span></label><input name="numberOfShares" type="number" min="1" value={form.numberOfShares} onChange={handleChange} required placeholder="e.g. 100" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" /></div>
                <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Par Value <span className="text-slate-400">(B)</span></span><span className="font-semibold text-navy">Rs. {SHARE_PAR_VALUE}</span></div>
                <div className="flex items-center justify-between text-sm border-t border-slate-200 pt-4"><span className="font-medium text-slate-700">Total Amount (A &times; B)</span><span className="text-lg font-bold text-navy">NPR {totalAmount.toLocaleString()}</span></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Payment Option</label>
                <div className="flex gap-3 flex-wrap">{PAYMENT_OPTIONS.map(opt => (
                  <button key={opt.value} type="button" onClick={() => setForm(prev => ({ ...prev, paymentOption: opt.value }))}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.paymentOption === opt.value ? 'bg-accent text-white border-accent shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-accent/50'}`}>{opt.label}</button>
                ))}</div>
                {numShares > 0 && <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/10 text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-slate-500">Payable Now</span><span className="font-bold text-navy">NPR {payableNow.toLocaleString()}</span></div>
                  {form.paymentOption < 1 && <div className="flex justify-between"><span className="text-slate-500">Remaining Amount</span><span className="font-medium text-slate-700">NPR {remainingAmount.toLocaleString()}</span></div>}
                </div>}
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" name="declared" checked={form.declared} onChange={handleChange} required className="mt-1 w-4 h-4 accent-accent rounded" />
                <span className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">I hereby declare that all information provided is true and correct. I also understand that I have read and understood the terms and conditions of this share commitment.</span>
              </label>
              <button type="submit" disabled={!form.declared} className="w-full bg-navy text-white font-bold py-4 rounded-2xl hover:bg-accent hover:text-navy transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm tracking-wide">Proceed to Pay</button>
              <p className="text-center text-xs text-slate-400">You can also pay via QR code &mdash; our team will send it after reviewing your commitment.</p>
            </form>
          </div>
        </FadeIn></Container>
      </div>
      <Footer />
    </>
  )
}
