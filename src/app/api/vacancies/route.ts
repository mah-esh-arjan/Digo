import dbConnect from '@/lib/mongodb'
import Vacancy from '@/lib/models/Vacancy'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await dbConnect()
    const vacancies = await Vacancy.find({}).sort({ createdAt: -1 }).lean()
    const response = NextResponse.json(vacancies)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch {
    return NextResponse.json([])
  }
}
