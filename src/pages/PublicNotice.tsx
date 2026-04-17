import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import NoticeList from "@/sections/public-notice/NoticeList";

export default function PublicNotice() {
  return (
    <div className="bg-white pb-24">
      <PageHeader 
        title="Public Notices" 
        backgroundImage="https://images.unsplash.com/photo-1542614391-4475560b37ea?q=80&w=1920&auto=format&fit=crop"
      />
      <Container className="mt-20">
        <NoticeList />
      </Container>
    </div>
  );
}