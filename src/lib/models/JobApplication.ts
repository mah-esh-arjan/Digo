import mongoose, { Schema, Document } from 'mongoose'

export interface IJobApplication extends Document {
  vacancyId: string
  name: string
  email: string
  phone?: string
  message?: string
  cvUrl: string
  createdAt: Date
}

const JobApplicationSchema = new Schema<IJobApplication>({
  vacancyId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  cvUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema)
