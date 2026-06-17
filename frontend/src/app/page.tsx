"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, Globe, TrendingUp, Briefcase, Lightbulb, Zap, Wallet, 
  BarChart2, CheckCircle, Shield, Award, Cpu, Sparkles, Code, Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const stats = [
  { value: "50+", label: "Creative Projects" },
  { value: "20+", label: "Solutions Delivered" },
  { value: "3+", label: "Service Categories" },
  { value: "100%", label: "Quality Focus" },
];

const services = [
  { 
    icon: Globe, 
    title: "Web Design & Development Solutions", 
    desc: "Professional websites, web applications, e-commerce platforms, and custom business solutions designed for speed, performance, and growth.", 
    image: "/web-design.svg" 
  },
  { 
    icon: TrendingUp, 
    title: "Digital Marketing & Brand Growth", 
    desc: "Comprehensive digital marketing services including SEO, social media marketing, Google Ads, Meta Ads, content strategy, and lead generation.", 
    image: "/digitalmarketing.svg" 
  },
  { 
    icon: Briefcase, 
    title: "Freelancing & Professional Portfolio Services", 
    desc: "Professional portfolio development, resume optimization, freelancing guidance, client acquisition strategies, and personal branding solutions.", 
    image: "/freelancing.svg" 
  },
];

const whyUs = [
  { icon: Lightbulb, title: "Creative Ideas", desc: "We refuse standard templates, preferring unique and custom-tailored designs for every single brand." },
  { icon: Zap, title: "Fast Support", desc: "We ensure quick, dedicated communication channels and transparent project updates on every milestone." },
  { icon: Wallet, title: "Affordable Pricing", desc: "Our services are budget-friendly and highly modular, perfect for startups and scaling creators." },
  { icon: BarChart2, title: "Growth Focus", desc: "Every line of code and layout is optimized to drive organic ranking, visitor trust, and measurable growth." },
];

const keyFeatures = [
  { icon: Shield, title: "Secure Frameworks", desc: "Built with industry-grade security protocols, clean structures, and solid data handling." },
  { icon: Cpu, title: "AI Integration Support", desc: "Integrate custom chatbot assistants and automation directly into your system workflow." },
  { icon: Code, title: "Performance Optimized", desc: "Achieve near-perfect Google Lighthouse scores and rapid mobile loading performance." },
  { icon: Sparkles, title: "Micro Interactions", desc: "Elevate your brand image with custom fluid transitions and beautiful hover states." },
];

const process = [
  { num: "01", title: "Understand", desc: "We analyze your target audience, business goals, and competitors before designing." },
  { num: "02", title: "Strategy & Plan", desc: "We draft structured user journeys, visual wireframes, and database maps for review." },
  { num: "03", title: "Development & Creation", desc: "Our engineers hand-code your platform using Next.js, Tailwind, and custom backend systems." },
  { num: "04", title: "Launch & Support", desc: "We configure secure hosting, monitor initial analytics, and provide continuous updates." },
];

const technologies = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Python", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Google Cloud", category: "Hosting" },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div 
      ref={ref} 
      initial={mounted ? "hidden" : "show"} 
      animate={!mounted || inView ? "show" : "hidden"} 
      variants={stagger} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-secondary flex flex-col overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Glowing blobs */}
        <div className="radial-glow w-[600px] h-[600px] bg-blue-600/25 top-[-100px] left-1/2 -translate-x-1/2" style={{ animationName: "pulse-glow", animationDuration: "6s", animationIterationCount: "infinite" }} />
        <div className="radial-glow w-[400px] h-[400px] bg-indigo-600/15 bottom-0 left-0" />
        <div className="radial-glow w-[300px] h-[300px] bg-cyan-600/10 bottom-10 right-0" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          {/* Hero Logo with floating & pulse effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-card-bg border border-card-border flex items-center justify-center p-2 shadow-[0_0_50px_rgba(37,99,235,0.15)] hover:scale-105 hover:border-brand-blue/30 duration-500 cursor-pointer animate-float-logo">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 via-transparent to-brand-cyan/20 animate-pulse" />
              <img
                src="/logo.svg"
                alt="VAQUITA Logo"
                className="w-16 h-16 object-contain relative z-10 animate-pulse"
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 dark:text-blue-300 text-xs font-semibold tracking-wider uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Empowering Brands. Engineering Scale.
          </motion.div>

          {/* Heading */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-6">
            <span className="text-text-primary">Redefining Your Digital</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Presence with Vaquita</span>
          </h1>

          {/* Subtitle */}
          <p className="text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
            We architect and build premium Next.js platforms, launch results-oriented marketing campaigns, and guide developers into high-earning freelancing careers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.6)] transition-all duration-300 group"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-secondary-theme text-text-primary font-semibold text-sm tracking-wide transition-all duration-300"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>

        {/* Hero Image Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto mt-16 px-4"
        >
          <div className="relative rounded-3xl border border-card-border bg-card-bg p-2 backdrop-blur shadow-[0_0_50px_rgba(37,99,235,0.25)] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 rounded-2xl pointer-events-none" />
            <img
              src="/web-design.svg"
              alt="Vaquita Platform Mockup"
              width={1024}
              height={576}
              className="rounded-2xl border border-card-border shadow-2xl object-cover w-full h-auto aspect-video hover:scale-[1.01] transition-transform duration-700"
            />
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 border-y border-card-border bg-section-accent">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((s) => (
                <motion.div
                  key={s.value}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-7 text-center border border-card-border"
                >
                  <p className="font-display font-extrabold text-4xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{s.value}</p>
                  <p className="text-text-secondary text-sm font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* COMPANY STORY & VISION */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp} className="relative">
                <div className="rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-card-border relative group">
                  <img
                    src="/company.svg"
                    alt="Vaquita Team Workspace"
                    width={640}
                    height={440}
                    className="w-full object-cover hover:scale-105 transition-transform duration-700"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-4 shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
                  <p className="text-white font-display font-extrabold text-xl">2026</p>
                  <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-widest">Est.</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col gap-6">
                <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase">Who We Are</p>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary leading-tight">
                  Driving Creative and <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Growth-Focused Solutions.</span>
                </h2>
                <p className="text-text-secondary leading-relaxed font-sans">
                  Vaquita was founded to bridge the gap between high-end custom software architecture and standard budget templates. We believe in providing access to premier coding frameworks, responsive design, and highly targeted marketing channels.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                  <div className="p-5 rounded-2xl bg-card-bg border border-card-border">
                    <p className="text-text-primary font-display font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Our Mission
                    </p>
                    <p className="text-text-secondary text-xs mt-2 leading-relaxed font-sans">
                      Simplifying the digital experience through hand-coded frameworks, direct messaging portals, and transparent pricing strategies.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-card-bg border border-card-border">
                    <p className="text-text-primary font-display font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      Our Vision
                    </p>
                    <p className="text-text-secondary text-xs mt-2 leading-relaxed font-sans">
                      To empower micro-brands and rising startups with tech capability that drives authority, ranking, and measurable growth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="py-24 px-6 bg-section-accent border-y border-card-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.p variants={fadeUp} className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase text-center mb-3">Our Expertise</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-extrabold text-3xl sm:text-4xl text-center text-text-primary mb-4">
              Core Services We Offer
            </motion.h2>
            <motion.p variants={fadeUp} className="text-center text-text-secondary mb-14 max-w-xl mx-auto text-sm sm:text-base">
              Providing technical and promotional support to expand your online operations.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((svc) => (
                <motion.div 
                  key={svc.title} 
                  variants={fadeUp} 
                  className="glass-card rounded-3xl p-0 overflow-hidden flex flex-col justify-between group hover:border-blue-500/20 duration-300"
                >
                  <div className="relative overflow-hidden aspect-video border-b border-card-border">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-7 flex flex-col gap-4 flex-1 justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-4">
                        <svc.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-text-primary">{svc.title}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed mt-2 font-sans">{svc.desc}</p>
                    </div>
                    <div className="mt-4">
                      <Link 
                        href="/services" 
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 dark:text-blue-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors uppercase tracking-wider group/link"
                      >
                        Explore Service
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY CHOOSE VAQUITA & KEY FEATURES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-3">Vaquita Edge</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-4">
                Why Choose Vaquita Solutions
              </h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
                We craft performant custom code systems and design models specifically matching your niche.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* Left Column: Why Us Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyUs.map((item) => (
                  <motion.div key={item.title} variants={fadeUp} className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-card-border">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-text-primary text-base">{item.title}</h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Right Column: Key Technical Parameters */}
              <div className="glass-card rounded-3xl p-8 sm:p-10 border border-card-border bg-section-accent flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-cyan-500 dark:text-cyan-400 tracking-wider uppercase mb-2">Technical Excellence</p>
                  <h3 className="font-display font-bold text-2xl text-text-primary mb-6">Built for Modern SaaS Scaling</h3>
                  <div className="flex flex-col gap-6">
                    {keyFeatures.map((feat) => (
                      <div key={feat.title} className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-lg bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shrink-0">
                          <feat.icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-text-primary text-sm font-semibold">{feat.title}</p>
                          <p className="text-text-muted text-xs mt-1 leading-relaxed font-sans">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-card-border my-8" />
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-text-secondary text-xs font-medium font-sans">Complimentary Hosting and domain support configured for every launch.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROCESS WORKFLOW */}
      <section className="py-24 px-6 bg-section-accent border-y border-card-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-3">Our Workflow</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-4">
                How We Bring Projects to Life
              </h2>
              <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
                Our structured process ensures accuracy, efficiency, and zero missed dependencies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, idx) => (
                <motion.div key={step.num} variants={fadeUp} className="glass-card rounded-2xl p-7 text-center flex flex-col items-center gap-4 border border-card-border">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-display font-extrabold text-white text-lg shadow-[0_8px_20px_rgba(37,99,235,0.3)]">
                    {step.num}
                  </div>
                  <h3 className="font-display font-bold text-text-primary text-lg">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-sans">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TECHNOLOGIES WE USE */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase text-center mb-3">Tech Stack</p>
            <h2 className="font-display font-extrabold text-3xl text-center text-text-primary mb-12">
              Our Core Technologies
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {technologies.map((tech) => (
                <div 
                  key={tech.name} 
                  className="px-5 py-3.5 rounded-2xl bg-card-bg border border-card-border hover:border-blue-500/25 hover:bg-section-accent/50 transition-all duration-300 flex items-center gap-2.5 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 duration-300" />
                  <div>
                    <span className="text-text-primary text-sm font-semibold block">{tech.name}</span>
                    <span className="text-text-muted text-[10px] uppercase font-bold block mt-0.5">{tech.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="glass-card rounded-3xl p-10 sm:p-14 text-center border border-blue-500/15 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-6 shadow-[0_8px_25px_rgba(37,99,235,0.4)]">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-4">
                Ready to Accelerate Your Journey?
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-lg mx-auto font-sans">
                Partner with Vaquita to build a strong digital presence through creative design, smart strategies, and reliable digital solutions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all duration-300 group"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-secondary-theme text-text-primary font-semibold text-sm transition-all duration-300"
                >
                  See Our Portfolio
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
