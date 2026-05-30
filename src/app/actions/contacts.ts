'use server'
import dbConnect from '@/lib/mongodb'
import ContactUs from '@/lib/models/ContactUs'
import { revalidatePath } from 'next/cache'
import { sendEmail } from '@/lib/mailer'

export async function getContacts() {
  await dbConnect()
  return JSON.parse(JSON.stringify(await ContactUs.find({}).sort({ createdAt: -1 }).lean()))
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  await dbConnect()
  const contact = await ContactUs.create(data)
  sendEmail(
    process.env.SMTP_USER || 'admin@digourja.com',
    `New Contact Inquiry from ${data.name}`,
    `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
  ).catch(err => console.error('Email send failed:', err))
  revalidatePath('/admin/contacts')
  return JSON.parse(JSON.stringify(contact))
}

export async function deleteContact(id: string) {
  await dbConnect()
  await ContactUs.findByIdAndDelete(id)
  revalidatePath('/admin/contacts')
}
