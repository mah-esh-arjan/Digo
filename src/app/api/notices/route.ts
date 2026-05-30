import dbConnect from '@/lib/mongodb'
import PublicNotice from '@/lib/models/PublicNotice'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect()
    const notices = await PublicNotice.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json(notices)
  } catch {
    return NextResponse.json([])
  }
}
