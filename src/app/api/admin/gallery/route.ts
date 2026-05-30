import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryImage from '@/lib/models/GalleryImage'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const formData = await req.formData()
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const file = formData.get('image') as File

    if (!title || !category || !file) {
      return NextResponse.json({ error: 'Title, category, and image are required' }, { status: 400 })
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
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
