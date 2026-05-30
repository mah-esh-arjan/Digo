import { NextRequest, NextResponse } from 'next/server'
import { signJwt } from '@/lib/jwt'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'digourja'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Nepal12@34'
const ADMIN_COOKIE_NAME = 'admin-token'
const JWT_SECRET = process.env.ADMIN_JWT_SECRET ?? 'digourja-admin-secret'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const username = String(body.username || '')
  const password = String(body.password || '')

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const token = signJwt({ sub: username }, JWT_SECRET, 60 * 60 * 24)
  const response = NextResponse.json({ success: true })
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return response
}
