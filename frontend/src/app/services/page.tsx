"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, Globe, Briefcase, ChevronRight, CheckCircle2, 
  ArrowRight, X, Laptop, AlertCircle, RefreshCw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";
import WhatsAppButton from "@/components/WhatsAppButton";

interface ServiceItem {
  id: string;
  icon: any;
  title: string;
  color: string;
  glow: string;
  image: string;
  desc: string;
  timeline: string;
  price: string;
  tech: string[];
  benefits: string[];
  features: { name: string; desc: string }[];
}

const serviceDetails: ServiceItem[] = [
  {
    id: "web-dev",
    icon: Globe,
    title: "Web Design & Development Solutions",
    color: "from-blue-600 to-indigo-600",
    glow: "bg-blue-500/10",
    image: "/web-development-team.webp",
    desc: "Professional websites, web applications, e-commerce platforms, and custom business solutions designed for speed, performance, and growth.",
    timeline: "1 - 3 Weeks",
    price: "From ₹9,999",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flask", "PostgreSQL"],
    benefits: ["Extreme loading speeds", "Clean modern layouts", "Solid SEO structural outline"],
    features: [
      { name: "Custom Web Development", desc: "Hand-coded, custom Next.js applications tailored exactly to your business logic, avoiding generic heavy page templates." },
      { name: "SaaS Platforms & Dashboards", desc: "Build feature-rich SaaS interfaces with modern auth logic, interactive tables, charts, and robust API configurations." },
      { name: "E-commerce Solutions", desc: "Secure shopping cart structures, custom product galleries, smooth checkouts, and local payment gateway systems." },
      { name: "API & DB Integrations", desc: "Connect lead capture systems directly with databases, email alerts, or Google Sheets templates in real time." },
      { name: "Lighthouse Performance Tuning", desc: "Ensure near-perfect mobile performance scores, compressed assets delivery, and rapid DOM interaction parameters." },
      { name: "Ongoing Maintenance Support", desc: "Dedicated package iterations, layout improvements, script patches, and domain management support." }
    ]
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Digital Marketing & Brand Growth",
    color: "from-cyan-600 to-blue-600",
    glow: "bg-cyan-500/10",
    image: "/digitalmarketing-team.webp",
    desc: "Comprehensive digital marketing services including SEO, social media marketing, Google Ads, Meta Ads, content strategy, and lead generation.",
    timeline: "Continuous (Monthly)",
    price: "From ₹4,999 / mo",
    tech: ["Google Ads", "Meta Business Suite", "SEMrush", "Google Analytics", "Instagram Campaigns"],
    benefits: ["Targeted high-converting traffic", "Strong search ranking improvement", "Structured audience analytics"],
    features: [
      { name: "SEO Auditing & Optimization", desc: "Comprehensive on-page, technical, and off-page search engine optimization campaigns targeting high-intent keywords." },
      { name: "Social Media Campaigns", desc: "Curate professional, highly-engaging posts and content calendars targeting Instagram, Facebook, and LinkedIn audiences." },
      { name: "Google & Facebook Ads", desc: "Setup conversion-oriented advertising funnels, pixel tracking setup, detailed demographic bidding, and monthly ad analytics reports." },
      { name: "High-Volume Lead Generation", desc: "Build target-oriented landing pages and capture funnels optimized to deliver emails and phone leads directly to your sheet." },
      { name: "Email Marketing Funnels", desc: "Configure automated onboarding emails, sales newsletters, and trigger campaigns to maximize user retention." },
      { name: "Analytics & Conversion Optimization", desc: "Study visitor paths, map session click maps, and iterate page structures to constantly improve lead conversion percentages." }
    ]
  },
  {
    id: "freelance",
    icon: Briefcase,
    title: "Freelancing & Professional Portfolio Services",
    color: "from-indigo-600 to-cyan-600",
    glow: "bg-indigo-500/10",
    image: "/freelancing-team.webp",
    desc: "Professional portfolio development, resume optimization, freelancing guidance, client acquisition strategies, and personal branding solutions.",
    timeline: "2 - 4 Weeks Plan",
    price: "From ₹2,999",
    tech: ["Fiverr", "Upwork", "Resume Systems", "LinkedIn Branding", "Cover Letter Kits"],
    benefits: ["Rapid profile approval", "Compelling contracting resume", "Client communication guidance"],
    features: [
      { name: "Fiverr & Upwork Setup", desc: "Comprehensive profile setup, strategic description optimization, keyword tag research, and profile score maximization." },
      { name: "Premium Portfolio Configuration", desc: "Construct a professional personal branding website demonstrating your code, designs, or services to global recruiters." },
      { name: "Remote Development Support", desc: "Provide continuous engineering feedback and structural logic advice to help you scale complex contracting assignments." },
      { name: "Bidding & Contracting Strategy", desc: "Proven letter templates, proposal formats, and messaging tactics designed to win client contracts on Upwork." },
      { name: "Custom Software Solutions", desc: "Help freelancers architect, code, and deploy custom software assignments to deliver high-quality outcomes for their clients." },
      { name: "AI Automation Integration", desc: "Guidance on how to integrate AI prompts and workflows into your delivery schedule to optimize task speeds." }
    ]
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(false);
  const [mounted, setMounted] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to URL hash change to open service details dynamically without 404 routes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          const match = serviceDetails.find((s) => s.id === hash);
          if (match) {
            handleSelectService(match);
          }
        }
      };

      handleHashChange();
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, [mounted]);

  const handleSelectService = (svc: ServiceItem) => {
    setErrorDetails(false);
    setLoadingDetails(true);
    setActiveService(svc);
    
    // Simulate dynamic backend response fetch
    const timer = setTimeout(() => {
      setLoadingDetails(false);
    }, 450);

    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);

    return () => clearTimeout(timer);
  };

  const triggerRetry = () => {
    if (activeService) {
      handleSelectService(activeService);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="radial-glow w-[500px] h-[500px] bg-cyan-600/10 top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            Our Offerings
          </motion.div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight">
            Premium Solutions for the <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Digital Age</span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans">
            Explore our service columns below. Click on any service card to open its detailed parameters, deliverables, and exact timelines.
          </p>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="py-10 px-6 border-t border-card-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceDetails.map((service, idx) => {
            const isSelected = activeService?.id === service.id;
            return (
              <motion.div
                key={service.title}
                initial={mounted ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelectService(service)}
                className={`glass-card rounded-3xl p-0 overflow-hidden flex flex-col justify-between group duration-500 cursor-pointer border ${
                  isSelected ? "border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.25)]" : "border-card-border hover:border-blue-500/25"
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video border-b border-card-border">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-black/60 backdrop-blur border border-card-border text-white text-[10px] font-bold uppercase tracking-wider">
                    <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                    {service.timeline}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col gap-5 flex-1 justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white shadow`}>
                        <service.icon className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-text-primary font-display font-extrabold text-sm bg-card-bg border border-card-border px-2.5 py-1 rounded-lg">
                        {service.price}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors mt-2">{service.title}</h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans">{service.desc}</p>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    {service.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                        <span className="text-text-secondary text-xs font-sans">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider border-t border-card-border pt-4">
                    <span className="text-blue-500 dark:text-blue-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {isSelected ? "Details Opened Below" : "Click for Detailed Specs"}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-text-muted transition-transform ${isSelected ? "rotate-90 text-cyan-500 dark:text-cyan-400" : "group-hover:translate-x-1"}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* DETAILED SPECS OR MODAL WINDOW */}
      <div ref={detailRef}>
        <AnimatePresence>
          {activeService && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="py-16 px-6 bg-card-bg/60 border-t border-card-border relative overflow-hidden"
            >
              <div className={`absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl pointer-events-none ${activeService.glow} opacity-40`} />

              <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex items-center justify-between border-b border-card-border pb-6 mb-10">
                  <div>
                    <span className="text-xs font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-widest">Deliverables Checklist</span>
                    <h2 className="font-display font-extrabold text-3xl text-text-primary mt-1">
                      {activeService.title} Features
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveService(null)}
                    className="w-10 h-10 rounded-xl bg-card-bg border border-card-border hover:bg-section-accent flex items-center justify-center text-text-secondary hover:text-text-primary transition-all outline-none"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* SKELETON LOADER STATE */}
                {loadingDetails ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4 flex flex-col gap-6 animate-pulse">
                      <div className="h-32 bg-card-bg rounded-2xl border border-card-border" />
                      <div className="h-24 bg-card-bg rounded-2xl border border-card-border" />
                      <div className="h-12 bg-card-bg rounded-xl border border-card-border" />
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-28 bg-card-bg rounded-2xl border border-card-border animate-pulse" />
                      ))}
                    </div>
                  </div>
                ) : errorDetails ? (
                  /* ERROR RECOVERY STATE */
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                    <h3 className="text-text-primary text-lg font-bold">Failed to load detailed features</h3>
                    <p className="text-text-secondary text-sm max-w-xs font-sans">
                      Connection timed out while fetching structural components.
                    </p>
                    <button
                      onClick={triggerRetry}
                      className="px-5 py-2.5 rounded-xl bg-card-bg border border-card-border hover:bg-section-accent text-text-primary font-semibold text-xs transition-all flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Retry Connection
                    </button>
                  </div>
                ) : (
                  /* ACTUAL CONTENT STATE */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Meta info */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                      <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Project Metadata</p>
                        <ul className="flex flex-col gap-3">
                          <li className="flex justify-between items-center text-sm border-b border-card-border pb-2">
                            <span className="text-text-secondary">Timeline:</span>
                            <span className="text-text-primary font-semibold">{activeService.timeline}</span>
                          </li>
                          <li className="flex justify-between items-center text-sm border-b border-card-border pb-2">
                            <span className="text-text-secondary">Pricing Base:</span>
                            <span className="text-text-primary font-semibold">{activeService.price}</span>
                          </li>
                          <li className="flex justify-between items-center text-sm">
                            <span className="text-text-secondary">Project Type:</span>
                            <span className="text-text-primary font-semibold">Custom Code Build</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">Technologies Deployed</p>
                        <div className="flex flex-wrap gap-2">
                          {activeService.tech.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-medium font-sans">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/contact"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                      >
                        Book Free Consultation
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Right deliverables grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {activeService.features.map((feat) => (
                        <div
                          key={feat.name}
                          className="p-5.5 rounded-2xl bg-card-bg border border-card-border hover:border-blue-500/30 hover:bg-section-accent transition-all duration-300 flex flex-col gap-2.5 group/item"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4.5 h-4.5 text-cyan-500 dark:text-cyan-400 shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                            <h4 className="text-text-primary text-base font-bold">{feat.name}</h4>
                          </div>
                          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans pl-6.5">
                            {feat.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-section-accent border-t border-card-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-6">
            Looking for a Custom Dynamic Solution?
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-sans">
            Tell us about your brand targets, reference designs, and budget. Our strategists will customize a highly scalable layout matching your criteria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all duration-300"
            >
              Start Free Proposal
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-secondary-theme text-text-primary font-semibold text-sm transition-all duration-300"
            >
              View Pricing Tiers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
      <WhatsAppButton />
    </div>
  );
}
