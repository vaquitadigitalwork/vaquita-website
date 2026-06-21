"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

const budgetBounds = {
  "Web Design": { min: 5000, max: 100000, step: 1000, def: 19999 },
  "Digital Marketing": { min: 2000, max: 50000, step: 500, def: 9999 },
  "Freelancing": { min: 1000, max: 30000, step: 500, def: 6999 }
} as const;

type ServiceType = keyof typeof budgetBounds;

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [serviceType, setServiceType] = useState<ServiceType>("Web Design");
  const [budget, setBudget] = useState("19999");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const paramService = searchParams.get("service");
  const paramPlan = searchParams.get("plan");
  const paramPrice = searchParams.get("price");
  const paramSubject = searchParams.get("subject");

  useEffect(() => {
    let resolvedService: ServiceType = "Web Design";
    if (paramService) {
      if (paramService === "Web Design" || paramService === "web-dev") {
        resolvedService = "Web Design";
      } else if (paramService === "Digital Marketing" || paramService === "marketing") {
        resolvedService = "Digital Marketing";
      } else if (paramService === "Freelancing" || paramService === "freelance") {
        resolvedService = "Freelancing";
      }
      setServiceType(resolvedService);
    }

    if (paramPrice) {
      setBudget(paramPrice);
    } else {
      setBudget(String(budgetBounds[resolvedService].def));
    }

    if (paramPlan && paramPrice) {
      setMessage(`Hello! I would like to get started with the ${paramPlan} plan (${paramPrice}). Please contact me to discuss my project requirements.`);
    } else if (paramSubject === "consultation") {
      setMessage("Hello! I would like to book a free consultation call to discuss my startup requirements. Please let me know your availability.");
    }
  }, [paramService, paramPlan, paramPrice, paramSubject]);

  const activeBounds = budgetBounds[serviceType];
  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      setSubmitted(true);
      form.reset();
      return;
    }

    alert(result.message);
  } catch (error) {
    alert("Failed to submit contact request.");
  }
};

  return (
    <div className="lg:col-span-7">
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-card-border">
        {submitted ? (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">🚀</div>

            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Project Request Received
            </h2>

            <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
              Thank you for contacting Vaquita Digital Solutions.
               Our team has received your project requirements and
              will contact you within 24 hours.
            </p>

            <div className="mt-6 p-4 rounded-xl border border-green-500/20 bg-green-500/10">
              <p className="text-green-400 font-semibold">
                ✓ Submission Successful
              </p>
            </div>
          </div>
) : (
  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Rahul Kumar"
                className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="e.g. rahul@example.com"
                className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="e.g. +91 9849141518"
                className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="service_type" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                Service Type
              </label>
              <select
                id="service_type"
                name="service_type"
                required
                value={serviceType}
                onChange={(e) => {
                  const val = e.target.value as ServiceType;
                  setServiceType(val);
                  setBudget(String(budgetBounds[val].def));
                }}
                className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all"
              >
                <option value="Web Design" className="bg-card-bg text-text-primary">Web Design & Development Solutions</option>
                <option value="Digital Marketing" className="bg-card-bg text-text-primary">Digital Marketing & Brand Growth</option>
                <option value="Freelancing" className="bg-card-bg text-text-primary">Freelancing & Professional Portfolio Services</option>
              </select>
            </div>
          </div>

          {/* Budget Slider with dynamic bounds */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                Budget / Amount
              </label>
              <span className="text-sm font-bold text-cyan-500 dark:text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-lg">
                ₹{parseInt(budget).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              id="amount"
              name="amount"
              min={activeBounds.min}
              max={activeBounds.max}
              step={activeBounds.step}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full accent-blue-500 bg-card-border/20 h-1.5 rounded-lg outline-none cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-text-muted font-bold uppercase mt-0.5">
              <span>₹{activeBounds.min.toLocaleString()}</span>
              <span>₹{activeBounds.max.toLocaleString()}+</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
              Project Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your brand, requirements, goals, and any reference designs..."
              className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            Send Message
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-text-secondary flex flex-col">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="radial-glow w-[500px] h-[500px] bg-blue-600/10 top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            Get In Touch
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight">
            Let&apos;s Design Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Digital Future</span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans">
            Ready to scale your business or personal brand online? Tell us about your goals and we will curate a solution.
          </p>
        </div>
      </section>

      {/* FORM AND INFO GRIDS */}
      <section className="py-10 px-6 border-t border-card-border flex-1 bg-section-accent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Details left */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary">
                Contact Information
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Connect with our strategists directly or request custom proposals. We are online and happy to support you.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-card-bg border border-card-border">
                <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-text-muted text-[11px] font-bold uppercase tracking-wider">Phone</p>
                  <p className="text-text-primary text-sm font-semibold mt-0.5">+91 98491 41518</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-card-bg border border-card-border">
                <div className="w-11 h-11 rounded-xl bg-cyan-600/15 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-text-muted text-[11px] font-bold uppercase tracking-wider">Email</p>
                  <p className="text-text-primary text-sm font-semibold mt-0.5">vaquitadigitalsolutions@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-card-bg border border-card-border">
                <div className="w-11 h-11 rounded-xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-text-muted text-[11px] font-bold uppercase tracking-wider">Address</p>
                  <p className="text-text-primary text-sm font-semibold mt-0.5">Telangana, India</p>
                </div>
              </div>
            </div>

            {/* Visual Callout Image */}
            <div className="relative rounded-2xl overflow-hidden border border-card-border shadow-2xl group">
              <img
                src="/contact-team.webp"
                alt="Contact Vaquita Support"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 aspect-[16/10]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-white text-xs font-bold uppercase tracking-wider">Instant Assistance</p>
                <p className="text-gray-300 text-[11px] mt-0.5">Consult our Vaquita AI Chatbot for quick pricing and details.</p>
              </div>
            </div>

            {/* Social channels */}
            <div className="flex flex-col gap-3.5">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Follow Our Journey</p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/vaquitadigitalworks?igsh=MWlkdGJ2NWtlMmNyaA==s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-card-border/10 border border-card-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-card-border/50 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/gaddam-suma-6a521a411"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-card-border/10 border border-card-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-card-border/50 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/vaquitadigitalwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-card-border/10 border border-card-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-card-border/50 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form details right wrapped in Suspense */}
          <Suspense fallback={
            <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-12 border border-card-border flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-secondary text-sm">Loading contact form...</p>
              </div>
            </div>
          }>
            <ContactFormInner />
          </Suspense>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
