import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import JobApplication from '@/lib/models/JobApplication'
import { rateLimit, getClientIP } from '@/lib/rate-limiter'
import validator from 'validator'
import { sanitizeString, validateString, validateEmail, isValidFile } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req)
    const limit = await rateLimit('application', ip)
    if (!limit.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
    }

    await dbConnect()
    const formData = await req.formData()
    const vacancyIdRaw = formData.get('vacancyId')
    const nameRaw = formData.get('name')
    const emailRaw = formData.get('email')
    const phoneRaw = formData.get('phone')
    const messageRaw = formData.get('message')
    const cv = formData.get('cv') as File

    if (!validateString(vacancyIdRaw, 1, 100)) {
      return NextResponse.json({ error: 'Vacancy ID is required' }, { status: 400 })
    }
    if (!validateString(nameRaw, 2, 100)) {
      return NextResponse.json({ error: 'Name is required (2–100 chars)' }, { status: 400 })
    }
    if (!validateString(emailRaw, 5, 254) || !validateEmail(emailRaw as string)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!cv) {
      return NextResponse.json({ error: 'CV file is required' }, { status: 400 })
    }

    const validation = isValidFile(cv, 'cv')
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason }, { status: 400 })
    }

    const vacancyId = sanitizeString(vacancyIdRaw as string, 100)
    const name = sanitizeString(nameRaw as string, 100)
    const email = validator.normalizeEmail(sanitizeString(emailRaw as string, 254)) || sanitizeString(emailRaw as string, 254)
    const phone = phoneRaw ? sanitizeString(phoneRaw as string, 20) : null
    const message = messageRaw ? sanitizeString(messageRaw as string, 5000) : null

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
