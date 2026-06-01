import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import NoticeList from '@/sections/public-notice/NoticeList'

export default function PublicNotice() {
  return (
    <>
      <Navbar />
      <main className="bg-white pb-24 flex-1">
        <PageHeader title="Public Notices" />
        <Container className="mt-20"><NoticeList /></Container>
      </main>
      <Footer />
    </>
  )
}
