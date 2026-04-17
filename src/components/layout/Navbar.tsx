import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    {name: "About us", path: "/about-us" },
    { name: "Gallery", path: "/gallery" },
    { name: "Public Notice", path: "/public-notice" },
    { name: "Vacancy", path: "/vacancy" },
    
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.05)] h-16" 
        : "bg-white/80 backdrop-blur-md h-24 border-b border-gray-50 shadow-[0_2px_15px_rgba(0,0,0,0.02)]"
    }`}>
      <Container className="h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`relative w-10 h-10 rounded-xl overflow-hidden shadow-lg transition-transform duration-500 group-hover:rotate-12 ${scrolled ? 'scale-90' : 'scale-100'}`}>
              <div className="absolute inset-0 bg-gradient-fluid animate-pulse" />
              <div className="absolute inset-2 border-2 border-white/20 rounded-lg" />
            </div>
            <span className={`text-xl font-black tracking-tight transition-colors duration-500 text-navy`}>
              DIGOURJA <span className="text-primary"></span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 font-bold text-sm tracking-wide">
            {links.map((l) => (
              <Link 
                key={l.path} 
                to={l.path} 
                className={`transition-all duration-300 relative group flex items-center py-2 text-gray-600 hover:text-primary`}
              >
                {l.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-primary shadow-[0_0_10px_rgba(0,71,171,0.2)]`} />
              </Link>
            ))}
            <Button asChild className={`rounded-full px-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-primary hover:bg-navy text-white shadow-[0_4px_15px_rgba(0,71,171,0.2)]`}>
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>

          <button 
            className={`md:hidden p-2 rounded-lg transition-colors text-navy`} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-100 px-6 py-8 space-y-6 shadow-2xl relative"
          >
            {links.map((l) => (
              <Link 
                key={l.path} 
                to={l.path} 
                className="block text-gray-800 font-bold text-lg hover:text-primary transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                {l.name}
              </Link>
            ))}
            <Button asChild className="w-full bg-primary hover:bg-navy rounded-full h-12 text-base font-bold shadow-lg">
              <Link to="/contact-us" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}