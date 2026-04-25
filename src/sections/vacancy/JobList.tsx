import { useState, useEffect } from "react";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import JobCard from "./JobCard";

interface Vacancy {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/vacancies')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching vacancies:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-12 text-gray-500">Loading vacancies...</div>;
  
  if (jobs.length === 0) return <div className="text-center p-12 bg-white rounded-2xl border border-gray-100">No vacancies right now. Please check back later.</div>;
  
  return (
    <StaggerGrid className="space-y-4">
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          title={job.title}
          type="Full-Time" 
          location="Dolakha Site"
          date={`Deadline: ${new Date(job.deadline).toLocaleDateString()}`}
        />
      ))}
    </StaggerGrid>
  );
}