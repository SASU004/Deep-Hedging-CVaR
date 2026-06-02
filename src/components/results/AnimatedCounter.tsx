"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function AnimatedCounter({
  value,
  decimals = 1,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  );
  const [text, setText] = useState(`${prefix}${value.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  return (
    <motion.span className={className} key={value}>
      {text}
    </motion.span>
  );
}
