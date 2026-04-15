import { StaggerGrid } from "@/components/animations/StaggerGrid";
import NoticeItem from "./NoticeItem";

const notices = [
  { id: 1, title: "Annual General Meeting (AGM) Notice", date: "October 15, 2025", desc: "Notification regarding the upcoming AGM for shareholders..." },
  { id: 2, title: "Environmental Clearance Acquisition", date: "September 02, 2025", desc: "Official clearance acquired for Kalinchowk Hydropower project..." },
];

export default function NoticeList() {
  return (
    <StaggerGrid className="grid gap-6 md:grid-cols-2">
      {notices.map(n => (
        <NoticeItem key={n.id} {...n} />
      ))}
    </StaggerGrid>
  );
}