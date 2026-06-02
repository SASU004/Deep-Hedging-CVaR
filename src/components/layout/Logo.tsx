import Link from "next/link";
import { Layers } from "lucide-react";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="QuantForge home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-card transition-colors group-hover:border-accent/40">
        <Layers className="h-4 w-4 text-accent" strokeWidth={2} />
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Quant<span className="text-accent">Forge</span>
      </span>
    </Link>
  );
}
