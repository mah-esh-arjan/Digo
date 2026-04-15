import { Container } from "./Container";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded-sm"></div> Digourja
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enhancing Nepal’s energy security by utilizing renewable hydro resources. Empowering the nation with sustainable, reliable, and clean electricity.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-accent transition-colors">Overview</Link></li>
              <li><Link to="/site-works-and-access" className="hover:text-accent transition-colors">Project Work</Link></li>
              <li><Link to="/public-notice" className="hover:text-accent transition-colors">Notices</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Opportunities</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-accent transition-colors">Investment</Link></li>
              <li><Link to="/vacancy" className="hover:text-accent transition-colors">Careers & Vacancy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-accent shrink-0 mt-1" /> Kalinchowk Rural Municipality, Dolakha, Nepal</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> 015924279</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> info@digourja.com.np</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Digourja Ltd. All rights reserved. Designed for Nepal.
        </div>
      </Container>
    </footer>
  );
}