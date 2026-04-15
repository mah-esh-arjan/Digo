import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import NoticeList from "@/sections/public-notice/NoticeList";

export default function PublicNotice() {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <Container>
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Public Notices</h1>
          <p className="text-gray-600 text-lg mb-12">Official announcements, press releases, and updates regarding our operations.</p>
        </FadeIn>
        <NoticeList />
      </Container>
    </div>
  );
}