'use client'

import { Suspense } from 'react'
import AdminLoginForm from './AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="animate-pulse space-y-5">
            <div className="h-8 bg-slate-200 rounded w-1/2" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="space-y-3">
              <div className="h-12 bg-slate-100 rounded-2xl" />
              <div className="h-12 bg-slate-100 rounded-2xl" />
            </div>
            <div className="h-12 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  )
}
