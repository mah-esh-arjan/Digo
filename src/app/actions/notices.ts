'use server'
import dbConnect from '@/lib/mongodb'
import PublicNotice from '@/lib/models/PublicNotice'
import { revalidatePath } from 'next/cache'

export async function getNotices() {
  await dbConnect()
  return JSON.parse(JSON.stringify(await PublicNotice.find({}).sort({ createdAt: -1 }).lean()))
}

export async function deleteNotice(id: string) {
  await dbConnect()
  await PublicNotice.findByIdAndDelete(id)
  revalidatePath('/admin/notices')
}
