'use server'
import dbConnect from '@/lib/mongodb'
import ContactUs from '@/lib/models/ContactUs'
import { revalidatePath } from 'next/cache'
import { sendEmail } from '@/lib/mailer'
import validator from 'validator'
import { headers } from 'next/headers'
import { sanitizeString, validateString, validateEmail } from '@/lib/validation'
import { rateLimit } from '@/lib/rate-limiter'

function getIP(): string {
  const h = headers()
  const forwarded = h.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return h.get('x-real-ip') || 'unknown'
}

export async function getContacts() {
  await dbConnect()
  return JSON.parse(JSON.stringify(await ContactUs.find({}).sort({ createdAt: -1 }).lean()))
}

export async function submitContact(data: { name: string; email: string; message: string }) {
  const ip = getIP()
  const key = `${ip}:${data.email || 'unknown'}`
  const limit = await rateLimit('contact', key)
  if (!limit.allowed) {
    throw new Error('Rate limit exceeded. Please try again later.')
  }

  if (!validateString(data.name, 2, 100)) {
    throw new Error('Name must be between 2 and 100 characters.')
  }
  if (!validateString(data.email, 5, 254) || !validateEmail(data.email)) {
    throw new Error('Please provide a valid email address.')
  }
  if (!validateString(data.message, 5, 5000)) {
    throw new Error('Message must be between 5 and 5000 characters.')
  }

  const name = sanitizeString(data.name, 100)
  const email = validator.normalizeEmail(sanitizeString(data.email, 254)) || sanitizeString(data.email, 254)
  const message = sanitizeString(data.message, 5000)

  await dbConnect()
  const contact = await ContactUs.create({ name, email, message })

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    sendEmail(
      process.env.SMTP_USER,
      `New Contact Inquiry from ${name}`,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    ).catch(err => console.error('Email send failed:', err))
  }

  revalidatePath('/admin/contacts')
  return JSON.parse(JSON.stringify(contact))
}

export async function deleteContact(id: string) {
  await dbConnect()
  await ContactUs.findByIdAndDelete(id)
  revalidatePath('/admin/contacts')
}
