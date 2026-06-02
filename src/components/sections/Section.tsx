import { cn } from "@/lib/cn";
import { ds } from "@/config/design-system";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "default" | "secondary" | "muted";
  container?: boolean;
  id?: string;
};

const variantStyles = {
  default: "bg-bg-primary",
  secondary: "bg-bg-secondary border-y border-border-subtle section-divider",
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
      className={cn("relative", ds.layout.sectionY, variantStyles[variant], className)}
      {...props}
    >
      {container ? (
        <div className={ds.layout.container}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
