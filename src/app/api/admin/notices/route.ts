import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import PublicNotice from '@/lib/models/PublicNotice'
import { rateLimit, getClientIP } from '@/lib/rate-limiter'
import { sanitizeString, validateString, isValidFile } from '@/lib/validation'

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
    const contentRaw = formData.get('content')
    const file = formData.get('pdf') as File | null

    if (!validateString(titleRaw, 2, 200)) {
      return NextResponse.json({ error: 'Title is required (2–200 chars)' }, { status: 400 })
    }
    if (!validateString(contentRaw, 2, 5000)) {
      return NextResponse.json({ error: 'Content is required (2–5000 chars)' }, { status: 400 })
    }

    const title = sanitizeString(titleRaw as string, 200)
    const content = sanitizeString(contentRaw as string, 5000)

    let fileUrl: string | undefined
    if (file && file.size > 0) {
      const validation = isValidFile(file, 'pdf')
      if (!validation.valid) {
        return NextResponse.json({ error: validation.reason }, { status: 400 })
      }

      const { v2: cloudinary } = await import('cloudinary')
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'digourja/notices', resource_type: 'raw' },
          (error, result) => { if (error) reject(error); else resolve(result) }
        )
        uploadStream.end(buffer)
      })
      fileUrl = result.secure_url
    }

    const notice = await PublicNotice.create({ title, content, fileUrl })
    const response = NextResponse.json(notice, { status: 201 })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch (error) {
    console.error('Notice creation failed:', error)
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 })
  }
}
