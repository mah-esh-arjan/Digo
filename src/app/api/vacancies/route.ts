import dbConnect from '@/lib/mongodb'
import Vacancy from '@/lib/models/Vacancy'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect()
    const vacancies = await Vacancy.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json(vacancies)
  } catch {
    return NextResponse.json([])
  }
}
