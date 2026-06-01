import { cn } from "@/lib/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "default" | "secondary" | "muted";
  container?: boolean;
  id?: string;
};

const variantStyles = {
  default: "bg-bg-primary",
  secondary: "bg-bg-secondary border-y border-border-subtle",
  muted: "bg-bg-primary",
};

export function Section({
  variant = "default",
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative py-20 md:py-28", variantStyles[variant], className)}
      {...props}
    >
      {container ? (
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
