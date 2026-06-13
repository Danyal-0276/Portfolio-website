"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { projectAccents, projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Draggable, gsap, registerGSAP } from "@/lib/gsap";

const collageLayout = [
  { x: 8, y: 12, rotate: -6, scale: 1 },
  { x: 52, y: 5, rotate: 4, scale: 0.95 },
  { x: 28, y: 38, rotate: -3, scale: 1.05 },
  { x: 68, y: 42, rotate: 7, scale: 0.9 },
  { x: 5, y: 58, rotate: 5, scale: 0.92 },
  { x: 45, y: 65, rotate: -8, scale: 1 },
  { x: 75, y: 22, rotate: 3, scale: 0.88 },
  { x: 22, y: 78, rotate: -4, scale: 0.94 },
];

export function ProjectCollage() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      const board = boardRef.current;
      if (!board) return;

      const cards = gsap.utils.toArray<HTMLElement>(".collage-card");
      const draggables: Draggable[] = [];

      cards.forEach((card) => {
        const d = Draggable.create(card, {
          type: "x,y",
          bounds: board,
          inertia: true,
          edgeResistance: 0.65,
          onPress() {
            gsap.to(card, { scale: 1.05, zIndex: 50, duration: 0.2 });
          },
          onRelease() {
            gsap.to(card, { scale: 1, duration: 0.3 });
          },
        });
        draggables.push(d[0]);
      });

      return () => draggables.forEach((d) => d.kill());
    },
    { scope: sectionRef },
  );

  function resetLayout() {
    const cards = gsap.utils.toArray<HTMLElement>(".collage-card");
    cards.forEach((card, i) => {
      const layout = collageLayout[i];
      gsap.to(card, {
        left: `${layout.x}%`,
        top: `${layout.y}%`,
        rotation: layout.rotate,
        scale: layout.scale,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }

  return (
    <section id="collage" ref={sectionRef} className="section-padding bg-charcoal">
      <div className="section-container">
        <SectionHeading
          label="Interactive Collage"
          title="Play with the project snapshots"
          description="Drag, toss, and rearrange the cards to explore my work your way."
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
          className="collage-board relative mx-auto aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-3xl border border-cream/10 bg-charcoal-light/20 md:aspect-[16/10]"
        >
          {/* Grid hint */}
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
            const gradient =
              projectAccents[project.id] ??
              "linear-gradient(135deg, #edb33c 0%, #343434 100%)";

            return (
              <div
                key={project.id}
                className="collage-card absolute w-[38%] max-w-[220px] cursor-grab touch-none select-none active:cursor-grabbing md:w-[28%] md:max-w-[260px]"
                style={{
                  left: `${layout.x}%`,
                  top: `${layout.y}%`,
                  transform: `rotate(${layout.rotate}deg) scale(${layout.scale})`,
                  zIndex: i + 1,
                }}
              >
                <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/40">
                  <div
                    className="flex aspect-[4/3] items-end p-4"
                    style={{ background: gradient }}
                  >
                    <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
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
            Drag cards anywhere on the board
          </p>
        </div>
      </div>
    </section>
  );
}
