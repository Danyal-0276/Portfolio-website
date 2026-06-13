import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const categoryColors: Record<Project["category"], string> = {
  "Full Stack": "bg-gold/15 text-gold-dark",
  Mobile: "bg-blue-100 text-blue-800",
  "Machine Learning": "bg-purple-100 text-purple-800",
  "Data Engineering": "bg-emerald-100 text-emerald-800",
  Frontend: "bg-orange-100 text-orange-800",
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "project-card reveal group flex h-full flex-col rounded-2xl border border-charcoal/8 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            categoryColors[project.category],
          )}
        >
          {project.category}
        </span>
        {project.highlight && (
          <span className="text-xs text-charcoal/50">{project.highlight}</span>
        )}
      </div>

      <h3 className="mb-2 font-serif text-xl text-charcoal group-hover:text-gold-dark">
        {project.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-charcoal-light">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md bg-cream px-2 py-1 text-xs text-charcoal/70"
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-gold-dark transition-colors hover:text-charcoal"
      >
        View on GitHub
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </article>
  );
}
