import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import JobApplication from '@/lib/models/JobApplication'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const formData = await req.formData()
    const vacancyId = formData.get('vacancyId') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const cv = formData.get('cv') as File

    if (!vacancyId || !name || !email || !cv) {
      return NextResponse.json({ error: 'vacancyId, name, email and CV are required' }, { status: 400 })
    }

    const { v2: cloudinary } = await import('cloudinary')
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const buffer = Buffer.from(await cv.arrayBuffer())
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'digourja/cvs', resource_type: 'raw' },
        (error, result) => { if (error) reject(error); else resolve(result) }
      )
      uploadStream.end(buffer)
    })

    const application = await JobApplication.create({
      vacancyId, name, email,
      phone: phone || null,
      message: message || null,
      cvUrl: result.secure_url,
    })
    const response = NextResponse.json(application, { status: 201 })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Application submit failed:', message, error)
    return NextResponse.json({ error: message || 'Failed to submit application' }, { status: 500 })
  }
}
