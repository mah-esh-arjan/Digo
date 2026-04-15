import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import SiteWorks from "@/pages/SiteWorks";
import Contact from "@/pages/Contact";
import Vacancy from "@/pages/Vacancy";
import PublicNotice from "@/pages/PublicNotice";
import ScrollToTop from "@/utils/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/site-works-and-access" element={<SiteWorks />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/vacancy" element={<Vacancy />} />
            <Route path="/public-notice" element={<PublicNotice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;