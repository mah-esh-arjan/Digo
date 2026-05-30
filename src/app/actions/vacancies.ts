'use server'
import dbConnect from '@/lib/mongodb'
import Vacancy from '@/lib/models/Vacancy'
import { revalidatePath } from 'next/cache'

export async function getVacancies() {
  await dbConnect()
  return JSON.parse(JSON.stringify(await Vacancy.find({}).sort({ createdAt: -1 }).lean()))
}

export async function createVacancy(data: { title: string; description: string; deadline: string }) {
  await dbConnect()
  const vacancy = await Vacancy.create({ ...data, deadline: new Date(data.deadline) })
  revalidatePath('/admin/vacancies')
  return JSON.parse(JSON.stringify(vacancy))
}

export async function updateVacancy(id: string, data: { title: string; description: string; deadline: string }) {
  await dbConnect()
  const vacancy = await Vacancy.findByIdAndUpdate(id, { ...data, deadline: new Date(data.deadline) }, { new: true })
  revalidatePath('/admin/vacancies')
  return JSON.parse(JSON.stringify(vacancy))
}

export async function deleteVacancy(id: string) {
  await dbConnect()
  await Vacancy.findByIdAndDelete(id)
  revalidatePath('/admin/vacancies')
}
