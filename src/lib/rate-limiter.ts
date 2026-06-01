import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiters = {
  login: new RateLimiterMemory({ keyPrefix: 'login', points: 5, duration: 300 }),
  contact: new RateLimiterMemory({ keyPrefix: 'contact', points: 3, duration: 900 }),
  upload: new RateLimiterMemory({ keyPrefix: 'upload', points: 10, duration: 900 }),
  application: new RateLimiterMemory({ keyPrefix: 'application', points: 2, duration: 900 }),
  general: new RateLimiterMemory({ keyPrefix: 'general', points: 100, duration: 60 }),
}

export type RateLimitType = keyof typeof rateLimiters

export async function rateLimit(type: RateLimitType, key: string) {
  try {
    await rateLimiters[type].consume(key)
    return { allowed: true as const }
  } catch (rejRes: any) {
    return {
      allowed: false as const,
      retryAfter: Math.ceil((rejRes?.msBeforeNext ?? 60000) / 1000),
    }
  }
}

export function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}
