"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { hero, siteConfig } from "@/data/portfolio";
import { HeroMeta } from "@/components/ui/HeroMeta";
import { SplitLetters } from "@/components/ui/SplitLetters";
import { Draggable, gsap, registerGSAP, scrollToSection } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameParts = siteConfig.name.toUpperCase().split(" ");

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const dragEl = dragRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!prefersReducedMotion) {
        const portrait = portraitRef.current;
        if (portrait) {
          gsap.fromTo(
            portrait,
            { opacity: 0, y: 28, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              delay: 0.35,
              ease: "power2.out",
              clearProps: "opacity,transform",
            },
          );
        }

        if (dragEl) {
          Draggable.create(dragEl, {
            type: "x,y",
            bounds: section,
            inertia: true,
            edgeResistance: 0.75,
            onPress() {
              gsap.to(dragEl, { scale: 1.02, duration: 0.25 });
              gsap.to(".hero-drag-hint", { opacity: 0, duration: 0.2 });
            },
            onRelease() {
              gsap.to(dragEl, { scale: 1, duration: 0.35, ease: "back.out(1.4)" });
            },
          });
        }

        gsap.to(".hero-dot-grid", {
          backgroundPosition: "48px 48px",
          duration: 20,
          ease: "none",
          repeat: -1,
        });

        const onMove = (e: MouseEvent) => {
          const portrait = portraitRef.current;
          if (!portrait) return;
          const rect = section.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(portrait, {
            x: relX * 14,
            y: relY * 10,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        section.addEventListener("mousemove", onMove);
        return () => section.removeEventListener("mousemove", onMove);
      } else if (portraitRef.current) {
        gsap.set(portraitRef.current, { opacity: 1, clearProps: "transform" });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-dark section-aurora relative flex min-h-screen flex-col overflow-hidden pt-14 text-cream sm:pt-16 md:pt-[4.25rem]"
    >
      <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 md:px-12 lg:px-16">
        <div className="hero-meta-row flex shrink-0 items-center justify-between py-4 md:py-6">
          <button
            type="button"
            onClick={() => scrollToSection("#hero")}
            className="text-xs font-bold tracking-[0.15em] text-white uppercase md:text-sm"
          >
            {nameParts.join(" ")}
          </button>

          <p className="hero-drag-hint hidden max-w-[280px] text-center text-[10px] tracking-[0.2em] text-cream/30 uppercase lg:block">
            {hero.motto} · {hero.dragHint}
          </p>

          <HeroMeta />
        </div>

        <div className="grid flex-1 items-center gap-8 pb-12 lg:grid-cols-2 lg:gap-12 lg:pb-16">
          <div className="order-2 flex flex-col items-center justify-center text-center lg:order-1 lg:items-start lg:text-left">
            <div
              ref={dragRef}
              className="hero-name-drag relative cursor-grab touch-none px-2 py-4 active:cursor-grabbing lg:px-0"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl border border-dashed border-white/10 opacity-60"
                aria-hidden="true"
              />

              <h1 className="select-none">
                <span className="hero-title-line block text-[clamp(2.75rem,12vw,7rem)] leading-[0.85] font-bold tracking-[-0.04em] text-white lg:text-[clamp(3rem,8vw,6.5rem)]">
                  <SplitLetters text={nameParts[0]} />
                </span>
                <span className="hero-title-line hero-role-outline mt-1 block text-[clamp(2.75rem,12vw,7rem)] leading-[0.85] font-bold tracking-[-0.04em] md:-mt-2 lg:text-[clamp(3rem,8vw,6.5rem)]">
                  <SplitLetters text={nameParts.slice(1).join(" ")} charClassName="hero-role-char" />
                </span>
              </h1>
            </div>

            <p className="hero-headline mt-5 max-w-md text-sm text-cream/55 md:text-base">
              {hero.subtext}
            </p>

            <div className="hero-cta mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection("#projects")}
                className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
                data-cursor="explore"
              >
                View Work
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("#about")}
                className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-cream transition-colors hover:border-accent/60 hover:text-accent-soft"
                data-cursor="explore"
              >
                About
              </button>
            </div>
          </div>

          <div className="relative order-1 flex items-center justify-center lg:order-2 lg:items-end lg:justify-end">
            <div
              ref={portraitRef}
              className="hero-image relative z-10 w-full max-w-[min(320px,78vw)] sm:max-w-[360px] lg:max-w-[420px]"
            >
              <div className="hero-portrait-photo relative overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 md:rounded-3xl">
                <Image
                  src={hero.portraitSrc}
                  alt={`${siteConfig.name}, professional portrait`}
                  width={840}
                  height={1120}
                  priority
                  className="h-auto w-full object-cover object-center"
                  sizes="(max-width: 768px) 78vw, 420px"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
