"use client";

import { motion } from "framer-motion";

const shapes = [
  {
    id: 1,
    className: "left-[8%] top-[22%] h-16 w-16 border-accent/25",
    delay: 0,
    rotate: 12,
  },
  {
    id: 2,
    className: "right-[12%] top-[18%] h-24 w-24 border-accent/15 rounded-full",
    delay: 0.4,
    rotate: 0,
  },
  {
    id: 3,
    className: "left-[18%] bottom-[28%] h-20 w-20 border-accent/20 rotate-45",
    delay: 0.8,
    rotate: 45,
  },
  {
    id: 4,
    className: "right-[20%] bottom-[32%] h-14 w-28 border-accent/20",
    delay: 1.2,
    rotate: -8,
  },
  {
    id: 5,
    className: "left-[42%] top-[12%] h-10 w-10 bg-accent/5 border border-accent/20",
    delay: 0.6,
    rotate: 30,
  },
];

export function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute border ${shape.className}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
            rotate: [shape.rotate, shape.rotate + 6, shape.rotate],
          }}
          transition={{
            opacity: { duration: 0.8, delay: shape.delay },
            y: {
              duration: 6 + shape.id,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
            rotate: {
              duration: 8 + shape.id * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
          }}
        />
      ))}

      {/* Corner brackets — quant terminal aesthetic */}
      <motion.svg
        className="absolute left-[6%] top-[38%] h-20 w-20 text-accent/20"
        viewBox="0 0 80 80"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <path d="M8 8 L8 32 M8 8 L32 8" stroke="currentColor" strokeWidth="1" />
        <path d="M72 72 L72 48 M72 72 L48 72" stroke="currentColor" strokeWidth="1" />
      </motion.svg>

      <motion.svg
        className="absolute right-[8%] top-[42%] h-16 w-16 text-accent/15"
        viewBox="0 0 64 64"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.7, duration: 1 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <polygon
          points="32,4 60,56 4,56"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </motion.svg>
    </div>
  );
}
