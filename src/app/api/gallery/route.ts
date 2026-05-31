import dbConnect from '@/lib/mongodb'
import GalleryImage from '@/lib/models/GalleryImage'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect()
    const images = await GalleryImage.find({}).sort({ createdAt: -1 }).lean()
    const response = NextResponse.json(images)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch {
    return NextResponse.json([])
  }
}
