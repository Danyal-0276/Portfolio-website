import { siteConfig } from "@/data/portfolio";
import { selectedWork } from "@/data/selected-work";
import { ProjectGallery } from "./ProjectGallery";

export function WorkSection({ motion }: { motion: boolean }) {
  return (
    <section
      id="work"
      className="work-section shell section-space"
      aria-labelledby="work-title"
    >
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">
            <span>02 /</span> Selected work
          </p>
          <h2 id="work-title">
            Every build.
            <br />
            <span className="serif">A different story.</span>
          </h2>
        </div>
        <p className="section-intro">
          {selectedWork.length} builds. {selectedWork.length} different
          problems.
          <br />
          Follow the thread from the first question
          <br />
          to the system behind the screen.
        </p>
      </div>
      <ProjectGallery motion={motion} />
      <div className="work-bottom">
        <span className="mono">
          A closer look at how I think, build, and solve.
        </span>
        <a
          className="text-link"
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
