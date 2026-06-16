"use client";

import { useGSAP } from "@gsap/react";
import { useMemo, useRef, useState } from "react";
import { skillGroups } from "@/data/portfolio";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const activeGroupRef = useRef(0);
  const prevGroupRef = useRef(0);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);

  const totalSkills = useMemo(
    () => skillGroups.reduce((sum, group) => sum + group.skills.length, 0),
    [],
  );

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.from(".skills-intro", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });

      if (prefersReducedMotion) {
        gsap.set(".skill-chip", { opacity: 1, scale: 1, clearProps: "transform" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!pin) return;

        ScrollTrigger.create({
          trigger: pin,
          pin: true,
          start: "top top",
          end: () => `+=${window.innerHeight * skillGroups.length * 0.75}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const index = Math.min(
              skillGroups.length - 1,
              Math.floor(self.progress * skillGroups.length),
            );
            if (index !== activeGroupRef.current) {
              activeGroupRef.current = index;
              setActiveGroup(index);
            }
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        skillGroups.forEach((_, gi) => {
          gsap.from(`.skill-group-mobile-${gi} .skill-chip`, {
            scrollTrigger: {
              trigger: `.skill-group-mobile-${gi}`,
              start: "top 88%",
              once: true,
            },
            opacity: 0,
            y: 24,
            scale: 0.85,
            stagger: 0.03,
            duration: 0.5,
            ease: "back.out(1.4)",
          });
        });
      });

      return () => {
        floatTweensRef.current.forEach((tween) => tween.kill());
        floatTweensRef.current = [];
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      const cloud = cloudRef.current;
      const section = sectionRef.current;
      if (!cloud || !section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const direction = activeGroup >= prevGroupRef.current ? 1 : -1;
      prevGroupRef.current = activeGroup;

      const chips = gsap.utils.toArray<HTMLElement>(".skill-chip-active", cloud);

      floatTweensRef.current.forEach((tween) => tween.kill());
      floatTweensRef.current = [];

      gsap.killTweensOf(chips);

      gsap.fromTo(
        chips,
        {
          opacity: 0,
          scale: 0,
          x: () => gsap.utils.random(-120, 120),
          y: () => gsap.utils.random(-80, 80) + direction * 30,
          rotation: () => gsap.utils.random(-45, 45),
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.55,
          stagger: 0.025,
          ease: "back.out(1.6)",
          onComplete: () => {
            chips.forEach((chip, i) => {
              const tween = gsap.to(chip, {
                y: gsap.utils.random(-8, 8),
                x: gsap.utils.random(-4, 4),
                duration: gsap.utils.random(2.5, 4.5),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.04,
              });
              floatTweensRef.current.push(tween);
            });
          },
        },
      );

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: direction * 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        );
      }

      if (countRef.current) {
        gsap.fromTo(
          countRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" },
        );
      }

      gsap.utils.toArray<HTMLElement>(".skill-category-item", section).forEach((item, i) => {
        gsap.to(item, {
          opacity: i === activeGroup ? 1 : 0.35,
          x: i === activeGroup ? 8 : 0,
          duration: 0.35,
          ease: "power2.out",
        });
      });
    },
    { scope: sectionRef, dependencies: [activeGroup] },
  );

  const active = skillGroups[activeGroup];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden section-aurora text-cream"
    >
      <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.12), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="section-padding relative pb-0">
        <div className="section-container skills-intro">
          <SplitHeading
            solid="TECH"
            outline="STACK"
            className="mb-4 font-display text-[clamp(2rem,6vw,3.5rem)] leading-none"
          />
          <p className="max-w-xl text-base text-cream/55">
            {totalSkills} skills across {skillGroups.length} domains — scroll to cycle through each
            layer on desktop.
          </p>
        </div>
      </div>

      <div className="section-container space-y-6 px-6 pb-16 lg:hidden md:px-12">
        {skillGroups.map((group, gi) => (
          <article
            key={group.label}
            className={`skill-group-mobile-${gi} glass-panel p-5`}
          >
            <header className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
              <h3 className="font-display text-sm font-semibold tracking-[0.18em] text-cream/70 uppercase">
                {group.label}
              </h3>
            </header>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-chip inline-flex rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-cream/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div ref={pinRef} className="relative hidden h-screen lg:block">
        <div className="section-container flex h-full items-center gap-16 px-16 xl:gap-24 xl:px-24">
          <aside className="w-[min(320px,30vw)] shrink-0">
            <p className="mb-6 text-xs tracking-[0.22em] text-accent uppercase">
              Category{" "}
              <span ref={countRef}>
                {String(activeGroup + 1).padStart(2, "0")} /{" "}
                {String(skillGroups.length).padStart(2, "0")}
              </span>
            </p>

            <h3
              ref={titleRef}
              className="font-display mb-8 text-[clamp(2rem,4vw,3rem)] leading-[0.95] font-bold tracking-tight text-white uppercase"
            >
              {active.label}
            </h3>

            <ul className="space-y-3 border-l border-white/10 pl-4">
              {skillGroups.map((group, i) => (
                <li
                  key={group.label}
                  className={cn(
                    "skill-category-item text-sm tracking-wide uppercase transition-colors",
                    i === activeGroup ? "font-semibold text-accent" : "text-cream/35",
                  )}
                >
                  {group.label}
                </li>
              ))}
            </ul>

            <div className="mt-10 h-px w-full bg-white/10">
              <div
                className="h-full bg-accent transition-all duration-500 ease-out"
                style={{
                  width: `${((activeGroup + 1) / skillGroups.length) * 100}%`,
                }}
              />
            </div>
          </aside>

          <div
            ref={cloudRef}
            className="relative flex min-h-[min(420px,60vh)] flex-1 flex-wrap content-center justify-center gap-3"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(45,212,191,0.1) 0%, transparent 65%)",
              }}
              aria-hidden="true"
            />
            {active.skills.map((skill) => (
              <span
                key={`${active.label}-${skill}`}
                className="skill-chip skill-chip-active relative z-10 inline-flex rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-cream/90 backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-accent/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-wide text-cream/30">
          Scroll to explore each skill domain
        </p>
      </div>
    </section>
  );
}
