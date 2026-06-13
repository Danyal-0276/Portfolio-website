import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: string;
  className?: string;
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "skill-badge reveal rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm text-charcoal transition-colors hover:border-gold hover:bg-gold/5",
        className,
      )}
    >
      {skill}
    </span>
  );
}
