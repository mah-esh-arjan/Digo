import dbConnect from '@/lib/mongodb'
import GalleryImage from '@/lib/models/GalleryImage'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect()
    const images = await GalleryImage.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json(images)
  } catch {
    return NextResponse.json([])
  }
}
