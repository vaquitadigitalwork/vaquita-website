import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-navy/80 border-b border-card-border shadow-[0_4px_30px_rgba(0,0,0,0.15)] py-3 backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative w-10 h-10 rounded-xl overflow-hidden bg-card-bg border border-card-border flex items-center justify-center transition-all duration-300 group-hover:border-brand-blue/30 shadow-[0_0_20px_rgba(37,99,235,0.08)] group-hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 via-transparent to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/logo.svg"
                alt="VAQUITA Logo"
                className="w-full h-full object-contain p-1 relative z-10"
              />
            </motion.div>
            <span className="font-display font-extrabold tracking-widest text-lg bg-gradient-to-r from-text-primary via-text-primary to-brand-blue bg-clip-text text-transparent group-hover:text-brand-blue transition-colors duration-300">
              VAQUITA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-sans text-[13.5px] font-medium tracking-wide transition-colors duration-200 hover:text-text-primary ${
                    isActive ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & Theme Switcher */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Sliding Pill Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="w-14 h-8 rounded-full bg-slate-900 border border-card-border relative flex items-center p-1 cursor-pointer select-none theme-transition"
              aria-label="Toggle light/dark mode"
            >
              <div className="flex justify-between w-full px-1 text-gray-500 pointer-events-none">
                <Moon className="w-3.5 h-3.5 opacity-40" />
                <Sun className="w-3.5 h-3.5 opacity-40" />
              </div>
              <motion.div
                animate={{ x: isLight ? 22 : 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg"
              >
                {isLight ? (
                  <Sun className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-white" />
                )}
              </motion.div>
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl btn-secondary-theme text-xs font-semibold uppercase tracking-wider hover:border-brand-blue/30 transition-all duration-300 group shadow-inner"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 text-brand-cyan group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Header Actions */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Mobile Switcher */}
            <button
              onClick={toggleTheme}
              className="w-14 h-8 rounded-full bg-slate-900 border border-card-border relative flex items-center p-1 cursor-pointer select-none theme-transition"
              aria-label="Toggle theme mobile"
            >
              <div className="flex justify-between w-full px-1 text-gray-500 pointer-events-none">
                <Moon className="w-3.5 h-3.5 opacity-40" />
                <Sun className="w-3.5 h-3.5 opacity-40" />
              </div>
              <motion.div
                animate={{ x: isLight ? 22 : 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
                className="absolute w-6 h-6 rounded-full bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg"
              >
                {isLight ? (
                  <Sun className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-white" />
                )}
              </motion.div>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-card-bg border border-transparent hover:border-card-border transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-45 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] z-46 bg-background border-l border-card-border p-8 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div className="mt-14">
                <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-6">
                  Navigation
                </p>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`block font-display text-xl font-bold tracking-wide transition-colors py-1 ${
                            isActive
                              ? "bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-brand-blue hover:to-brand-cyan text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  Start A Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-center text-[11px] text-gray-500 mt-4">
                  Let's build something exceptional.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
