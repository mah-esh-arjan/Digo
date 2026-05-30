import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import PublicNotice from '@/lib/models/PublicNotice'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const formData = await req.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const file = formData.get('pdf') as File | null

    let fileUrl: string | undefined
    if (file && file.size > 0) {
      const { v2: cloudinary } = await import('cloudinary')
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'digourja/notices', resource_type: 'auto' },
          (error, result) => { if (error) reject(error); else resolve(result) }
        )
        uploadStream.end(buffer)
      })
      fileUrl = result.secure_url
    }

    const notice = await PublicNotice.create({ title, content, fileUrl })
    return NextResponse.json(notice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 })
  }
}
