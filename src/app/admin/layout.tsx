import { cookies } from 'next/headers'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { verifyJwt } from '@/lib/jwt'

const ADMIN_TOKEN_NAME = 'admin-token'
const JWT_SECRET = process.env.ADMIN_JWT_SECRET ?? 'digourja-admin-secret'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(ADMIN_TOKEN_NAME)?.value
  const authenticated = token ? verifyJwt(token, JWT_SECRET) : false

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-4">403 Forbidden</h1>
          <p className="text-slate-500 mb-6">You must be authenticated to view this admin page.</p>
          <a href="/login" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
