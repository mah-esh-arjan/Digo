import { NextRequest, NextResponse } from 'next/server'
import { signJwt } from '@/lib/jwt'
import { rateLimit, getClientIP } from '@/lib/rate-limiter'

export const dynamic = 'force-dynamic'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_COOKIE_NAME = 'admin-token'
const JWT_SECRET = process.env.ADMIN_JWT_SECRET as string
if (!JWT_SECRET) throw new Error('ADMIN_JWT_SECRET environment variable is required')

export async function POST(req: NextRequest) {
  const ip = getClientIP(req)
  const limit = await rateLimit('login', ip)
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 })
  }

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const body = await req.json()
  const username = String(body?.username || '')
  const password = String(body?.password || '')

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const token = signJwt({ sub: username }, JWT_SECRET, 60 * 60 * 24)
  const response = NextResponse.json({ success: true })
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return response
}
