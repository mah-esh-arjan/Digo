'use server'
import dbConnect from '@/lib/mongodb'
import GalleryImage from '@/lib/models/GalleryImage'
import { revalidatePath } from 'next/cache'

export async function getGalleryImages() {
  await dbConnect()
  return JSON.parse(JSON.stringify(await GalleryImage.find({}).sort({ createdAt: -1 }).lean()))
}

export async function deleteGalleryImage(id: string) {
  await dbConnect()
  const image = await GalleryImage.findById(id)
  if (image?.publicId) {
    const { v2: cloudinary } = await import('cloudinary')
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    await cloudinary.uploader.destroy(image.publicId)
  }
  await GalleryImage.findByIdAndDelete(id)
  revalidatePath('/admin/gallery')
}
