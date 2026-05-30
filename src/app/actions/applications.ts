'use server'
import dbConnect from '@/lib/mongodb'
import JobApplication from '@/lib/models/JobApplication'
import { revalidatePath } from 'next/cache'

export async function getApplications() {
  await dbConnect()
  return JSON.parse(JSON.stringify(await JobApplication.find({}).sort({ createdAt: -1 }).lean()))
}
