"use client";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  magnetic?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-charcoal hover:bg-gold-dark shadow-md shadow-gold/20",
  secondary:
    "bg-charcoal text-cream hover:bg-charcoal-light",
  ghost: "bg-transparent text-charcoal hover:bg-cream-dark",
  outline:
    "border-2 border-charcoal/20 bg-transparent text-charcoal hover:border-gold hover:text-gold-dark",
};

function MagneticWrap({
  children,
  className,
  enabled,
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic({ strength: 0.3 });

  if (!enabled) return <>{children}</>;

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("inline-block transition-transform duration-300 ease-out", className)}
    >
      {children}
    </span>
  );
}

export function Button({
  className,
  variant = "primary",
  href,
  external,
  magnetic = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <MagneticWrap enabled={magnetic}>
        <a
          href={href}
          className={classes}
          data-cursor="view"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      </MagneticWrap>
    );
  }

  return (
    <MagneticWrap enabled={magnetic}>
      <button className={classes} data-cursor="view" {...props}>
        {children}
      </button>
    </MagneticWrap>
  );
}
