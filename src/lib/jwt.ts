import crypto from 'crypto'

const base64UrlEncode = (input: string | Buffer | object) => {
  const value = typeof input === 'string' ? input : Buffer.from(JSON.stringify(input))
  return Buffer.from(value).toString('base64url')
}

const base64UrlDecode = (input: string) => {
  return Buffer.from(input, 'base64url').toString('utf8')
}

export type JwtPayload = {
  sub: string
  exp: number
  [key: string]: any
}

export function signJwt(payload: Record<string, any>, secret: string, expiresInSeconds = 60 * 60 * 24) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const tokenPayload = { ...payload, exp: now + expiresInSeconds }
  const encodedHeader = base64UrlEncode(header)
  const encodedPayload = base64UrlEncode(tokenPayload)
  const data = `${encodedHeader}.${encodedPayload}`
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  return `${data}.${signature}`
}

export function verifyJwt(token: string, secret: string): JwtPayload | null {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.')
    if (!encodedHeader || !encodedPayload || !signature) return null

    const data = `${encodedHeader}.${encodedPayload}`
    const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url')
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null

    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JwtPayload
    const now = Math.floor(Date.now() / 1000)
    if (typeof payload.exp !== 'number' || payload.exp < now) return null

    return payload
  } catch {
    return null
  }
}
