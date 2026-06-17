"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, Globe, TrendingUp, Briefcase, Lightbulb, Zap, Wallet, 
  BarChart2, Shield, Cpu, Sparkles, Code, Award
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

// Animation utility
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  { 
    icon: Globe, 
    title: "Web Design & Development", 
    desc: "Professional websites, web applications, and custom business platforms engineered for performance and growth.", 
    image: "/web-design.svg",
    colSpan: "col-span-1 lg:col-span-2",
  },
  { 
    icon: TrendingUp, 
    title: "Digital Marketing", 
    desc: "Comprehensive marketing services including SEO, Meta Ads, and content strategies.", 
    image: "/digitalmarketing.svg",
    colSpan: "col-span-1",
  },
  { 
    icon: Briefcase, 
    title: "Professional Portfolio", 
    desc: "Premium portfolio development and brand optimization for creators.", 
    image: "/freelancing.svg",
    colSpan: "col-span-1 lg:col-span-3",
  },
];

const stats = [
  { value: "50+", label: "Creative Projects" },
  { value: "20+", label: "Solutions Delivered" },
  { value: "3+", label: "Service Categories" },
  { value: "100%", label: "Quality Focus" },
];

const keyFeatures = [
  { icon: Shield, title: "Secure Frameworks", desc: "Built with industry-grade security protocols, clean structures, and solid data handling." },
  { icon: Cpu, title: "AI Integration Support", desc: "Integrate custom chatbot assistants and automation directly into your system workflow." },
  { icon: Code, title: "Performance Optimized", desc: "Achieve near-perfect Google Lighthouse scores and rapid mobile loading performance." },
  { icon: Sparkles, title: "Micro Interactions", desc: "Elevate your brand image with custom fluid transitions and beautiful hover states." },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-blue-500/30 selection:text-white">
      <Navbar />

      {/* PREMIUM HERO */}
      <section className="relative pt-32 pb-24 px-6 sm:px-12 flex flex-col items-center text-center overflow-hidden min-h-[90vh] justify-center">
        <div className="ambient-glow top-0 left-1/2 -translate-x-1/2 opacity-60" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md text-zinc-300 text-[11px] font-medium tracking-widest uppercase mb-8">
            <Sparkles className="w-3 h-3 text-blue-500" />
            Empowering Modern Brands
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-display font-medium tracking-tight text-white leading-[1.1] mb-8">
            Redefining Your Digital <br className="hidden sm:block" />
            <span className="text-zinc-500">Presence with Vaquita</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-10">
            We architect and build premium Next.js platforms, launch results-oriented marketing campaigns, and guide creators into high-earning careers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/services" className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-zinc-800 bg-transparent text-white font-medium text-sm hover:bg-zinc-900 hover:border-zinc-700 transition-all flex items-center justify-center">
              Start Your Project
            </Link>
          </div>
        </motion.div>

        <AnimatedSection delay={0.3} className="relative z-10 w-full max-w-6xl mx-auto mt-20">
           <div className="relative rounded-2xl sm:rounded-[2rem] border border-zinc-800/50 bg-zinc-950 p-2 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
            <img
              src="/web-design.svg"
              alt="Vaquita Platform"
              className="rounded-xl sm:rounded-[1.5rem] border border-zinc-900 object-cover w-full aspect-video opacity-100 transition-all duration-700 group-hover:scale-[1.01]"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-zinc-900 bg-[#020202] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-zinc-900">
            {stats.map((s, i) => (
              <AnimatedSection key={s.value} delay={i * 0.1} className={`text-center ${i % 2 !== 0 ? 'pl-8 lg:pl-0 lg:border-none' : 'lg:border-none'}`}>
                <p className="text-3xl sm:text-4xl font-display font-medium text-white mb-1 tracking-tight">{s.value}</p>
                <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO BOX SERVICES (FIXES DARK IMAGES) */}
      <section className="py-32 px-6 sm:px-12 bg-black relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">Core Expertise</h2>
              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-light">
                Delivering highly technical, beautifully designed digital products to elevate your market positioning.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <AnimatedSection 
                key={svc.title} 
                delay={idx * 0.1}
                className={`group relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#050505] hover:bg-[#0A0A0A] transition-colors duration-500 ${svc.colSpan} flex flex-col`}
              >
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center relative z-20">
                  <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900/50 flex items-center justify-center mb-6 text-zinc-300">
                    <svc.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white mb-3 tracking-tight">{svc.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-light text-sm sm:text-base max-w-lg">{svc.desc}</p>
                </div>
                
                {/* Image Container - Inverted SVGs for Dark Mode visibility */}
                <div className="relative h-64 sm:h-80 w-full mt-auto bg-zinc-950 border-t border-zinc-900 flex items-center justify-center p-8 overflow-hidden z-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                  <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
 />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP / WHY US */}
      <section className="py-32 px-6 sm:px-12 border-t border-zinc-900 bg-[#020202]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <AnimatedSection>
                <p className="text-[11px] font-bold text-zinc-500 tracking-widest uppercase mb-4">The Vaquita Standard</p>
                <h2 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight mb-8 leading-tight">
                  Engineering the <br className="hidden sm:block" />
                  <span className="text-zinc-500">Uncompromised.</span>
                </h2>
                <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12">
                  We reject mass-produced templates and bloatware. Every line of code, every motion curve, and every pixel is meticulously crafted to ensure maximum conversion and enterprise-grade performance.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {keyFeatures.map((feat, i) => (
                  <AnimatedSection key={feat.title} delay={i * 0.1}>
                    <feat.icon className="w-5 h-5 text-white mb-4" />
                    <h4 className="text-white font-medium mb-2">{feat.title}</h4>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">{feat.desc}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection delay={0.2} className="relative h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden border border-zinc-800 group bg-zinc-950 p-8 flex items-end">
              <img
              src="/company.svg"
              alt="Vaquita Workspace"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="relative z-10 w-full">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-2xl">
                  <div>
                    <p className="text-white font-medium">World-Class Infrastructure</p>
                    <p className="text-zinc-400 text-sm mt-1">Built natively on Vercel & Next.js</p>
                  </div>
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 sm:px-12 bg-black relative overflow-hidden border-t border-zinc-900">
        <div className="ambient-glow bottom-0 right-0 opacity-80" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-5xl sm:text-6xl font-display font-medium text-white tracking-tight mb-6">
              Ready to scale?
            </h2>
            <p className="text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto">
              Join the ambitious brands who trust Vaquita to deliver exceptional digital experiences.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-black font-medium text-base hover:bg-zinc-200 transition-colors group">
              Start a Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
