import mongoose, { Schema, Document } from 'mongoose'

export interface IContactUs extends Document {
  name: string
  email: string
  phone?: string
  message: string
  createdAt: Date
}

const ContactUsSchema = new Schema<IContactUs>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.ContactUs || mongoose.model<IContactUs>('ContactUs', ContactUsSchema)
