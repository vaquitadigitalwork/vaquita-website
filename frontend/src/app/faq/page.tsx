"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Minus, HelpCircle, ArrowRight, Search, Sparkles, 
  Send, Bot, User, Trash2, Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VaquitaBot from "@/components/VaquitaBot";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

const staticFaqs = [
  {
    q: "What digital services does Vaquita offer?",
    a: "Vaquita Digital Solutions offers premium Website Design and Development, results-oriented Digital Marketing & Branding campaigns, and comprehensive Freelancing Guidance (including profile creation, professional resumes, and portfolio design).",
  },
  {
    q: "How does the pricing structure work?",
    a: "We believe in high budget-flexibility. We offer predefined tiers (Starter, Professional) starting at extremely competitive prices alongside custom enterprise quotation options. No contracts or surprise fees are ever included.",
  },
  {
    q: "Do you build custom designs or use generic templates?",
    a: "Every project is meticulously hand-coded by our team using premium design patterns and systems (such as Next.js, Framer, and Tailwind). We do not rely on standard templates, ensuring your brand stays original.",
  },
  {
    q: "What is your typical project delivery timeline?",
    a: "Timelines depend wholly on scope. Simple single-page projects or portfolios are typically completed in 3-7 business days, while multipage solutions or managed marketing campaigns span 2-4 weeks.",
  },
  {
    q: "How do I get started with Vaquita?",
    a: "Simply navigate to our Contact page and outline your project ideas, email, phone number, and budget range. Our strategists will respond instantly to configure a complimentary custom proposal.",
  },
];

const suggestedQuestions = [
  "What technologies do you use for web development?",
  "How much does a responsive business website cost?",
  "What is included in the digital marketing services?",
  "Can you help me get clients on Upwork or Fiverr?",
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-2xl border border-card-border overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left outline-none gap-4"
      >
        <span className="font-display font-bold text-text-primary text-base sm:text-lg">
          {faq.q}
        </span>
        <div className="w-8 h-8 rounded-lg bg-card-border/10 border border-card-border flex items-center justify-center text-text-secondary shrink-0">
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

// Custom hook to animate typing effect letter by letter
function TypingText({ text, speed = 15 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap font-sans">{displayedText}</p>;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load local history if available
    const saved = localStorage.getItem("vaquita_faq_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const saveHistory = (newHistory: string[]) => {
    setHistory(newHistory);
    localStorage.setItem("vaquita_faq_history", JSON.stringify(newHistory));
  };

  const handleAskAI = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || loading) return;

    setSearchQuery("");
    setChatLog((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    // Save query to history list
    const updatedHistory = [text, ...history.filter((h) => h !== text)].slice(0, 5);
    saveHistory(updatedHistory);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setChatLog((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "Sorry, I could not process that request." },
      ]);
    } catch (err) {
      setChatLog((prev) => [
        ...prev,
        { role: "bot", text: "Connection error. Please check your internet and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, loading]);

  const clearHistory = () => {
    saveHistory([]);
  };

  const filteredStaticFaqs = staticFaqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-text-secondary flex flex-col overflow-hidden">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-28 pb-10 px-6 text-center overflow-hidden">
        <div className="radial-glow w-[500px] h-[500px] bg-blue-600/10 top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI Search Console
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary mb-6 leading-tight">
            How Can We <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Help You Today?</span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans">
            Consult our backend-powered AI Assistant box directly or review standard answers from the details listings underneath.
          </p>
        </div>
      </section>

      {/* AI CHAT SEARCH ENGINE CONSOLE */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl border border-card-border overflow-hidden shadow-2xl flex flex-col min-h-[420px]">
            {/* Console Header */}
            <div className="bg-card-bg border-b border-card-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-text-muted text-xs font-mono ml-2">vaquita-ai-engine.sh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider">Connected to Backend</p>
              </div>
            </div>

            {/* Conversation Log area */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[300px] flex flex-col gap-4 no-scrollbar bg-section-accent">
              {chatLog.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center gap-3 py-10 opacity-70">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-text-primary text-base font-bold">Ask Anything About Vaquita</h3>
                  <p className="text-text-secondary text-xs max-w-xs font-sans">
                    Ask about Web Development, Pricing details, Marketing campaigns, or how to contact our team.
                  </p>
                </div>
              ) : (
                chatLog.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      msg.role === "bot" ? "bg-blue-600/10 border-blue-500/20 text-blue-500 dark:text-blue-400" : "bg-card-border/10 border-card-border text-text-primary"
                    }`}>
                      {msg.role === "bot" ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "bot" ? "bg-card-bg border border-card-border text-text-primary" : "bg-blue-600/20 border border-blue-500/20 text-text-primary font-sans"
                    }`}>
                      {msg.role === "bot" ? <TypingText text={msg.text} /> : msg.text}
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex gap-3.5 items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="bg-card-bg border border-card-border rounded-2xl px-5 py-3 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-card-bg border-t border-card-border">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskAI(searchQuery)}
                    placeholder="Search standard questions or type a custom prompt query..."
                    className="w-full input-theme rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all font-sans"
                  />
                  <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                </div>
                <button
                  onClick={() => handleAskAI(searchQuery)}
                  disabled={loading || !searchQuery.trim()}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 flex items-center justify-center text-white transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions grid */}
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Suggested:</span>
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAskAI(q)}
                    disabled={loading}
                    className="px-3 py-1.5 rounded-lg btn-secondary-theme text-[11px] font-medium font-sans hover:text-text-primary transition-all outline-none"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Local History Panel */}
          {history.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-4 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-text-muted flex items-center gap-1 font-sans">
                  <Clock className="w-3.5 h-3.5" />
                  Recent Searches:
                </span>
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handleAskAI(h)}
                    disabled={loading}
                    className="text-text-secondary hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors underline font-sans font-medium"
                  >
                    {h}
                  </button>
                ))}
              </div>
              <button
                onClick={clearHistory}
                className="text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors outline-none font-bold uppercase tracking-wider text-[10px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      {/* POPULAR STATIC SEARCHABLE FAQS */}
      <section className="py-16 px-6 border-t border-card-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-3">Popular List</p>
            <h2 className="font-display font-bold text-3xl text-text-primary">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-4">
            {filteredStaticFaqs.length === 0 ? (
              <p className="text-center text-text-secondary font-sans text-sm py-10">No matches found for your query. Try typing a prompt above.</p>
            ) : (
              filteredStaticFaqs.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* FOOTER CALL */}
      <section className="py-20 px-6 border-t border-card-border bg-section-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mb-6">
            Have a Complex Custom Requirement?
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-sans">
            Our engineering teams are online and responsive. Consult our team directly to build secure database and SaaS structures.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-[0_8px_30px_rgba(37,99,235,0.4)] group transition-all duration-300"
          >
            Ask a Question
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <Footer />
      <VaquitaBot />
    </div>
  );
}
