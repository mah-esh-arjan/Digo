const fs = require('fs');
const path = require('path');

const projectPath = 'C:\\himalayan-energy';

const files = {
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0047AB", // Royal Blue
          dark: "#033276",
        },
        navy: {
          DEFAULT: "#051937", // Deep Navy Secondary
        },
        accent: {
          DEFAULT: "#00E0FF", // Cyan Accent
        },
        background: "#FFFFFF",
        surface: "#F9FAFB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`,
  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
  'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})`,
  'tsconfig.app.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`,
  'src/index.css': `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans antialiased bg-white text-gray-900;
  }
}`,
  'src/utils/cn.ts': `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
  'src/main.tsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
  'src/App.tsx': `import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
export default App;`,
  'src/utils/ScrollToTop.tsx': `import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}`,
  'src/components/layout/Container.tsx': `import { cn } from "@/utils/cn";

export const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};`,
  'src/components/animations/FadeIn.tsx': `import { motion } from "framer-motion";

export const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);`,
  'src/components/animations/StaggerGrid.tsx': `import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const StaggerGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className={className}>
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={item} className={className}>
    {children}
  </motion.div>
);`,
  'src/components/ui/button.tsx': `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const variantClasses = {
      default: "bg-primary text-white hover:bg-primary-dark shadow",
      outline: "border border-gray-200 bg-white hover:bg-gray-100",
      ghost: "hover:bg-gray-100",
    }
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
          variant && variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }`,
  'src/components/ui/input.tsx': `import * as React from "react"
import { cn } from "@/utils/cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`,
  'src/components/ui/textarea.tsx': `import * as React from "react"
import { cn } from "@/utils/cn"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`,
  'src/components/layout/Navbar.tsx': `import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: "Home", path: "/" },
    { name: "Site Works", path: "/site-works-and-access" },
    { name: "Public Notice", path: "/public-notice" },
    { name: "Vacancy", path: "/vacancy" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg"></div> Himalayan Energy
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-700">
            {links.map((l) => (
              <Link key={l.path} to={l.path} className="hover:text-primary transition-colors">{l.name}</Link>
            ))}
            <Button asChild className="bg-primary hover:bg-primary-dark rounded-full px-6">
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 shadow-lg absolute w-full">
          {links.map((l) => (
            <Link key={l.path} to={l.path} className="block text-gray-700 font-medium" onClick={() => setIsOpen(false)}>{l.name}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}`,
  'src/components/layout/Footer.tsx': `import { Container } from "./Container";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded-sm"></div> Himalayan Energy
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
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> info@himalayanenergynepal.com.np</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Himalayan Energy Ltd. All rights reserved. Designed for Nepal.
        </div>
      </Container>
    </footer>
  );
}`,
  'src/pages/Home.tsx': `import HeroSection from "@/sections/home/HeroSection";
import OverviewSection from "@/sections/home/OverviewSection";
import InvestmentSection from "@/sections/home/InvestmentSection";
import WhyInvestSection from "@/sections/home/WhyInvestSection";
import AboutSection from "@/sections/home/AboutSection";
import LeadershipSection from "@/sections/home/LeadershipSection";
import TechnicalHighlights from "@/sections/home/TechnicalHighlights";
import PartnersSection from "@/sections/home/PartnersSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <InvestmentSection />
      <WhyInvestSection />
      <AboutSection />
      <LeadershipSection />
      <TechnicalHighlights />
      <PartnersSection />
    </>
  );
}`,
  'src/pages/SiteWorks.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import GallerySection from "@/sections/site-works/GallerySection";

export default function SiteWorks() {
  return (
    <div className="pt-32 pb-20 bg-surface min-h-screen">
      <Container>
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Site Works & Access</h1>
          <p className="text-gray-600 max-w-2xl text-lg mb-12">
            Explore the latest progress and on-ground activities of the Kalinchowk Hydropower Project in Dolakha.
          </p>
        </FadeIn>
        <GallerySection />
      </Container>
    </div>
  );
}`,
  'src/pages/Contact.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import ContactForm from "@/sections/contact/ContactForm";
import ContactInfo from "@/sections/contact/ContactInfo";

export default function Contact() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg">We're here to answer any questions about our projects or investment opportunities.</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}`,
  'src/pages/Vacancy.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import JobList from "@/sections/vacancy/JobList";

export default function Vacancy() {
  return (
    <div className="pt-32 pb-20 bg-surface min-h-screen">
      <Container>
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Careers & Vacancy</h1>
          <p className="text-gray-600 max-w-2xl text-lg mb-12">
            Join us in our mission to empower Nepal with clean, reliable, and sustainable energy solutions.
          </p>
        </FadeIn>
        <JobList />
      </Container>
    </div>
  );
}`,
  'src/pages/PublicNotice.tsx': `import { Container } from "@/components/layout/Container";
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
}`,
  'src/sections/home/HeroSection.tsx': `import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-surface">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent hidden md:block rounded-bl-[100px]" />
      
      <Container className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" /> Powering the Future
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-navy leading-tight mb-6">
            Sustainable <br />
            <span className="text-primary">Hydro Energy</span> <br />
            For Nepal.
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-md">
            Himalayan Energy Ltd. is developing a 3MW hydropower project on the Kalinchowk Khola. Join us in our journey toward full energy self-sufficiency.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary-dark rounded-full">
              Investment Opportunity
            </Button>
            <Button size="lg" variant="outline" className="rounded-full shadow-sm hover:bg-gray-50 flex items-center gap-2">
              Learn More <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1548126462-c1a7f05a41fd?q=80&w=1000&auto=format&fit=crop" alt="Hydro Dam" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-8">
            <div className="text-white">
              <h3 className="font-bold text-2xl">Kalinchowk Project</h3>
              <p className="text-gray-200">Dolakha, Nepal</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}`,
  'src/sections/home/OverviewSection.tsx': `import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/layout/Container";
import { Activity, Droplets, MapPin, Zap } from "lucide-react";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

const stats = [
  { icon: MapPin, label: "Location", value: "Dolakha" },
  { icon: Zap, label: "Capacity", value: "3 MW" },
  { icon: Droplets, label: "Catchment Area", value: "28.5 km²" },
  { icon: Activity, label: "Annual Energy", value: "16.96 GWh" },
];

export default function OverviewSection() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-navy mb-4">Project Overview</h2>
          <p className="text-gray-600">Committed to ethical investment and innovation, our project brings scalable clean energy to the national grid.</p>
        </FadeIn>
        
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StaggerItem key={i} className="p-6 bg-surface border border-gray-100 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-navy">{stat.value}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}`,
  'src/sections/home/InvestmentSection.tsx': `import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";

export default function InvestmentSection() {
  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1473623910398-3330623da354?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover opacity-20" />
      </div>
      <Container className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <div className="uppercase tracking-widest text-accent text-sm font-bold mb-4">Investment Opportunity</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Energize Society With Sustainable Energy!</h2>
          <p className="text-gray-300 text-lg mb-8">
            The capital required to establish scalable clean energy facilities is considerable. However, it paves the way for strong economic returns and ESG impact. Be part of Nepal's energy revolution.
          </p>
          <Button size="lg" className="bg-accent text-navy hover:bg-white hover:text-navy rounded-full font-bold px-8">
            Download Prospectus
          </Button>
        </FadeIn>
        <FadeIn delay={0.2} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl">
          <div className="space-y-6">
             <div className="border-b border-white/20 pb-4">
               <p className="text-accent text-sm font-semibold">Total Project Cost</p>
               <p className="text-4xl font-bold truncate">NPR 59.5 Cr.</p>
             </div>
             <div>
               <p className="text-accent text-sm font-semibold">Target Completion</p>
               <p className="text-4xl font-bold">15 Months</p>
             </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}`,
  'src/sections/home/WhyInvestSection.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";
import { TrendingUp, ShieldCheck, Leaf, Globe } from "lucide-react";

const reasons = [
  { icon: TrendingUp, title: "High Demand", desc: "Constant national energy deficit guarantees power purchase agreements." },
  { icon: ShieldCheck, title: "Government Backed", desc: "Policies strongly support renewable energy initiatives in Nepal." },
  { icon: Leaf, title: "Sustainability", desc: "Clean, renewable hydro energy reducing carbon footprints heavily." },
  { icon: Globe, title: "Economic Impact", desc: "Creating thousands of jobs and driving local economic development." }
];

export default function WhyInvestSection() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Invest With Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </FadeIn>

        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <StaggerItem key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{r.title}</h3>
              <p className="text-gray-600 leading-relaxed">{r.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}`,
  'src/sections/home/AboutSection.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <Container className="grid md:grid-cols-2 gap-16 items-center">
        <FadeIn className="order-2 md:order-1">
          <div className="relative">
             <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform -rotate-3 z-0" />
             <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" alt="Construction" className="relative z-10 rounded-2xl shadow-xl w-full object-cover h-[500px]" />
          </div>
        </FadeIn>
        
        <FadeIn className="order-1 md:order-2">
          <h2 className="text-4xl font-bold text-navy mb-6">About Company</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-primary flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" /> Our Mission
              </h4>
              <p className="text-gray-600">To empower Nepal with clean, reliable, and sustainable energy solutions while setting industry records for project execution.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-primary flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" /> Our Vision
              </h4>
              <p className="text-gray-600">To create job opportunities for more than 1 million people by opting to construct a minimum of 10,000 MWs of sustainable energy infrastructure globally.</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}`,
  'src/sections/home/LeadershipSection.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Quote } from "lucide-react";

export default function LeadershipSection() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy mb-4">Our Message</h2>
        </FadeIn>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <FadeIn delay={0.1} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-24 h-24 text-gray-50 opacity-50" />
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" className="w-24 h-24 rounded-full object-cover shrink-0" alt="Chairman" />
            <div className="relative z-10">
              <h4 className="font-bold text-xl text-navy">Mr. Lila Mani Pathak</h4>
              <p className="text-primary font-medium text-sm mb-4">Chairman</p>
              <p className="text-gray-600 italic text-sm leading-relaxed">
                "We are dedicated to excellence and completing the Kalinchowk Small Hydropower Project in just 15 months. This reflects our commitment to setting new industry standards and strengthening Nepal’s energy sector."
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-navy text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-24 h-24 text-white/5 opacity-50" />
            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" className="w-24 h-24 rounded-full object-cover shrink-0 ring-4 ring-white/10" alt="CEO" />
            <div className="relative z-10">
              <h4 className="font-bold text-xl">Mr. Laxmi Bhattarai</h4>
              <p className="text-accent font-medium text-sm mb-4">CEO</p>
              <p className="text-gray-300 italic text-sm leading-relaxed">
                "Our team combines expertise in hydropower and capital markets to drive economic growth and promote sustainability. Together, we are on a journey toward absolute energy self-sufficiency."
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}`,
  'src/sections/home/TechnicalHighlights.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

const data = [
  { key: "Project Capacity", value: "3.00 MW" },
  { key: "Generated Energy", value: "16.96 GWh annually" },
  { key: "PPA Status", value: "Approved & Draft Unavailable" },
  { key: "Completion Target", value: "15 Months" },
  { key: "Turbine Type", value: "Pelton" },
  { key: "Gross Head", value: "120m" }
];

export default function TechnicalHighlights() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy">Technical Highlights</h2>
        </FadeIn>
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <StaggerGrid className="divide-y divide-gray-100">
            {data.map((item, i) => (
              <StaggerItem key={i} className="flex justify-between p-6 hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-700">{item.key}</span>
                <span className="text-primary font-medium">{item.value}</span>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Container>
    </section>
  );
}`,
  'src/sections/home/PartnersSection.tsx': `import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";

export default function PartnersSection() {
  const logos = Array.from({ length: 5 }, (_, i) => \`Associate Partner \${i + 1}\`);

  return (
    <section className="py-16 bg-surface border-t border-gray-100">
      <Container>
        <FadeIn className="text-center mb-10">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Our Associates & Partners</h4>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {logos.map((logo, i) => (
             <div key={i} className="text-xl font-bold text-gray-800 tracking-tighter">
                {logo}
             </div>
           ))}
        </div>
      </Container>
    </section>
  );
}`,
  'src/sections/contact/ContactForm.tsx': `import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <FadeIn delay={0.2} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-navy mb-6">Send us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <Input required placeholder="John" className="bg-surface border-transparent focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <Input required placeholder="Doe" className="bg-surface border-transparent focus:border-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <Input type="email" required placeholder="john@example.com" className="bg-surface border-transparent" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Your Message</label>
          <Textarea required placeholder="How can we help you?" className="min-h-[150px] bg-surface border-transparent" />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary-dark h-12 text-lg rounded-xl">
          Send Message
        </Button>
      </form>
    </FadeIn>
  );
}`,
  'src/sections/contact/ContactInfo.tsx': `import { FadeIn } from "@/components/animations/FadeIn";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <FadeIn className="space-y-8">
      <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
        <MapPin className="w-8 h-8 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-navy text-lg mb-1">Corporate Office</h4>
          <p className="text-gray-600">Kalinchowk Rural Municipality, <br />Dolakha, Nepal</p>
        </div>
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
        <Phone className="w-8 h-8 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-navy text-lg mb-1">Phone Number</h4>
          <p className="text-gray-600 mb-1">Office: 015924279</p>
          <p className="text-gray-600">Direct: (+977) 9854233672</p>
        </div>
      </div>

      <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
        <Mail className="w-8 h-8 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-navy text-lg mb-1">Email Address</h4>
          <p className="text-gray-600">info@himalayanenergynepal.com.np</p>
        </div>
      </div>
    </FadeIn>
  );
}`,
  'src/sections/site-works/GallerySection.tsx': `import { StaggerGrid, StaggerItem } from "@/components/animations/StaggerGrid";

const images = [
  "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356f58?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1473623910398-3330623da354?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581094369446-ee2eb34d3b14?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1621644788107-11fd7bcf14ac?w=500&h=400&fit=crop",
];

export default function GallerySection() {
  return (
    <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((src, i) => (
        <StaggerItem key={i} className="group relative rounded-2xl overflow-hidden shadow-sm bg-white aspect-[4/3] cursor-pointer">
          <img src={src} alt="Site Work" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span className="text-white font-bold tracking-widest text-sm uppercase">Phase {i+1} Progress</span>
          </div>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}`,
  'src/sections/vacancy/JobList.tsx': `import { StaggerGrid } from "@/components/animations/StaggerGrid";
import JobCard from "./JobCard";

const jobs = [
  { id: 1, title: "Civil Engineer", type: "Full-Time", location: "Dolakha Site", date: "Posted 2 days ago" },
  { id: 2, title: "Project Manager", type: "Contract", location: "Kathmandu HQ", date: "Posted 1 week ago" },
  { id: 3, title: "Electrical Technician", type: "Full-Time", location: "Dolakha Site", date: "Posted 2 weeks ago" },
];

export default function JobList() {
  if (jobs.length === 0) return <div className="text-center p-12 bg-white rounded-2xl border border-gray-100">No vacancies right now. Please check back later.</div>;
  
  return (
    <StaggerGrid className="space-y-4">
      {jobs.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </StaggerGrid>
  );
}`,
  'src/sections/vacancy/JobCard.tsx': `import { StaggerItem } from "@/components/animations/StaggerGrid";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";

interface JobProps {
  title: string;
  type: string;
  location: string;
  date: string;
}

export default function JobCard({ title, type, location, date }: JobProps) {
  return (
    <StaggerItem className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" /> {type}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {location}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {date}</span>
        </div>
      </div>
      <Button className="bg-navy hover:bg-primary rounded-xl px-8 h-12 w-full md:w-auto">Apply Now</Button>
    </StaggerItem>
  );
}`,
  'src/sections/public-notice/NoticeList.tsx': `import { StaggerGrid } from "@/components/animations/StaggerGrid";
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
}`,
  'src/sections/public-notice/NoticeItem.tsx': `import { StaggerItem } from "@/components/animations/StaggerGrid";
import { Calendar, Download } from "lucide-react";

export default function NoticeItem({ title, date, desc }: { title: string, date: string, desc: string }) {
  return (
    <StaggerItem className="bg-surface border border-gray-100 p-8 rounded-2xl group hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
        <Calendar className="w-4 h-4" /> {date}
      </div>
      <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">{title}</h3>
      <p className="text-gray-600 mb-6">{desc}</p>
      <button className="text-primary font-bold text-sm flex items-center gap-2 group-hover:text-primary-dark transition-colors">
         Download PDF <Download className="w-4 h-4" />
      </button>
    </StaggerItem>
  );
}`
};

Object.keys(files).forEach(file => {
  const fullPath = path.join(projectPath, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, files[file]);
});

console.log('Files created successfully!');
