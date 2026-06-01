import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryImage from '@/lib/models/GalleryImage'
import { rateLimit, getClientIP } from '@/lib/rate-limiter'
import { sanitizeString, validateString, isValidFile } from '@/lib/validation'
import { optimizeImage } from '@/lib/image-optimizer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req)
    const limit = await rateLimit('upload', ip)
    if (!limit.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
    }

    await dbConnect()
    const formData = await req.formData()
    const titleRaw = formData.get('title')
    const categoryRaw = formData.get('category')
    const file = formData.get('image') as File

    if (!validateString(titleRaw, 2, 200)) {
      return NextResponse.json({ error: 'Title is required (2–200 chars)' }, { status: 400 })
    }
    if (!validateString(categoryRaw, 1, 100)) {
      return NextResponse.json({ error: 'Category is required (1–100 chars)' }, { status: 400 })
    }
    if (!file) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 })
    }

    const validation = isValidFile(file, 'image')
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason }, { status: 400 })
    }

    const title = sanitizeString(titleRaw as string, 200)
    const category = sanitizeString(categoryRaw as string, 100)

    const { v2: cloudinary } = await import('cloudinary')
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    let buffer: Buffer = Buffer.from(await file.arrayBuffer())

    // Optimize before upload
    try {
      buffer = await optimizeImage(buffer) as Buffer
    } catch (err) {
      console.warn('Image optimization failed, uploading raw file:', err)
    }

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'digourja/gallery' },
        (error, result) => { if (error) reject(error); else resolve(result) }
      )
      uploadStream.end(buffer)
    })

    const image = await GalleryImage.create({
      title, category,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    })
    const response = NextResponse.json(image, { status: 201 })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch (error) {
    console.error('Gallery upload failed:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
