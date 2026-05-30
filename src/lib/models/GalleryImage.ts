import mongoose, { Schema, Document } from 'mongoose'

export interface IGalleryImage extends Document {
  title: string
  category: string
  imageUrl: string
  publicId: string
  createdAt: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema)
