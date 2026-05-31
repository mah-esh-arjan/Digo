'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogoutPage() {
  const router = useRouter()

  useEffect(() => {
    async function logout() {
      await fetch('/api/admin/logout', { method: 'POST', cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } })
      router.push('/login')
    }
    logout()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl text-center">
        <p className="text-sm text-slate-500">Signing out...</p>
      </div>
    </div>
  )
}
