"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* Animated orange gradient glow */}
      <motion.div
        className="absolute left-1/2 top-[35%] h-[420px] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 122, 0, 0.22) 0%, rgba(255, 159, 69, 0.08) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 0.95, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-[10%] top-[20%] h-48 w-48 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 159, 69, 0.12) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 12, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)",
        }}
      />

      {/* Bottom fade into page */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
