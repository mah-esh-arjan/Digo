import dbConnect from '@/lib/mongodb'
import PublicNotice from '@/lib/models/PublicNotice'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await dbConnect()
    const notices = await PublicNotice.find({}).sort({ createdAt: -1 }).lean()
    const response = NextResponse.json(notices)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch {
    return NextResponse.json([])
  }
}
