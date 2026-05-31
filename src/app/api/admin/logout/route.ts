import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ADMIN_COOKIE_NAME = 'admin-token'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
