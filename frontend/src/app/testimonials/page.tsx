"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const defaultReviews: Review[] = [
  { name: "Rahul Kumar", role: "Business Owner", rating: 5, text: "Vaquita transformed our online presence completely. The website they built is fast, modern, and our clients love it.", date: "02 May 2026", avatar: "R" },
  { name: "Sneha Reddy", role: "Startup Founder", rating: 5, text: "The branding and digital work was creative and professional from day one. Highly recommend Vaquita to any startup.", date: "28 Apr 2026", avatar: "S" },
  { name: "Arjun Patel", role: "E-commerce Owner", rating: 5, text: "Clean design, fast delivery, and the team understood exactly what we needed without much explanation. Outstanding work.", date: "24 Apr 2026", avatar: "A" },
  { name: "Priya Sharma", role: "Digital Marketer", rating: 5, text: "Strong design ideas and the final output gave our brand a premium look. Our engagement went up noticeably after launch.", date: "19 Apr 2026", avatar: "P" },
  { name: "Kiran Verma", role: "Freelancer", rating: 5, text: "Fast communication and dependable support. Vaquita helped me set up my freelancing profile and land my first client.", date: "14 Apr 2026", avatar: "K" },
  { name: "Anjali Mehta", role: "Marketing Head", rating: 5, text: "Our website looks far more organized and attractive now. The team was patient and worked until everything was perfect.", date: "10 Apr 2026", avatar: "A" },
  { name: "Vikram Nair", role: "Agency Director", rating: 5, text: "Excellent understanding of our brand identity. Delivered ahead of schedule with zero revisions needed. Truly professional.", date: "05 Apr 2026", avatar: "V" },
  { name: "Meera Joshi", role: "Content Creator", rating: 5, text: "My personal brand website looks incredible. Vaquita nailed the aesthetics and everything works smoothly on mobile too.", date: "01 Apr 2026", avatar: "M" },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-72 sm:w-80 flex-shrink-0 bg-card-bg border border-card-border rounded-2xl p-6 flex flex-col gap-4 hover:border-blue-500/20 hover:bg-section-accent transition-all duration-300 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-display font-extrabold text-white text-sm shadow-md">
            {review.avatar}
          </div>
          <div>
            <p className="text-text-primary text-sm font-bold">{review.name}</p>
            <p className="text-text-muted text-[11px] font-medium font-sans">{review.role}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-text-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-text-muted text-[10px] mt-1 font-sans">{review.date}</p>
        </div>
      </div>
      <div className="h-px bg-card-border" />
      <p className="text-[32px] text-blue-500/10 leading-none font-serif">&ldquo;</p>
      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed -mt-4 font-sans">{review.text}</p>
    </div>
  );
}

function Marquee({ reviews, direction = "left" }: { reviews: Review[]; direction?: "left" | "right" }) {
  const doubled = [...reviews, ...reviews];
  return (
    <div className="relative w-full overflow-hidden py-3">
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-color), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-color), transparent)" }}
      />
      <div
        className={`flex gap-5 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{ width: "max-content" }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [mounted, setMounted] = useState(false);
  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/review", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Submit failed");
    }

    await response.json();

    setSubmitted(true);

    form.reset();
    setRating(5);
  } catch (error) {
    alert("Failed to submit review.");
    console.error(error);
  }
};

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("submitted") === "1") setSubmitted(true);
    }
    // Fetch dynamic reviews from Flask API
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data: Review[]) => setReviews(data))
      .catch(() => {});
  }, []);

  const allReviews = [...reviews, ...defaultReviews];
  const row1 = allReviews;
  const row2 = [...allReviews].reverse();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="radial-glow w-[500px] h-[500px] bg-blue-600/10 top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            Testimonials
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight">
            Client Success <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans">
            Hear from startup founders, business owners, and freelancers who scaled their digital presence with Vaquita.
          </p>
        </div>
      </section>

      {/* MARQUEES */}
      <section className="py-8 overflow-hidden flex flex-col gap-6 border-y border-card-border bg-section-accent">
        <Marquee reviews={row1} direction="left" />
        <Marquee reviews={row2} direction="right" />
      </section>

      {/* SUBMISSION FORM */}
      <section id="submit" className="py-20 px-6 border-t border-card-border bg-section-accent">
        <div className="max-w-xl mx-auto">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-card-border relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center gap-5 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center text-green-400 mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-text-primary">Review Submitted!</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-sm font-sans">
                  Thank you for sharing your feedback. Your review will be compiled and displayed dynamically.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="font-display font-bold text-2xl text-text-primary text-center mb-2">
                    Submit Your Review
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm text-center mb-6 font-sans">
                    We appreciate your feedback and strive to deliver professional-grade services.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Rahul Kumar"
                    className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                    Role / Occupation
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    placeholder="e.g. Founder, Freelancer"
                    className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all font-sans"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                    Rating
                  </label>
                 <div className="flex gap-1.5 items-center">
                    {Array.from({ length: 5 }, (_, i) => {
                    const starIdx = i + 1;

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(starIdx)}
                        onMouseEnter={() => setHoverRating(starIdx)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl outline-none focus:scale-115 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                          starIdx <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-text-muted"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <input type="hidden" name="rating" value={rating} />
</div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="text" className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                    Your Review
                  </label>
                  <textarea
                    id="text"
                    name="text"
                    required
                    rows={4}
                    placeholder="Describe your experience collaborating with the Vaquita team..."
                    className="w-full input-theme rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  Submit Review
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
