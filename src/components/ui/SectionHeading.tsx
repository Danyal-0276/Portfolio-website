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
          dark ? "text-gold" : "text-gold-dark",
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "font-serif text-4xl leading-tight md:text-5xl",
          dark ? "text-cream" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      <div className={cn("gold-line mt-4", dark && "bg-gold")} />
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-cream/80" : "text-charcoal-light",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
