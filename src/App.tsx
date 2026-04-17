import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import SiteWorks from "@/pages/SiteWorks";
import Contact from "@/pages/Contact";
import Vacancy from "@/pages/Vacancy";
import PublicNotice from "@/pages/PublicNotice";
import ScrollToTop from "@/utils/ScrollToTop";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Downloads from "./pages/Downloads";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />}/>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/site-works-and-access" element={<SiteWorks />} />
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