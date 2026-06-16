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
  compactSnapshot = false,
}: {
  project: (typeof projects)[0];
  index: number;
  className?: string;
  compactSnapshot?: boolean;
}) {
  return (
    <article className={className}>
      <div className="mx-auto grid w-full min-w-0 max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="project-panel-content min-w-0 overflow-hidden">
          <span className="project-reveal project-number mb-3 inline-block font-display text-4xl sm:text-5xl md:text-8xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="project-reveal mb-2 text-xs font-medium tracking-widest text-accent uppercase sm:text-sm">
            {project.category}
          </p>
          <h3 className="project-reveal mb-3 max-w-full font-display text-lg text-balance break-words text-white sm:mb-4 sm:text-2xl md:text-4xl lg:text-5xl">
            {project.title}
          </h3>
          {project.highlight && (
            <p className="project-reveal mb-4 text-sm text-cream/50">{project.highlight}</p>
          )}
          <p className="project-reveal mb-6 max-w-full text-base leading-relaxed break-words text-cream/70 md:max-w-lg md:text-lg">
            {project.description}
          </p>
          <div className="project-reveal mb-5 flex max-w-full flex-wrap gap-1.5 sm:mb-6 sm:gap-2 md:mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-cream/70 sm:px-3 sm:text-sm"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-reveal inline-flex max-w-full items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-5 py-2.5 text-xs font-medium text-accent-soft transition-colors hover:bg-accent hover:text-ink sm:px-6 sm:py-3 sm:text-sm"
            data-cursor="view"
          >
            View on GitHub
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="project-snapshot-wrap mt-6 min-w-0 w-full max-w-full overflow-hidden sm:mt-8 lg:mt-0">
          <ProjectSnapshotStack
            projectId={project.id}
            disableScrollReveal={!compactSnapshot}
            compact={compactSnapshot}
          />
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

          ScrollTrigger.create({
            trigger: card,
            start: "top 82%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                reveals,
                { opacity: 0, y: 36 },
                { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power3.out", clearProps: "opacity,transform" },
              );
            },
          });
        });
      } else if (mobileCards.length) {
        mobileCards.forEach((card) => {
          gsap.set(card.querySelectorAll(".project-reveal"), { opacity: 1, clearProps: "transform" });
        });
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          gsap.set(track, { x: 0 });

          const panels = gsap.utils.toArray<HTMLElement>(".showcase-panel", track);

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
              end: () => `+=${Math.max(getScrollDistance(), window.innerHeight * 0.5)}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          panels.forEach((panel, panelIndex) => {
            const reveals = panel.querySelectorAll(".project-reveal");
            const snapshot = panel.querySelector(".project-snapshot-wrap");

            if (panelIndex === 0) {
              gsap.set(reveals, { opacity: 1, y: 0 });
            }

            gsap.fromTo(
              reveals,
              { opacity: panelIndex === 0 ? 1 : 0, y: panelIndex === 0 ? 0 : 48 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power3.out",
                immediateRender: panelIndex !== 0,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: "left 75%",
                  end: "left 25%",
                  toggleActions: "play none none reverse",
                },
              },
            );

            if (snapshot) {
              gsap.fromTo(
                snapshot,
                { opacity: panelIndex === 0 ? 1 : 0.5, scale: panelIndex === 0 ? 1 : 0.94 },
                {
                  opacity: 1,
                  scale: 1,
                  ease: "none",
                  immediateRender: panelIndex !== 0,
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

            const number = panel.querySelector(".project-number");
            if (number) {
              gsap.fromTo(
                number,
                { scale: 0.88, opacity: 0.45 },
                {
                  scale: 1,
                  opacity: 1,
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
          gsap.delayedCall(0.5, refreshScroll);

          const resizeObserver = new ResizeObserver(scheduleRefresh);
          resizeObserver.observe(track);
          resizeObserver.observe(pin);

          return () => {
            resizeObserver.disconnect();
          };
        });

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set(section.querySelectorAll(".project-reveal"), { opacity: 1, clearProps: "transform" });
        gsap.set(section.querySelectorAll(".project-snapshot-wrap"), { opacity: 1, clearProps: "transform" });
      });

      return () => {
        refreshDebounce?.kill();
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-x-clip section-aurora text-cream">
      <div className="section-padding relative pb-0">
        <div className="section-container">
          <SectionHeading
            dark
            label="Projects"
            title="Scroll through selected work"
            description="Real screenshots from TRAK, POS, ML research, and more. Scroll horizontally on desktop to explore all eight."
          />
        </div>
      </div>

      <div className="project-showcase-mobile section-container relative w-full max-w-full space-y-12 overflow-x-hidden px-4 pb-16 sm:space-y-16 sm:px-6 md:px-12 lg:hidden">
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            compactSnapshot
            className="project-card-mobile glass-panel w-full min-w-0 max-w-full overflow-hidden p-4 sm:p-6 md:p-10"
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
              className="showcase-panel flex h-full w-screen shrink-0 flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-12 xl:px-24"
            />
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-cream/35">
          <span>Keep scrolling to browse projects</span>
          <svg className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
