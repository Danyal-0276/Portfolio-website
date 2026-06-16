"use client";

import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";
import { skillGroups } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const totalSkills = useMemo(
    () => skillGroups.reduce((sum, group) => sum + group.skills.length, 0),
    [],
  );

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>(".skill-bento-card", section);
      if (cards.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, rotateX: 0, rotateY: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });

          batch.forEach((card) => {
            const badges = card.querySelectorAll(".skill-badge");
            gsap.from(badges, {
              opacity: 0,
              y: 10,
              scale: 0.9,
              duration: 0.4,
              stagger: 0.025,
              ease: "back.out(1.4)",
              delay: 0.15,
            });
          });
        },
        start: "top 88%",
        once: true,
      });

      const tiltCleanups: (() => void)[] = [];

      cards.forEach((card) => {
        const rotX = gsap.quickTo(card, "rotateX", { duration: 0.45, ease: "power2.out" });
        const rotY = gsap.quickTo(card, "rotateY", { duration: 0.45, ease: "power2.out" });

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          rotY(x * 10);
          rotX(-y * 10);
        };

        const onLeave = () => {
          rotX(0);
          rotY(0);
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        tiltCleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        tiltCleanups.forEach((fn) => fn());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden px-6 py-16 md:px-12 md:py-20 lg:px-20"
    >
      <div className="absolute inset-0 bg-charcoal" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black, transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(700px,90vw)] -translate-x-1/2 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.1), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            label="Skills"
            title="Technologies I work with"
            description="Every stack layer — from languages and CS fundamentals to ML pipelines and cloud deployment."
            dark
            className="mb-0"
          />
          <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
            <span className="font-serif text-2xl text-accent">{totalSkills}</span>
            <span className="text-xs leading-tight text-cream/50 uppercase tracking-wider">
              skills
              <br />
              tracked
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-6">
          {skillGroups.map((group) => (
            <article
              key={group.label}
              className={cn(
                "skill-bento-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-colors duration-300 hover:border-accent/25 hover:bg-white/[0.06] sm:p-4",
                group.span,
              )}
            >
              <div
                className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                style={{ backgroundColor: group.accent }}
                aria-hidden="true"
              />

              <header className="relative mb-2.5 flex items-center gap-2 sm:mb-3">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: group.accent, color: group.accent }}
                />
                <h3 className="text-[10px] font-semibold tracking-[0.18em] text-cream/55 uppercase sm:text-[11px]">
                  {group.label}
                </h3>
                <span className="ml-auto text-[10px] tabular-nums text-cream/25">
                  {group.skills.length}
                </span>
              </header>

              <div className="relative flex flex-wrap gap-1 sm:gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge inline-flex rounded-md border border-white/[0.08] bg-black/20 px-2 py-0.5 text-[11px] leading-snug text-cream/75 transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-cream sm:px-2.5 sm:py-1 sm:text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
