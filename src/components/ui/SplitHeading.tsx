import { cn } from "@/lib/utils";

interface SplitHeadingProps {
  solid: string;
  outline: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  solidClassName?: string;
  outlineClassName?: string;
}

export function SplitHeading({
  solid,
  outline,
  as: Tag = "h2",
  className,
  solidClassName,
  outlineClassName,
}: SplitHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display font-bold tracking-[-0.03em] uppercase",
        className,
      )}
    >
      <span className={cn("text-white", solidClassName)}>{solid}</span>{" "}
      <span className={cn("text-outline", outlineClassName)}>{outline}</span>
    </Tag>
  );
}
