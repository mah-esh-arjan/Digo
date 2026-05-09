import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger } from "@/components/animations/FadeIn";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, TrendingUp, ShieldCheck, Zap, Coins, ArrowRight, BarChart3, Clock } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const milestones = [
  { year: "DONE", event: "Project Survey & License Secured", status: "completed" },
  { year: "DONE", event: "Financial Closure & Site Access", status: "completed" },
  { year: "DONE", event: "Construction & Dam Erection", status: "completed" },
  // { year: "IN PROGRESS", event: "Commissioning & Generation", status: "upcoming" }
  { year: "IN PROGRESS", event: "Commissioning & Generation", status: "in-progress" }
];

const stats = [
  { label: "Total Cost", value: "1.5 Cr", suffix: "NPR", icon: Coins, color: "text-accent" },
  { label: "Capacity", value: "7.926", suffix: "MW", icon: Zap, color: "text-yellow-400" },
  { label: "Payback Period", value: "2.5", suffix: "Years", icon: BarChart3, color: "text-green-400" },
  { label: "Completion", value: "2.5", suffix: "Years", icon: Clock, color: "text-blue-400" }
];

export default function InvestmentSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="py-32 bg-navy text-white relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary rounded-full blur-[150px] animate-blob" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-accent rounded-full blur-[150px] animate-blob animation-delay-2000" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="uppercase tracking-widest text-accent text-[10px] font-black">Investment Portal</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-none">
              Invest in <br />
              <span className="text-gradient">Green Wealth</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light mb-10 max-w-xl leading-relaxed">
              Digo Urja Bikas offers a unique entry point into Nepal's surging energy market. With secured power purchase agreements and state-backed guarantees, we turn natural flow into sustainable financial growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-white text-navy hover:bg-accent hover:text-navy rounded-full font-bold px-8 h-14 transition-all">
                <Link to="/invest-now">Invest Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 glass-dark text-white rounded-full font-bold px-8 h-14 hover:bg-white/5">
                <Download className="mr-2 w-5 h-5" /> Prospectus
              </Button>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Dashboard Card */}
            <FadeIn delay={0.2} className="glass-dark p-1 rounded-3xl shadow-2xl relative z-10">
              <div className="bg-navy/40 backdrop-blur-3xl p-8 md:p-10 rounded-[1.4rem]">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-accent w-6 h-6" /> Key Financials
                  </h3>
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest bg-white/5 px-3 py-1 rounded-full">Project ID: DG-2024-X</div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-accent/30 transition-all duration-300"
                    >
                      <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                      <div className="text-3xl font-black mb-1 flex items-baseline gap-1">
                        {stat.value}
                        <span className="text-xs text-gray-500 uppercase">{stat.suffix}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] text-accent uppercase font-black tracking-widest mb-1">Return on Equity</div>
                      <div className="text-4xl font-black">17.5%</div>
                    </div>
                    <div className="w-24 h-12 flex items-end gap-1">
                      {[1,2,3,4,5,6].map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(i+1)*15}%` }}
                          className="w-full bg-accent/40 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            {/* Decorative Parallax Elements */}
            <motion.div style={{ y: y1 }} className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 blur-3xl -z-10 rounded-full" />
            <motion.div style={{ y: y2 }} className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/20 blur-3xl -z-10 rounded-full" />
          </div>
        </div>

        {/* Milestones Flow */}
        <div className="border-t border-white/5 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">Project Evolution</h3>
              <p className="text-gray-500 font-light">Tracking our journey from blueprint to power generation.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent" /> <span className="text-[10px] uppercase font-bold text-gray-400">Done</span></div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent/50 border border-accent animate-pulse" /> <span className="text-[10px] uppercase font-bold text-gray-400">In Progress</span></div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-accent" /> <span className="text-[10px] uppercase font-bold text-gray-400">Upcoming</span></div>
            </div>
          </div>

          <FadeInStagger className="grid md:grid-cols-4 gap-8">
            {milestones.map((m, i) => (
              <div key={i} className="relative group">
                {/* Connector Line */}
                {i < milestones.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-accent/50 to-transparent z-0" />
                )}
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-all duration-500 ${
                    m.status === 'completed' ? 'bg-accent border-accent text-navy' : 
                    m.status === 'in-progress' ? 'bg-accent/20 border-accent/50 text-accent animate-pulse' : 
                    'bg-white/5 border-white/10 text-gray-500 group-hover:border-accent/40'
                  }`}>
                    {m.status === 'completed' ? <ShieldCheck className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                  </div>
                  <div className="text-accent font-black text-sm mb-2">{m.year}</div>
                  <h4 className="text-xl font-bold text-white group-hover:text-accent transition-colors mb-2">{m.event}</h4>
                  <div className="h-1 w-8 bg-white/10 group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </Container>
    </section>
  );
}