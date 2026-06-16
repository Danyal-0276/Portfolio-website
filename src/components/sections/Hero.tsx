"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { hero, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { HeroMeta } from "@/components/ui/HeroMeta";
import { SplitLetters } from "@/components/ui/SplitLetters";
import { gsap, registerGSAP, scrollToSection } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameParts = siteConfig.name.toUpperCase().split(" ");

  useGSAP(
    () => {
      registerGSAP();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.to(".hero-orb", {
        y: "+=14",
        duration: 5,
        ease: "sine.inOut",
        stagger: { each: 1, from: "random" },
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-ring", {
        rotate: 360,
        duration: 56,
        ease: "none",
        repeat: -1,
      });

      const portrait = portraitRef.current;
      let removeMove: (() => void) | undefined;

      if (portrait) {
        const xTo = gsap.quickTo(portrait, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(portrait, "y", { duration: 0.6, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
          const rect = sectionRef.current?.getBoundingClientRect();
          if (!rect) return;
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          xTo(relX * 18);
          yTo(relY * 12);
        };

        sectionRef.current?.addEventListener("mousemove", onMove);
        removeMove = () => sectionRef.current?.removeEventListener("mousemove", onMove);
      }

      return () => removeMove?.();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-dark relative min-h-screen overflow-hidden bg-ink pt-14 text-cream sm:pt-16 md:pt-[4.25rem]"
    >
      <div className="hero-base-gradient pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb hero-orb-gold absolute -top-[8%] left-[5%] h-[380px] w-[380px] rounded-full blur-[100px] md:h-[420px] md:w-[420px]" />
        <div className="hero-orb hero-orb-accent absolute top-[20%] -right-[10%] h-[320px] w-[320px] rounded-full blur-[90px]" />
      </div>

      <div className="hero-grid-full pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-[0.28]" aria-hidden="true" />
      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1400px] flex-col px-6 md:px-12 lg:px-16">
        <div className="hero-meta-row flex shrink-0 items-start justify-between pt-2 pb-8 md:pt-4 md:pb-10">
          <p className="hidden max-w-[220px] text-[10px] leading-relaxed tracking-[0.18em] text-cream/35 uppercase sm:block">
            {hero.roleBadge}
          </p>
          <HeroMeta />
        </div>

        <div className="grid flex-1 items-center gap-10 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-16">
          {/* Typography column */}
          <div className="hero-greeting relative z-20 order-2 flex flex-col justify-center gap-5 lg:order-1">
            <div className="space-y-0">
              <h1 className="text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.04em] text-white">
                <span className="block">
                  <SplitLetters text={nameParts[0]} />
                </span>
                <span className="block text-accent">
                  <SplitLetters text={nameParts.slice(1).join(" ")} />
                </span>
              </h1>
              <p className="hero-role-outline mt-3 max-w-md text-[clamp(1.1rem,3vw,2.25rem)] leading-none font-bold tracking-tight uppercase">
                <SplitLetters text={hero.roleOutline} charClassName="hero-role-char" />
              </p>
            </div>

            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-[11px] leading-snug text-cream/80 backdrop-blur-md sm:w-fit sm:px-4 sm:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
              {hero.availability}
            </span>

            <p className="hero-headline max-w-md text-base leading-relaxed text-cream/65 md:text-lg">
              {hero.intro}
            </p>

            <p className="hidden max-w-sm font-serif text-base text-cream/45 italic md:block">
              {hero.motto}
            </p>

            <div className="hero-cta flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                variant="primary"
                magnetic
                onClick={() => scrollToSection("#projects")}
                className="w-full rounded-full bg-accent px-8 text-white hover:bg-accent-soft sm:w-auto"
                data-cursor="explore"
              >
                View Work
              </Button>
              <Button
                variant="outline"
                magnetic
                href={siteConfig.resumePath}
                className="w-full rounded-full border-white/25 bg-white/[0.04] text-cream backdrop-blur-sm hover:border-accent hover:text-accent sm:w-auto"
                data-cursor="view"
              >
                View Resume
              </Button>
            </div>
          </div>

          {/* Portrait column — orange background photo */}
          <div className="relative order-1 flex items-end justify-center lg:order-2 lg:justify-end">
            <div className="hero-ring pointer-events-none absolute top-1/2 left-1/2 hidden h-[min(68vw,520px)] w-[min(68vw,520px)] -translate-x-1/2 -translate-y-[45%] rounded-full border border-white/[0.06] lg:block" aria-hidden="true" />

            <div
              ref={portraitRef}
              className="hero-image relative z-10 w-full max-w-[min(380px,88vw)] will-change-transform lg:max-w-[440px]"
            >
              <div className="hero-portrait-photo relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10 md:rounded-3xl">
                <Image
                  src="/images/profile-orange.png"
                  alt={`${siteConfig.name}, professional portrait`}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 88vw, 440px"
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
