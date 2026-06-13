import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
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

export function Button({
  className,
  variant = "primary",
  href,
  external,
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
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
