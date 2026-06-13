import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="Projects"
          title="Selected work across the stack"
          description="From production POS systems to NLP research pipelines. Eight projects that showcase my range."
        />

        <div
          id="projects-grid"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
