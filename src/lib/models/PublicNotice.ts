import mongoose, { Schema, Document } from 'mongoose'

export interface IPublicNotice extends Document {
  title: string
  content: string
  fileUrl?: string
  createdAt: Date
}

const PublicNoticeSchema = new Schema<IPublicNotice>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.PublicNotice || mongoose.model<IPublicNotice>('PublicNotice', PublicNoticeSchema)
