import { cn } from "@/lib/cn";

type PageShellProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageShell({ title, description, children, className }: PageShellProps) {
  return (
    <div className={cn("pt-28 pb-20 sm:pt-32 sm:pb-24", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <header className="max-w-2xl border-b border-border-subtle pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            QuantForge
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
        </header>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </div>
  );
}
