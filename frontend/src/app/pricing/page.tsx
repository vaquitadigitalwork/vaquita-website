"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, HelpCircle, Star, ArrowRight, ShieldCheck, 
  Plus, Minus, Sparkles, PhoneCall
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

type Category = "web-dev" | "freelance" | "marketing";

const categories = [
  { id: "web-dev", name: "Web Design & Development Solutions", icon: "🌐" },
  { id: "freelance", name: "Freelancing & Professional Portfolio Services", icon: "💼" },
  { id: "marketing", name: "Digital Marketing & Brand Growth", icon: "📈" }
] as const;

const pricingData = {
  "web-dev": [
    {
      name: "Starter Website",
      price: "₹9,999",
      period: "project",
      desc: "Premium single-page Next.js landing page built to establish your brand online.",
      accent: "border-card-border bg-card-bg",
      btnColor: "btn-secondary-theme text-text-primary",
      popular: false,
      contactParams: "service=Web Design&plan=Starter Website&price=9999",
      features: [
        "Responsive 1-Page Layout",
        "Essential SEO Structure & Meta Tags",
        "Lead Contact Form with email alerts",
        "Framer Motion Micro-Animations",
        "30 Days Dedicated Email Support",
        "Next.js & Tailwind CSS deployment",
      ]
    },
    {
      name: "Business Website",
      price: "₹19,999",
      period: "project",
      desc: "Engineered for scaling businesses requiring multipage layouts and automation integrations.",
      accent: "border-blue-500/30 bg-card-bg shadow-[0_0_40px_rgba(37,99,235,0.15)]",
      btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25",
      popular: true,
      contactParams: "service=Web Design&plan=Business Website&price=19999",
      features: [
        "Responsive Multipage (Up to 5 Pages)",
        "Advanced Interactive Motion UI effects",
        "Target Keywords Audit & Sitemap Setup",
        "Dynamic Google Sheets Lead Sync",
        "Fail-Safe Database Backup (leads.json)",
        "90 Days Priority Support & Edits",
      ]
    },
    {
      name: "Premium Custom Website",
      price: "₹39,999+",
      period: "project",
      desc: "High-performance custom web applications with database solutions and advanced checkouts.",
      accent: "border-card-border bg-card-bg",
      btnColor: "btn-secondary-theme text-text-primary",
      popular: false,
      contactParams: "service=Web Design&plan=Premium Custom Website&price=39999",
      features: [
        "Custom Web Application (10+ Pages)",
        "Custom Database Integration (PostgreSQL/SQLite)",
        "Stripe/Razorpay Payment Gateway Setup",
        "Interactive Admin Dashboard Panel",
        "VIP Priority Support (180 Days)",
        "Unlimited Revisions & Edits",
      ]
    }
  ],
  "freelance": [
    {
      name: "Basic Project",
      price: "₹2,999",
      period: "setup",
      desc: "Get started on global contracting platforms with a professional profile layout.",
      accent: "border-card-border bg-card-bg",
      btnColor: "btn-secondary-theme text-text-primary",
      popular: false,
      contactParams: "service=Freelancing&plan=Basic Project&price=2999",
      features: [
        "Fiverr & Upwork Profile Account Setup",
        "Single Contracting Gig Audit & Copywriting",
        "Core Skill Mapping & Target Keywords",
        "Starter Cover Letter Bidding Template",
        "15 Days Bidding Support",
      ]
    },
    {
      name: "Professional Project",
      price: "₹6,999",
      period: "setup",
      desc: "Complete profile launch with custom resume branding and a high-performance portfolio.",
      accent: "border-blue-500/30 bg-card-bg shadow-[0_0_40px_rgba(37,99,235,0.15)]",
      btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25",
      popular: true,
      contactParams: "service=Freelancing&plan=Professional Project&price=6999",
      features: [
        "Dual Profile Optimization (Fiverr + Upwork)",
        "3 Custom Gig/Listing Visual Designs",
        "Premium Visual Resume Design & Copy",
        "Next.js Personal Portfolio Website Setup",
        "60 Days Priority support & Bidding review",
      ]
    },
    {
      name: "Enterprise Project",
      price: "₹14,999+",
      period: "setup",
      desc: "Total career transformation including remote interview prep and premium branding.",
      accent: "border-card-border bg-card-bg",
      btnColor: "btn-secondary-theme text-text-primary",
      popular: false,
      contactParams: "service=Freelancing&plan=Enterprise Project&price=14999",
      features: [
        "Advanced Bidding Strategy & Contracting Kit",
        "Full LinkedIn & GitHub Personal Branding",
        "Premium Multi-page Portfolio Site Setup",
        "2 Live Mock Interview Preparation Sessions",
        "1 Year Dedicated Slack Support Channel",
        "Continuous Gig Optimization Audits",
      ]
    }
  ],
  "marketing": [
    {
      name: "Starter Package",
      price: "₹4,999",
      period: "month",
      desc: "Establish an initial social media footprint and structural SEO base.",
      accent: "border-card-border bg-card-bg",
      btnColor: "btn-secondary-theme text-text-primary",
      popular: false,
      contactParams: "service=Digital Marketing&plan=Starter Package&price=4999",
      features: [
        "Social Media Management (5 posts/mo)",
        "Meta & Instagram Feed Layout Design",
        "On-Page Meta Tags & Keyword Audit",
        "Google Analytics Setup & Connection",
        "Monthly PDF Performance Reports",
      ]
    },
    {
      name: "Growth Package",
      price: "₹9,999",
      period: "month",
      desc: "Setup high-converting paid search ads and active social outreach campaigns.",
      accent: "border-blue-500/30 bg-card-bg shadow-[0_0_40px_rgba(37,99,235,0.15)]",
      btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25",
      popular: true,
      contactParams: "service=Digital Marketing&plan=Growth Package&price=9999",
      features: [
        "Meta (Instagram/FB) & Google Ads Setup",
        "Social Media Management (12 posts/mo)",
        "Dedicated Content SEO Strategy Audit",
        "Optimized Landing Page Funnel Strategy",
        "24/7 Priority Communication Support",
        "Bi-weekly Ad Analytics Reviews",
      ]
    },
    {
      name: "Premium Package",
      price: "₹19,999",
      period: "month",
      desc: "Aggressive multi-channel campaigns designed to maximize online customer acquisition.",
      accent: "border-card-border bg-card-bg",
      btnColor: "btn-secondary-theme text-text-primary",
      popular: false,
      contactParams: "service=Digital Marketing&plan=Premium Package&price=19999",
      features: [
        "High-Volume Lead Generation Funnels",
        "Social Media Management (24 posts/mo)",
        "Premium Content Strategy & Keywords Rank",
        "Advanced Analytics & Competitor Auditing",
        "Managed Email Newsletter campaigns",
        "VIP Priority Support & Strategy Call",
      ]
    }
  ]
};

const matrices = {
  "web-dev": {
    headers: ["Features", "Starter", "Business", "Premium Custom"],
    rows: [
      ["Layout Framework", "Single Landing Page", "Multipage (Up to 5)", "Custom App (10+ Pages)"],
      ["Code Architecture", "Next.js Static Export", "Next.js + Flask Routing", "Next.js + Custom DB System"],
      ["Animations UI", "CSS Transitions", "Framer Motion (Premium)", "Framer Motion Custom"],
      ["SEO Configurations", "On-Page Meta tag setup", "Sitemap & Keywords Index", "Full Blog & Analytics Setup"],
      ["Lead Integration", "Email alert form", "Google Sheets Sync", "DB + Custom Webhooks API"],
      ["Revisions", "3 Iteration Cycles", "Unlimited Revisions", "Unlimited Revisions"],
      ["Delivery Timeline", "3 - 5 Business Days", "7 - 14 Business Days", "15 - 25 Business Days"]
    ]
  },
  "freelance": {
    headers: ["Features", "Basic", "Professional", "Enterprise Project"],
    rows: [
      ["Platforms Coverage", "Fiverr & Upwork", "Fiverr + Upwork + LinkedIn", "Fiverr, Upwork, LinkedIn, GitHub"],
      ["Gig Descriptions", "1 Gig Audited", "3 Custom Gig Templates", "Unlimited Gigs Configuration"],
      ["Resume & Cover Letter", "Bidding Letter Template", "Custom Resume + Cover", "VIP Brand Copywriting Package"],
      ["Portfolio Site", "No", "Yes (Next.js Multi-page)", "Yes (Custom Multi-page App)"],
      ["Interview Prep", "No", "1 Mock Interview Session", "2 Live Prep Sessions + Reviews"],
      ["Support Channels", "15 Days Support", "60 Days Priority Support", "1 Year Dedicated Slack Support"]
    ]
  },
  "marketing": {
    headers: ["Features", "Starter", "Growth", "Premium Package"],
    rows: [
      ["Channels Monitored", "Instagram & Facebook", "Meta Ads + Google Search", "Meta + Google + LinkedIn"],
      ["Posts / Month", "5 Social Feed Posts", "12 Social Feed Posts", "24 Social Feed Posts"],
      ["Paid Advertising", "Not Included", "Setup + Bidding Management", "High-Volume Bidding + Pixel Setup"],
      ["Funnels Audit", "Not Included", "Landing Page Layout Review", "Complete Lead Capture System"],
      ["Keywords Outreach", "Basic Meta Tags", "Keyword lists + Blog plan", "Full Competitor Keyword Audits"],
      ["Email Marketing", "Not Included", "Newsletter Template Setup", "Automated Sequence Campaign"],
      ["Reports Review", "Monthly PDF Report", "Bi-weekly Strategy Syncs", "Weekly Analytics Dashboard"]
    ]
  }
};

const pricingFaqs = [
  { q: "Can I upgrade or downgrade my plan later?", a: "Yes, easily! You can scale your plan up or down at any time. For monthly digital marketing retainers, changes take effect in the next billing cycle. For web design, we simply adjust the milestone deliverables." },
  { q: "Are there any hidden charges?", a: "None. We believe in complete transparency. hosting for static websites (Vercel) is set up on the free-tier. Domain registration costs are billed directly to you with zero markups." },
  { q: "What is your satisfaction guarantee?", a: "We want you to love your output. If you are not satisfied with the initial layout or strategy, we will keep iterating and adjusting it according to your feedback until code freeze." },
  { q: "Do you offer custom integrations?", a: "Absolutely. If none of the standard plans fit your startup requirements, select the Premium or Enterprise tier and we can configure payment APIs, custom databases, and webhooks tailored specifically for your workflow." }
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left outline-none gap-4"
      >
        <span className="font-display font-bold text-text-primary text-base sm:text-lg">
          {faq.q}
        </span>
        <div className="w-8 h-8 rounded-lg bg-card-border/5 border border-card-border flex items-center justify-center text-text-secondary shrink-0">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-text-secondary text-xs sm:text-sm leading-relaxed border-t border-card-border pt-4 font-sans">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<Category>("web-dev");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-28 pb-12 px-6 text-center overflow-hidden">
        <div className="radial-glow w-[500px] h-[500px] bg-indigo-600/10 top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3 h-3 text-brand-cyan animate-pulse" />
            Fair & Transparent Rates
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight"
          >
            Startup-Friendly Plans for <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Every Milestone</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans"
          >
            Affordable, premium digital service packages designed for freelancers, startups, and growing enterprises. Pick a package or request custom consultation.
          </motion.p>
        </div>
      </section>

      {/* CATEGORIES TAB SELECTOR */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-12 w-full">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 p-2 rounded-2xl bg-card-bg/60 border border-card-border backdrop-blur-md">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-display font-bold text-sm tracking-wide transition-all duration-300 relative ${
                  isActive 
                    ? "text-white" 
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.icon}</span>
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PLANS CARDS GRID */}
      <section className="py-6 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <AnimatePresence mode="wait">
              {pricingData[activeTab].map((tier, idx) => (
                <motion.div
                  key={`${activeTab}-${tier.name}`}
                  initial={mounted ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className={`glass-card rounded-3xl p-7 border flex flex-col justify-between relative hover:scale-[1.02] duration-300 ${tier.accent}`}
                >
                  {tier.popular && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider font-sans shadow-lg shadow-blue-500/25">
                      <Star className="w-3 h-3 fill-white" />
                      Most Popular
                    </div>
                  )}
                  {/* Card Header & Price */}
                  <div>
                    <span className="text-[11px] font-extrabold text-cyan-500 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-md">
                      {tier.name}
                    </span>
                    <div className="flex items-baseline gap-1 mt-6">
                      <span className="font-display font-extrabold text-4xl sm:text-5xl text-text-primary">
                        {tier.price}
                      </span>
                      <span className="text-text-muted text-xs font-medium font-sans">
                        / {tier.period}
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs sm:text-sm mt-4 leading-relaxed font-sans min-h-[44px]">
                      {tier.desc}
                    </p>

                    <div className="h-px bg-card-border my-6" />

                    {/* Features List */}
                    <ul className="flex flex-col gap-4">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex gap-3 items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 font-bold" />
                          </div>
                          <span className="text-text-secondary text-xs sm:text-sm font-medium font-sans leading-tight">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions buttons */}
                  <div className="mt-8 flex flex-col gap-3">
                    <Link
                      href={`/contact?${tier.contactParams}`}
                      className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 ${tier.btnColor}`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact?subject=consultation"
                      className="w-full py-3.5 rounded-xl border border-card-border hover:bg-white/5 text-text-secondary hover:text-text-primary font-bold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      Book a Consultation
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* TRUST COMMITMENT */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-10 border border-emerald-500/20 bg-emerald-950/10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shrink-0 shadow-lg shadow-emerald-950/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-text-primary">Our 100% Satisfaction Commitment</h3>
            <p className="text-text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed font-sans">
              We operate under a clear transparency standard. If you are not fully satisfied with our initial layout and logic structure, we will continue modifying the setup until it matches your reference criteria, ensuring zero risk.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILED DYNAMIC COMPARISON TABLE */}
      <section className="py-16 px-6 border-t border-card-border relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-3">Feature Grid</p>
            <h2 className="font-display font-bold text-3xl text-text-primary">Compare Plans Side-by-Side</h2>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-card-border bg-section-accent">
            <table className="w-full text-left border-collapse min-w-[600px] text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-card-border bg-card-bg text-text-primary">
                  {matrices[activeTab].headers.map((hdr, i) => (
                    <th 
                      key={i} 
                      className={`p-4.5 font-bold uppercase tracking-wider ${
                        i === 0 ? "" : i === 2 ? "text-blue-600 dark:text-blue-400" : "text-cyan-600 dark:text-cyan-400"
                      }`}
                    >
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-text-secondary font-sans">
                {matrices[activeTab].rows.map((row, idx) => (
                  <tr key={idx} className="border-b border-card-border hover:bg-card-bg/50 transition-all">
                    {row.map((cell, i) => (
                      <td key={i} className={`p-4.5 ${i === 0 ? "font-semibold text-text-primary" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-16 px-6 border-t border-card-border bg-section-accent/20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-3">Pricing Queries</p>
            <h2 className="font-display font-extrabold text-3xl text-text-primary">Pricing FAQs</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {pricingFaqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
