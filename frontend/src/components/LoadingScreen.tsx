"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]"
        >
          {/* Logo container with spinning ring */}
          <div className="relative flex items-center justify-center">
            {/* Spinning gradient ring */}
            <div className="w-24 h-24 rounded-3xl border border-white/5 bg-slate-950/60 p-2 flex items-center justify-center relative shadow-[0_0_50px_rgba(37,99,235,0.15)] animate-float-logo">
              <div className="absolute inset-0 rounded-3xl border border-transparent border-t-brand-blue border-r-brand-cyan animate-spin" style={{ animationDuration: "1.5s" }} />
              <img
                src="/logo.svg"
                alt="VAQUITA Loading..."
                className="w-16 h-16 object-contain relative z-10 animate-pulse"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-col items-center gap-1.5"
          >
            <span className="font-display font-extrabold tracking-widest text-lg bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
              VAQUITA
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              Engineering Scale
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
