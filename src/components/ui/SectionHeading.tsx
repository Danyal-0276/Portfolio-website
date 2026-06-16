import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      <p
        className={cn(
          "mb-3 text-sm font-medium uppercase tracking-widest",
          dark ? "text-accent" : "text-accent-dark",
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "font-display text-3xl leading-tight sm:text-4xl md:text-5xl",
          dark ? "text-cream" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      <div className={cn("accent-line mt-4", dark && "bg-accent")} />
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-cream/80" : "text-charcoal-light",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
