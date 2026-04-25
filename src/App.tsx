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
import ProjectDetail from "./pages/ProjectDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - No main Navbar/Footer */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Public Routes - With main Navbar/Footer */}
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/project-details" element={<ProjectDetail />} />
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
          }
        />
      </Routes>
    </Router>
  );
}
export default App;