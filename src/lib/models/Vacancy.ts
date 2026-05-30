import mongoose, { Schema, Document } from 'mongoose'

export interface IVacancy extends Document {
  title: string
  description: string
  deadline: Date
  createdAt: Date
}

const VacancySchema = new Schema<IVacancy>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Vacancy || mongoose.model<IVacancy>('Vacancy', VacancySchema)
