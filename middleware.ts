import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_PATH = '/admin'
const LOGIN_PATH = '/login'
const ADMIN_API_LOGIN = '/api/admin/login'
const ADMIN_API_LOGOUT = '/api/admin/logout'
const ADMIN_TOKEN_NAME = 'admin-token'
const JWT_SECRET = process.env.ADMIN_JWT_SECRET as string
if (!JWT_SECRET) {
  throw new Error('ADMIN_JWT_SECRET environment variable is required')
}
const PUBLIC_FILE = /\.(.*)$/

async function base64UrlDecode(value: string) {
  let base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) base64 += '='
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

async function verifyJwt(token: string, secret: string) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false

    const [encodedHeader, encodedPayload, encodedSignature] = parts
    const data = `${encodedHeader}.${encodedPayload}`
    const signature = await base64UrlDecode(encodedSignature)

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      new TextEncoder().encode(data)
    )
    if (!valid) return false

    const payloadBytes = await base64UrlDecode(encodedPayload)
    const payloadJson = new TextDecoder().decode(payloadBytes)
    const payload = JSON.parse(payloadJson)

    if (typeof payload.exp !== 'number') return false
    const now = Math.floor(Date.now() / 1000)
    return payload.exp > now
  } catch {
    return false
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_TOKEN_NAME)?.value
  const authenticated = token ? await verifyJwt(token, JWT_SECRET) : false

  // if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`) || pathname === ADMIN_API_LOGIN || pathname === ADMIN_API_LOGOUT) {
  //   return NextResponse.next()
  // }

  if (pathname.startsWith('/api/admin')) {
    if (authenticated) {
      return NextResponse.next()
    }
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (pathname.startsWith(ADMIN_PATH)) {
    if (authenticated) {
      return NextResponse.next()
    }
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = LOGIN_PATH
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
