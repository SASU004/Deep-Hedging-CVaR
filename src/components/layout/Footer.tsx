import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav } from "@/config/navigation";
import { ds } from "@/config/design-system";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A research-oriented environment for learning, simulating, and stress-testing
              modern hedging approaches—built for clarity, not hype.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.platform.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm text-foreground/80 transition-colors hover:text-accent",
                      ds.focus.ring,
                      "rounded-sm"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Research
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.research.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm text-foreground/80 transition-colors hover:text-accent",
                      ds.focus.ring,
                      "rounded-sm"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} QuantForge. Research platform shell—no live market data.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
          >
            Documentation overview
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
