import { StaggerItem } from "@/components/animations/StaggerGrid";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";

interface JobProps {
  title: string;
  type: string;
  location: string;
  date: string;
}

export default function JobCard({ title, type, location, date }: JobProps) {
  return (
    <StaggerItem className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" /> {type}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {location}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {date}</span>
        </div>
      </div>
      <Button className="bg-navy hover:bg-primary rounded-xl px-8 h-12 w-full md:w-auto">Apply Now</Button>
    </StaggerItem>
  );
}