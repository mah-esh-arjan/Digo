import { useState, useEffect } from "react";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import NoticeItem from "./NoticeItem";

interface Notice {
  id: number;
  title: string;
  content: string;
  fileUrl?: string;
  createdAt: string;
}

export default function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/notices')
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching notices:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-12 text-gray-500">Loading notices...</div>;

  if (notices.length === 0) return <div className="text-center p-12 text-gray-500">No public notices at this time.</div>;

  return (
    <StaggerGrid className="grid gap-6 md:grid-cols-2">
      {notices.map(n => (
        <NoticeItem 
          key={n.id} 
          title={n.title}
          date={new Date(n.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          desc={n.content}
          fileUrl={n.fileUrl}
        />
      ))}
    </StaggerGrid>
  );
}