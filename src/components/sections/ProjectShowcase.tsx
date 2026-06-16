"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectSnapshotStack } from "@/components/ui/ProjectSnapshotStack";
import { gsap, registerGSAP, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

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
        <div className="project-panel-content">
          <span className="project-reveal project-number mb-4 inline-block font-serif text-6xl text-charcoal/10 md:text-8xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="project-reveal mb-2 text-sm font-medium tracking-widest text-accent uppercase">
            {project.category}
          </p>
          <h3 className="project-reveal mb-4 font-serif text-2xl text-charcoal md:text-4xl lg:text-5xl">
            {project.title}
          </h3>
          {project.highlight && (
            <p className="project-reveal mb-4 text-sm text-charcoal/50">{project.highlight}</p>
          )}
          <p className="project-reveal mb-6 max-w-lg text-base leading-relaxed text-charcoal-light md:text-lg">
            {project.description}
          </p>
          <div className="project-reveal mb-6 flex flex-wrap gap-2 md:mb-8">
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
            className="project-reveal inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-accent hover:text-white"
            data-cursor="view"
          >
            View on GitHub
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="project-snapshot-wrap mt-8 lg:mt-0">
          <ProjectSnapshotStack projectId={project.id} disableScrollReveal />
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
      const section = sectionRef.current;
      if (!track || !pin || !section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const refreshScroll = () => {
        ScrollTrigger.refresh(true);
        ScrollSmoother.get()?.refresh();
      };

      let refreshDebounce: gsap.core.Tween | null = null;
      const scheduleRefresh = () => {
        refreshDebounce?.kill();
        refreshDebounce = gsap.delayedCall(0.15, refreshScroll);
      };

      /* Mobile / tablet: staggered scroll reveals */
      const mobileCards = gsap.utils.toArray<HTMLElement>(".project-card-mobile", section);
      if (mobileCards.length && !prefersReducedMotion) {
        mobileCards.forEach((card) => {
          const reveals = card.querySelectorAll(".project-reveal");
          gsap.set(reveals, { opacity: 0, y: 36 });

          ScrollTrigger.create({
            trigger: card,
            start: "top 82%",
            once: true,
            onEnter: () => {
              gsap.to(reveals, {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.07,
                ease: "power3.out",
              });
            },
          });

          const snapshot = card.querySelector(".project-snapshot-wrap");
          if (snapshot) {
            gsap.from(snapshot, {
              opacity: 0,
              scale: 0.92,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                once: true,
              },
            });
          }
        });
      }

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(track, { x: 0 });

          const panels = gsap.utils.toArray<HTMLElement>(".showcase-panel", track);
          panels.forEach((panel) => {
            gsap.set(panel.querySelectorAll(".project-reveal"), {
              opacity: 0,
              y: 48,
            });
          });

          const getScrollDistance = () =>
            Math.max(0, track.scrollWidth - pin.offsetWidth);

          const horizontalTween = gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          panels.forEach((panel) => {
            const reveals = panel.querySelectorAll(".project-reveal");
            const snapshot = panel.querySelector(".project-snapshot-wrap");

            gsap.to(reveals, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 65%",
                end: "left 35%",
                toggleActions: "play none none reverse",
              },
            });

            if (snapshot) {
              gsap.fromTo(
                snapshot,
                { x: 60, opacity: 0.6 },
                {
                  x: -20,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalTween,
                    start: "left right",
                    end: "right left",
                    scrub: 1,
                  },
                },
              );
            }

            const number = panel.querySelector(".project-number");
            if (number) {
              gsap.fromTo(
                number,
                { scale: 0.8, opacity: 0.05 },
                {
                  scale: 1,
                  opacity: 0.12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalTween,
                    start: "left 80%",
                    end: "left 20%",
                    scrub: 1,
                  },
                },
              );
            }
          });

          refreshScroll();
          requestAnimationFrame(refreshScroll);

          const resizeObserver = new ResizeObserver(scheduleRefresh);
          resizeObserver.observe(track);
          resizeObserver.observe(pin);

          return () => {
            resizeObserver.disconnect();
          };
        },
        sectionRef,
      );

      return () => {
        refreshDebounce?.kill();
        mm.revert();
      };
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
            description="Real screenshots from TRAK, POS, ML research, and more. Scroll horizontally on desktop to explore all eight."
          />
        </div>
      </div>

      <div className="section-container space-y-16 pb-16 lg:hidden">
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            className="project-card-mobile rounded-2xl border border-charcoal/8 bg-white p-6 md:p-10"
          />
        ))}
      </div>

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
              className="showcase-panel flex h-full w-screen shrink-0 flex-col justify-center px-16 xl:px-24"
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
