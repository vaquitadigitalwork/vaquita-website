"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Shield, Target, Compass, Award, ArrowRight, CheckCircle, 
  BookOpen, Users, Milestone, Calendar, ChevronRight, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

const values = [
  { icon: Target, title: "Result-Oriented", desc: "We prioritize solutions that contribute to business expansion, user engagement, and strong market visibility." },
  { icon: Shield, title: "Professional Trust", desc: "Reliability is the base of our client relationships. We deliver outstanding value with high confidentiality." },
  { icon: Compass, title: "Creativity First", desc: "Our designs and campaigns stand out because we refuse standard templates, preferring unique solutions." },
];

const timelineSteps = [
  { year: "2024", title: "The Inception", desc: "Vaquita started as a micro-consulting agency, helping local freelancers optimize Fiverr/Upwork profiles and launch single-page landing pages." },
  { year: "2025", title: "SaaS & Web Redesign", desc: "Expanded into custom Next.js development. Established key workflows for responsive frontends and Google Sheets database mapping." },
  { year: "2026", title: "Enterprise Scaling", desc: "Redesigned our brand to Vercel/Linear dark aesthetics. Integrated custom AI chatbots and launched targeted Facebook/Google ad structures." },
];

const culturePrinciples = [
  { title: "Direct Communication", desc: "We coordinate directly without middlemen, allowing faster iterations and zero requirements translation loss." },
  { title: "Code Ownership", desc: "We provide complete access to repository source code, so clients have absolute control over their systems." },
  { title: "Constant Iteration", desc: "We measure analytics daily, optimizing keyword parameters, design metrics, and UX paths continuously." },
];

const goals = [
  "Perfect Lighthouse performance scores (95+)",
  "Full responsive layout verification across 12+ device aspect ratios",
  "High budget-flexibility to encourage micro-branding campaigns",
  "Seamless API connections ensuring zero data capture latency",
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-secondary flex flex-col overflow-hidden">
      <Navbar />

      {/* HERO / HEADER */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="radial-glow w-[500px] h-[500px] bg-blue-600/15 top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            About Vaquita
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight"
          >
            We Help Brands Build a <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Powerhouse Presence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans"
          >
            Vaquita Digital Solutions is a forward-thinking creative agency designed to guide companies, startups, and ambitious individuals through the digital landscape.
          </motion.p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 px-6 border-t border-card-border bg-section-accent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={mounted ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-card-border flex flex-col gap-5 relative overflow-hidden group"
            >
              <div className="absolute right-[-20px] bottom-[-20px] text-blue-500/5 font-display font-extrabold text-9xl select-none group-hover:scale-105 transition-transform duration-500">
                01
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary">Our Mission</h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
                To simplify the digital landscape by providing professional, highly responsive, and commercially viable web development, brand identity, and marketing services. We enable creators and startups to establish trust and drive revenue.
              </p>
            </motion.div>

            <motion.div
              initial={mounted ? { opacity: 0, x: 30 } : { opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-card-border flex flex-col gap-5 relative overflow-hidden group"
            >
              <div className="absolute right-[-20px] bottom-[-20px] text-cyan-500/5 font-display font-extrabold text-9xl select-none group-hover:scale-105 transition-transform duration-500">
                02
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary">Our Vision</h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
                To become a premier global launcher for micro-brands and rising startups. We visualize a digital landscape where premium design aesthetics and engineered growth systems are accessible to every motivated business owner and freelancer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY WE STARTED & STORY */}
      <section className="py-24 px-6 border-t border-card-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase">The Genesis</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary leading-tight">
                Why We Started <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Vaquita Solutions</span>
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
                Vaquita was born from a simple realization: startups and independent business owners were being overcharged for cookie-cutter CMS page layouts that loaded slowly and ranked poorly. 
              </p>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
                We designed a modular agency structure that operates with direct code builds, high-speed routing, and organic search optimization.
              </p>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-6 bg-card-bg border border-card-border p-8 rounded-3xl">
              <h3 className="font-display font-bold text-xl text-text-primary">Our Strategic Goals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((g) => (
                  <div key={g} className="flex gap-3 p-4 rounded-xl bg-section-accent border border-card-border">
                    <CheckCircle className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-xs font-medium leading-relaxed font-sans">{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Timeline */}
      <section className="py-24 px-6 bg-section-accent border-y border-card-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-3">Our History</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-4">
              Growth Journey Timeline
            </h2>
          </div>
          
          <div className="relative border-l border-card-border pl-6 sm:pl-8 flex flex-col gap-12">
            {timelineSteps.map((step) => (
              <div key={step.year} className="relative group">
                {/* Bullet */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-cyan-500 dark:border-cyan-400 group-hover:scale-125 transition-transform duration-300" />
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className="font-display font-extrabold text-xl text-cyan-500 dark:text-cyan-400">{step.year}</span>
                  <h3 className="font-display font-bold text-lg text-text-primary">{step.title}</h3>
                </div>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES & WORK CULTURE */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-3">Operational Values</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-4">
              Our Core Principles & Culture
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {culturePrinciples.map((val) => (
              <div key={val.title} className="glass-card rounded-2xl p-7 flex flex-col gap-3.5 border border-card-border">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary">{val.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed font-sans">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSPACE & CLIENT COMMITMENT */}
      <section className="py-24 px-6 bg-section-accent border-t border-card-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-card-border relative group">
                <img
                  src="/company-team.webp"
                  alt="Vaquita Workspace Group"
                  className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  style={{ aspectRatio: "16/10" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase">Our Commitment</p>
              <h2 className="font-display font-extrabold text-3xl text-text-primary leading-tight">
                Solid Code. Real Relationships.
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
                Every project we release comes with our client satisfaction commitment. We operate with clean code ownership, transparent pricing metrics, and reliable post-launch maintenance pipelines.
              </p>
              <div className="flex flex-col gap-3 font-sans">
                {[
                  "100% Custom hand-coded repositories",
                  "Secure direct-contracting integrations",
                  "Dedicated ongoing support parameters",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                    <span className="text-text-secondary text-sm font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
