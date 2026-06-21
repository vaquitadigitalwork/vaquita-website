"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Eye, Tag, Laptop, Compass, TrendingUp, 
  X, CheckCircle, BarChart2, Star, Clock, Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

const categories = ["All", "Web Design", "Digital Marketing", "Freelancing"];

interface Project {
  title: string;
  category: string;
  image: string;
  desc: string;
  tag: string;
  icon: any;
  objective: string;
  outcome: string;
  stats: { label: string; value: string }[];
  techUsed: string[];
  beforeAfter: { before: string; after: string };
}

const projects: Project[] = [
  {
    title: "Vaquita Corporate Hub",
    category: "Web Design",
    image: "/company-team.webp",
    desc: "A stunning, dark-themed, high-performance platform engineered for digital service showcases.",
    tag: "Next.js + Tailwind",
    icon: Laptop,
    objective: "To design a premier investor-ready website that presents consulting services cleanly while securing near-perfect Lighthouse scores.",
    outcome: "Built a fully hand-coded Next.js application that successfully maps leads to Google Sheets, loads in less than 0.8s, and scales seamlessly.",
    stats: [
      { label: "Lighthouse Score", value: "99" },
      { label: "Loading Speed", value: "0.6s" }
    ],
    techUsed: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    beforeAfter: { before: "Heavy generic template with 4.5s load time", after: "Clean custom Next.js layout loading in 0.6s" }
  },
  {
    title: "Digital Marketing Campaign",
    category: "Digital Marketing",
    image: "/digitalmarketing-team.webp",
    desc: "A fully optimized audience targeting structure to maximize brand reach and lead volume.",
    tag: "Social Ads + SEO",
    icon: TrendingUp,
    objective: "Increase monthly organic leads volume for our client by targeting high-intent commercial keywords and optimizing social pipelines.",
    outcome: "Successfully launched Meta and Google advertising funnels mapped to conversion-oriented landing pages, increasing monthly leads by 180%.",
    stats: [
      { label: "Leads Growth", value: "+180%" },
      { label: "Cost Per Lead", value: "-45%" }
    ],
    techUsed: ["Google Ads", "Meta Suite", "SEMrush", "Google Analytics", "Lead Funnels"],
    beforeAfter: { before: "Generic organic posting with 2 leads / mo", after: "Automated funnel delivering 120+ verified leads / mo" }
  },
  {
    title: "Creative Branding & Portfolio UI",
    category: "Web Design",
    image: "/UI.webp",
    desc: "A minimalist, responsive visual design demonstrating services with deep interactive layouts.",
    tag: "Framer + UI/UX",
    icon: Compass,
    objective: "Develop a premium personal brand presence for a consulting specialist, utilizing glassmorphic aesthetics and mesh gradients.",
    outcome: "Delivered a custom interactive website that captures credentials cleanly, reducing contact friction and booking lead times.",
    stats: [
      { label: "Booking Speed", value: "+50%" },
      { label: "Bounce Rate", value: "-30%" }
    ],
    techUsed: ["React", "Tailwind CSS", "Framer Motion", "PostgreSQL", "CSS Gradients"],
    beforeAfter: { before: "Basic static PDF resume shared via email", after: "Highly interactive web portfolio with instant booking hooks" }
  },
  {
    title: "Freelancing Guide Hub",
    category: "Freelancing",
    image: "/freelancing-team.webp",
    desc: "A clean support interface with structural resumes, branding resources, and portfolios.",
    tag: "Support & Branding",
    icon: Tag,
    objective: "Create an organized landing system and bid kit helping beginner freelancers launch Upwork and Fiverr career columns.",
    outcome: "Built an resources hub with downloadable bid templates and profile checklists that has guided over 50+ candidates.",
    stats: [
      { label: "Success Rate", value: "92%" },
      { label: "Average Income", value: "+60%" }
    ],
    techUsed: ["Fiverr API", "Upwork bid templates", "Branding PDFs", "Next.js Pages"],
    beforeAfter: { before: "Unoptimized profile with zero contract responses", after: "Top-Rated status profile landing initial contracts in 5 days" }
  },
  {
    title: "Enterprise E-Commerce Hub",
    category: "Web Design",
    image: "/contact-team.webp",
    desc: "A responsive digital commerce checkout portal with secure payment and inventory logic.",
    tag: "Next.js + Stripe",
    icon: Laptop,
    objective: "Replace an unstable standard shop layout with a fast, custom, secure headless commerce checkout flow.",
    outcome: "Constructed a Next.js shop connected to a Flask API, reducing payment abandonment rate by 40%.",
    stats: [
      { label: "Checkout Speed", value: "+120%" },
      { label: "Cart Recovery", value: "35%" }
    ],
    techUsed: ["Next.js", "Stripe API", "Flask Python", "PostgreSQL", "Tailwind"],
    beforeAfter: { before: "Clunky shop page with 25% checkout error rates", after: "Headless checkout system with zero payment failures" }
  },
  {
    title: "Social Growth Strategy",
    category: "Digital Marketing",
    image: "/growth-team.webp",
    desc: "A targeted Instagram organic growth structure establishing client authority.",
    tag: "Branding + SEO",
    icon: TrendingUp,
    objective: "Scale client Instagram visual reach, driving followers directly into our services contact page.",
    outcome: "Organized video content structures and SEO profile optimizations, increasing impressions by over 100K in 90 days.",
    stats: [
      { label: "Impressions", value: "+100K" },
      { label: "Profile Visits", value: "+210%" }
    ],
    techUsed: ["Instagram SEO", "Content Calendars", "Video templates", "Link mapping"],
    beforeAfter: { before: "Unorganized posts reaching ~200 accounts", after: "Polished Reels reaching 100K+ high-intent targets" }
  }
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects = projects.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );

  return (
    <div className="min-h-screen bg-background text-text-secondary flex flex-col overflow-hidden">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="radial-glow w-[500px] h-[500px] bg-blue-600/10 top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            Our Gallery
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight"
          >
            Pioneering Creative <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Digital Milestones</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans"
          >
            Explore our curated selection of high-fidelity responsive websites, structured campaigns, and career branding portfolios. Click on any card for full details.
          </motion.p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="pb-10 px-6">
        <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 relative border ${
                activeTab === cat
                  ? "border-blue-500 text-text-primary bg-blue-600/10"
                  : "border-card-border text-text-secondary hover:text-text-primary hover:border-card-border/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="py-10 px-6 border-t border-card-border flex-1 bg-section-accent">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, idx) => (
                <motion.div
                  layout
                  initial={mounted ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={proj.title}
                  onClick={() => setSelectedProj(proj)}
                  className="glass-card rounded-3xl overflow-hidden group border border-card-border hover:border-blue-500/20 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden aspect-video border-b border-card-border">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-white/80 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                    {/* Floating badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur border border-card-border text-white text-[10px] font-bold uppercase tracking-wider">
                      <proj.icon className="w-3.5 h-3.5 text-cyan-400" />
                      {proj.category}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-7 flex flex-col gap-3 relative z-10 bg-card-bg/30 flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-widest block">
                        {proj.tag}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors mt-2">
                        {proj.title}
                      </h3>
                      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mt-2 font-sans">
                        {proj.desc}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider border-t border-card-border pt-4">
                      <span className="text-blue-500 dark:text-blue-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                        View Details Spec
                      </span>
                      <ArrowRight className="w-4 h-4 text-text-muted group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* PROJECT PREVIEW MODAL */}
      <AnimatePresence>
        {selectedProj && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProj(null)}
              className="fixed inset-0 bg-black/55 dark:bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-card-border shadow-2xl flex flex-col z-10 bg-background no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProj(null)}
                className="absolute right-5 top-5 z-20 w-10 h-10 rounded-xl bg-card-bg border border-card-border hover:bg-section-accent text-text-secondary hover:text-text-primary flex items-center justify-center transition-colors outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="relative aspect-video sm:max-h-[300px] w-full overflow-hidden border-b border-card-border">
                <img
                  src={selectedProj.image}
                  alt={selectedProj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    {selectedProj.category}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary mt-3">
                    {selectedProj.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 bg-background">
                {/* Left Side: Summary & Objective */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-text-primary text-base">Client Objectives</h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans">{selectedProj.objective}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-text-primary text-base">Project Outcomes</h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans">{selectedProj.outcome}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-card-bg border border-card-border flex flex-col gap-3 font-sans">
                    <p className="text-text-primary text-xs font-bold uppercase tracking-wide">Before vs. After</p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="text-red-500 dark:text-red-400/90 border-r border-card-border pr-4">
                        <span className="font-semibold block uppercase tracking-wider text-[9px] mb-1">Before</span>
                        {selectedProj.beforeAfter.before}
                      </div>
                      <div className="text-green-600 dark:text-green-400/90">
                        <span className="font-semibold block uppercase tracking-wider text-[9px] mb-1">After</span>
                        {selectedProj.beforeAfter.after}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Stats & TechStack */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Project Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProj.stats.map((s) => (
                      <div key={s.label} className="p-4 rounded-xl bg-card-bg border border-card-border text-center">
                        <p className="font-display font-extrabold text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</p>
                        <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="p-5 rounded-2xl bg-card-bg border border-card-border">
                    <h3 className="text-text-primary text-xs font-bold uppercase tracking-wider mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProj.techUsed.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-medium font-sans">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20"
                  >
                    Consult on this Solution
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER CALL */}
      <section className="py-20 px-6 border-t border-card-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-6">
            Ready to Build Your Custom Masterpiece?
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-sans">
            Our expert strategists and designers are ready to engineer high-converting web tools and brand spaces.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-[0_8px_30px_rgba(37,99,235,0.4)] group transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
