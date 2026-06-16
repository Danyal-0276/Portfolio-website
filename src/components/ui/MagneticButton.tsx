"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  external?: boolean;
  strength?: number;
  wrapperClassName?: string;
}

export function MagneticButton({
  children,
  className,
  href,
  external,
  strength = 0.35,
  wrapperClassName,
  ...props
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic({ strength });

  const inner = (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("inline-block transition-transform duration-300 ease-out", className)}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        data-cursor="view"
        className={cn("magnetic-btn inline-block", wrapperClassName)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      data-cursor="view"
      className={cn("magnetic-btn inline-block", wrapperClassName)}
      {...props}
    >
      {inner}
    </button>
  );
}
