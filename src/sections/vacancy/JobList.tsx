import { StaggerGrid } from "@/components/animations/StaggerGrid";
import JobCard from "./JobCard";

const jobs = [
  { id: 1, title: "Civil Engineer", type: "Full-Time", location: "Dolakha Site", date: "Posted 2 days ago" },
  { id: 2, title: "Project Manager", type: "Contract", location: "Kathmandu HQ", date: "Posted 1 week ago" },
  { id: 3, title: "Electrical Technician", type: "Full-Time", location: "Dolakha Site", date: "Posted 2 weeks ago" },
];

export default function JobList() {
  if (jobs.length === 0) return <div className="text-center p-12 bg-white rounded-2xl border border-gray-100">No vacancies right now. Please check back later.</div>;
  
  return (
    <StaggerGrid className="space-y-4">
      {jobs.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </StaggerGrid>
  );
}