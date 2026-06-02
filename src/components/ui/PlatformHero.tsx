"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { ds } from "@/config/design-system";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type PlatformHeroProps = {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: React.ReactNode;
  subtitle: string;
  tags?: string[];
  className?: string;
};

export function PlatformHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  tags = [],
  className,
}: PlatformHeroProps) {
  return (
    <section
      className={cn("relative overflow-hidden", ds.layout.heroPt, className)}
      aria-labelledby="page-hero-title"
    >
      <HeroBackground />
      <div className={ds.layout.heroInner}>
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          {badge && (
            <motion.p
              custom={0}
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/80 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted backdrop-blur-sm"
            >
              {BadgeIcon ? (
                <BadgeIcon className="h-3.5 w-3.5 text-accent" aria-hidden />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              )}
              {badge}
            </motion.p>
          )}

          <motion.h1
            id="page-hero-title"
            custom={1}
            variants={fadeUp}
            className={ds.typography.h1}
          >
            {title}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {subtitle}
          </motion.p>

          {tags.length > 0 && (
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-muted"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border-subtle bg-bg-card/60 px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
