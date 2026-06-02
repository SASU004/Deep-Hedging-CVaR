import { cn } from "@/lib/cn";
import { ds } from "@/config/design-system";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className={cn("mb-3", ds.typography.eyebrow)}>{eyebrow}</p>}
      <h2 className={ds.typography.h2}>{title}</h2>
      {description && (
        <p className={cn("mt-4", ds.typography.body)}>{description}</p>
      )}
    </header>
  );
}
