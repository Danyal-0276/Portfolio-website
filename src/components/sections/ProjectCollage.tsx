"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { getProjectSnapshotFit, getProjectThumbnail, isChartSnapshotProject, isDarkUiSnapshotProject, projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Draggable, gsap, registerGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const collageLayout = [
  { x: 8, y: 12, rotate: -6, scale: 1 },
  { x: 52, y: 5, rotate: 4, scale: 0.95 },
  { x: 28, y: 38, rotate: -3, scale: 1.05 },
  { x: 68, y: 42, rotate: 7, scale: 0.9 },
  { x: 5, y: 58, rotate: 5, scale: 0.92 },
  { x: 45, y: 65, rotate: -8, scale: 1 },
  { x: 75, y: 22, rotate: 3, scale: 0.88 },
  { x: 22, y: 78, rotate: -4, scale: 0.94 },
  { x: 58, y: 82, rotate: 6, scale: 0.86 },
];

export function ProjectCollage() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const draggablesRef = useRef<Draggable[]>([]);

  useGSAP(
    () => {
      registerGSAP();

      const board = boardRef.current;
      if (!board) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const cards = gsap.utils.toArray<HTMLElement>(".collage-card", board);
      draggablesRef.current = [];

      cards.forEach((card, i) => {
        const layout = collageLayout[i];
        gsap.set(card, {
          rotation: layout.rotate,
          scale: layout.scale,
          x: 0,
          y: 0,
          zIndex: i + 1,
        });
      });

      if (!prefersReducedMotion) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: board,
            start: "top 85%",
            once: true,
          },
        });
      }

      cards.forEach((card, i) => {
        const layout = collageLayout[i];
        const [d] = Draggable.create(card, {
          type: "x,y",
          bounds: board,
          inertia: true,
          edgeResistance: 0.65,
          onPress() {
            gsap.to(card, { scale: layout.scale * 1.05, zIndex: 50, duration: 0.2 });
          },
          onRelease() {
            gsap.to(card, { scale: layout.scale, duration: 0.25 });
          },
        });
        draggablesRef.current.push(d);
      });

      return () => draggablesRef.current.forEach((d) => d.kill());
    },
    { scope: sectionRef },
  );

  function resetLayout() {
    draggablesRef.current.forEach((d, i) => {
      const layout = collageLayout[i];
      const card = d.target as HTMLElement;

      gsap.to(card, {
        x: 0,
        y: 0,
        rotation: layout.rotate,
        scale: layout.scale,
        zIndex: i + 1,
        duration: 0.9,
        ease: "power3.out",
        overwrite: true,
        onComplete: () => {
          d.update();
        },
      });
    });
  }

  return (
    <section id="collage" ref={sectionRef} className="section-padding bg-charcoal">
      <div className="section-container">
        <SectionHeading
          label="Interactive Collage"
          title="Play with the project snapshots"
          description="Drag, toss, and rearrange real screenshots from my projects."
          dark
        />

        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={resetLayout}
            className="rounded-full border border-cream/20 px-5 py-2 text-sm text-cream/70 transition-colors hover:border-gold hover:text-gold"
          >
            Reset layout
          </button>
        </div>

        <div
          ref={boardRef}
          className="collage-board relative mx-auto aspect-[3/4] min-h-[420px] w-full max-w-5xl overflow-hidden rounded-3xl border border-cream/10 bg-charcoal-light/20 sm:aspect-[4/3] sm:min-h-0 md:aspect-[16/10]"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />

          {projects.map((project, i) => {
            const layout = collageLayout[i];
            const thumbnail = getProjectThumbnail(project.id);
            const fit = getProjectSnapshotFit(project.id);
            const isChart = isChartSnapshotProject(project.id);
            const isDarkUi = isDarkUiSnapshotProject(project.id);

            return (
              <div
                key={project.id}
                data-scale={layout.scale}
                className="collage-card absolute w-[38%] max-w-[220px] cursor-grab touch-none select-none active:cursor-grabbing md:w-[28%] md:max-w-[260px]"
                style={{
                  left: `${layout.x}%`,
                  top: `${layout.y}%`,
                }}
              >
                <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
                  <div
                    className={cn(
                      "relative",
                      isDarkUi ? "bg-black" : "bg-white",
                      isChart ? "aspect-square" : "aspect-[4/3]",
                    )}
                  >
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={`${project.title} preview`}
                        fill
                        className={cn(
                          fit === "contain" ? "object-contain p-1.5" : "object-cover object-top",
                        )}
                        sizes="260px"
                        quality={70}
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gold/20 text-xs text-cream/50">
                        No preview
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="bg-white p-3 md:p-4">
                    <h4 className="line-clamp-2 font-serif text-sm leading-snug text-charcoal md:text-base">
                      {project.title}
                    </h4>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs text-gold-dark hover:underline"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-cream/30">
            Drag snapshot cards anywhere on the board
          </p>
        </div>
      </div>
    </section>
  );
}
