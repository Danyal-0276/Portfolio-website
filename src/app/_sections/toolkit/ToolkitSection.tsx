import { StackLab } from "./StackLab";

export function ToolkitSection({ motion }: { motion: boolean }) {
  return (
    <section
      id="toolkit"
      className="toolkit-section section-space"
      aria-labelledby="toolkit-title"
    >
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              <span>04 /</span> The toolkit
            </p>
            <h2 id="toolkit-title">
              Different layers.
              <br />
              <span className="serif">One connected mind.</span>
            </h2>
          </div>
          <p className="section-intro">
            The tools change. The goal stays simple:
            <br />
            build something useful, and build it well.
          </p>
        </div>
        <StackLab motion={motion} />
        <div className="foundation-strip mono">
          <span>The foundations underneath</span>
          <p>
            Python / TypeScript / JavaScript / Java / C++ / SQL / OOP / Data
            structures & algorithms
          </p>
        </div>
      </div>
    </section>
  );
}
