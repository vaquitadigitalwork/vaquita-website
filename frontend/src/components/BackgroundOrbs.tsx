"use client";

import { useEffect, useState } from "react";

export default function BackgroundOrbs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-[#030712]">
      {/* Mesh Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/15 blur-[120px] animate-mesh-orb-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/10 blur-[120px] animate-mesh-orb-2" />
      <div className="absolute top-[30%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-cyan-600/10 blur-[100px] animate-mesh-orb-3" />
      
      {/* Moving Light Beams */}
      <div className="absolute top-[15%] left-[20%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent rotate-[35deg] blur-[2px] animate-beam-1" />
      <div className="absolute bottom-[20%] right-[30%] w-[1px] h-[35vh] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent rotate-[35deg] blur-[2px] animate-beam-2" />

      {/* Subtle floating particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-1 h-1 bg-white rounded-full left-[10%] top-[20%] animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full right-[25%] top-[15%] animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full left-[35%] bottom-[25%] animate-ping" style={{ animationDuration: "5s" }} />
        <div className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full right-[15%] bottom-[30%] animate-pulse" style={{ animationDuration: "6s" }} />
      </div>
    </div>
  );
}
