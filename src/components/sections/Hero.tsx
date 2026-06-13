"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { hero, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { gsap, registerGSAP, scrollToSection } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameParts = siteConfig.name.toUpperCase().split(" ");

  useGSAP(
    () => {
      registerGSAP();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.to(".hero-orb", {
        y: "+=18",
        duration: 4.5,
        ease: "sine.inOut",
        stagger: { each: 0.8, from: "random" },
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-ring", {
        rotate: 360,
        duration: 48,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".hero-ring-inner", {
        rotate: -360,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-dark relative min-h-screen overflow-hidden bg-[#070707] pt-14 text-cream sm:pt-16 md:pt-[4.25rem]"
    >
      {/* Base depth gradient */}
      <div className="hero-base-gradient pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Aurora mesh blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb hero-orb-gold absolute -top-[10%] left-[8%] h-[420px] w-[420px] rounded-full blur-[100px]" />
        <div className="hero-orb hero-orb-violet absolute top-[18%] -right-[8%] h-[360px] w-[360px] rounded-full blur-[90px]" />
        <div className="hero-orb hero-orb-cyan absolute bottom-[8%] left-[22%] h-[280px] w-[280px] rounded-full blur-[80px]" />
      </div>

      {/* Full grid + perspective lines */}
      <div className="hero-grid-full pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-perspective pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]" aria-hidden="true" />

      {/* Decorative rings behind portrait zone */}
      <div
        className="pointer-events-none absolute top-1/2 left-[58%] z-0 hidden -translate-x-1/2 -translate-y-[42%] lg:block"
        aria-hidden="true"
      >
        <div className="hero-ring relative h-[min(72vh,680px)] w-[min(72vh,680px)] rounded-full border border-white/[0.06]" />
        <div className="hero-ring-inner absolute inset-[12%] rounded-full border border-gold/10" />
        <div className="absolute inset-[24%] rounded-full border border-dashed border-white/[0.04]" />
      </div>

      {/* Horizon glow */}
      <div className="hero-arc pointer-events-none absolute right-0 bottom-0 h-[60vh] w-full max-w-[1100px]" aria-hidden="true" />
      <div className="hero-horizon-line pointer-events-none absolute right-[8%] bottom-[22%] hidden h-px w-[min(520px,40vw)] md:block" aria-hidden="true" />

      {/* Film grain */}
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />

      {/* Edge vignette */}
      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto min-h-[calc(100vh-5rem)] max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid min-h-[inherit] items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Left column */}
          <div className="hero-greeting relative z-40 order-2 flex flex-col justify-center gap-6 py-6 lg:order-1 lg:col-span-4 lg:py-16">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-[11px] leading-snug text-cream/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:px-4 sm:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {hero.availability}
            </span>

            <p className="hero-headline max-w-sm text-base leading-relaxed text-cream/70 md:text-lg">
              {hero.intro}
            </p>

            <p className="hidden max-w-xs text-xs tracking-[0.22em] text-gold/60 uppercase lg:block">
              {hero.roleLineSecondary}
            </p>

            <div className="hero-cta flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button
                variant="primary"
                onClick={() => scrollToSection("#contact")}
                className="w-full rounded-full bg-cream px-8 text-charcoal hover:bg-gold sm:w-auto"
              >
                Schedule Call
              </Button>
              <Button
                variant="outline"
                href={siteConfig.resumePath}
                className="w-full rounded-full border-white/25 bg-white/[0.04] text-cream backdrop-blur-sm hover:border-gold hover:text-gold sm:w-auto"
              >
                View Resume
              </Button>
            </div>
          </div>

          {/* Center stage */}
          <div className="relative order-1 flex min-h-[58vh] flex-col items-center justify-end lg:order-2 lg:col-span-8 lg:min-h-[calc(100vh-8rem)]">
            {/* Portrait spotlight */}
            <div
              className="pointer-events-none absolute bottom-[8%] left-1/2 z-0 h-[55%] w-[min(480px,80vw)] -translate-x-1/2 rounded-full opacity-80 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(237,179,60,0.14) 0%, rgba(120,80,200,0.06) 45%, transparent 72%)",
              }}
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute inset-x-0 top-[6%] z-10 flex flex-col items-center select-none md:top-[10%]"
              aria-hidden="true"
            >
              <span className="hero-title-line text-[clamp(2.25rem,10vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.04em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                {nameParts[0]}
              </span>
              <span className="hero-title-line -mt-1 text-[clamp(2.25rem,10vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.04em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] md:-mt-3">
                {nameParts.slice(1).join(" ")}
              </span>
              <p className="hero-role-outline mt-1 max-w-[95vw] text-center text-[clamp(1.25rem,4.2vw,4rem)] leading-none font-bold tracking-tight uppercase md:mt-2">
                {hero.roleOutline}
              </p>
            </div>

            <div className="hero-image relative z-30 mx-auto h-[min(58vh,580px)] w-full max-w-[min(440px,92vw)] lg:h-[min(72vh,680px)]">
              <div className="hero-portrait-merge relative h-full w-full">
                <Image
                  src="/images/profile-hero.png"
                  alt={`${siteConfig.name}, professional portrait`}
                  fill
                  priority
                  className="hero-cutout object-contain object-bottom"
                  sizes="(max-width: 768px) 92vw, 440px"
                />
              </div>
            </div>

            <p className="hero-role-mobile relative z-20 mt-3 text-center text-xs font-medium tracking-[0.28em] text-white/35 uppercase lg:hidden">
              {hero.roleLineSecondary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
