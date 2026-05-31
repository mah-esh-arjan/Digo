'use client'
import { useState, useEffect } from 'react'
import { StaggerGrid } from '@/components/animations/StaggerGrid'
import JobCard from './JobCard'

interface Vacancy { _id: string; title: string; description: string; deadline: string }

export default function JobList() {
  const [jobs, setJobs] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/vacancies', { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } })
      .then(res => res.json())
      .then(data => { setJobs(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center p-12 text-gray-500">Loading vacancies...</div>
  if (jobs.length === 0) return (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
      <h3 className="text-xl font-bold text-navy mb-2">No Vacancies Available</h3>
      <p className="text-gray-500">There are no open positions at the moment. Please check back later.</p>
    </div>
  )
  return (
    <StaggerGrid className="space-y-4">
      {jobs.map(job => (
        <JobCard key={job._id} id={job._id} title={job.title}
          type="Full-Time" location="Dolakha Site"
          date={`Deadline: ${new Date(job.deadline).toLocaleDateString()}`} />
      ))}
    </StaggerGrid>
  )
}
