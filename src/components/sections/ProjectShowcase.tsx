"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, registerGSAP } from "@/lib/gsap";

function ProjectPanel({
  project,
  index,
  className,
}: {
  project: (typeof projects)[0];
  index: number;
  className?: string;
}) {
  return (
    <article className={className}>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="mb-4 inline-block font-serif text-6xl text-charcoal/10 md:text-8xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gold-dark">
            {project.category}
          </p>
          <h3 className="mb-4 font-serif text-2xl text-charcoal md:text-4xl lg:text-5xl">
            {project.title}
          </h3>
          {project.highlight && (
            <p className="mb-4 text-sm text-charcoal/50">{project.highlight}</p>
          )}
          <p className="mb-6 max-w-lg text-base leading-relaxed text-charcoal-light md:text-lg">
            {project.description}
          </p>
          <div className="mb-6 flex flex-wrap gap-2 md:mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-charcoal/10 bg-white px-3 py-1 text-sm text-charcoal/70"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-gold hover:text-charcoal"
          >
            View on GitHub
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="relative hidden aspect-square lg:block">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/20 to-charcoal/5" />
          <div className="absolute inset-4 rounded-2xl border border-charcoal/10 bg-white p-8 shadow-xl">
            <p className="mb-2 text-xs uppercase tracking-wider text-charcoal/40">Stack</p>
            <ul className="space-y-3">
              {project.tech.slice(0, 5).map((t) => (
                <li key={t} className="border-b border-charcoal/5 pb-2 font-medium text-charcoal">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      const track = trackRef.current;
      const pin = pinRef.current;
      if (!track || !pin) return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!isDesktop || prefersReducedMotion) return;

      gsap.set(".project-card", { opacity: 1, y: 0 });

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - pin.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - pin.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="bg-cream">
      <div className="section-padding pb-0">
        <div className="section-container">
          <SectionHeading
            label="Projects"
            title="Scroll through selected work"
            description="Each project with a clear description. Scroll horizontally on desktop to explore all eight."
          />
        </div>
      </div>

      {/* Mobile / tablet: vertical stack */}
      <div className="section-container space-y-16 pb-16 lg:hidden">
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            className="project-card reveal rounded-2xl border border-charcoal/8 bg-white p-6 md:p-10"
          />
        ))}
      </div>

      {/* Desktop: horizontal scroll pin */}
      <div
        ref={pinRef}
        className="showcase-pin relative hidden h-screen overflow-hidden lg:block"
      >
        <div ref={trackRef} id="projects-grid" className="flex h-full w-max items-stretch">
          {projects.map((project, index) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={index}
              className="showcase-panel project-card flex h-full w-screen shrink-0 flex-col justify-center px-16 xl:px-24"
            />
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-charcoal/40">
          <span>Keep scrolling to browse projects</span>
          <svg className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
