"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

type RouteTransitionProps = {
  children: React.ReactNode;
};

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
