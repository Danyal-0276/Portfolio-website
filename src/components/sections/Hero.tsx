"use client";

import Image from "next/image";
import { hero, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/gsap";

export function Hero() {
  const nameParts = siteConfig.name.toUpperCase().split(" ");

  return (
    <section
      id="hero"
      className="hero-dark relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-20 text-cream md:pt-24"
    >
      <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Golden horizon arc — James Lux style */}
      <div className="hero-arc pointer-events-none absolute right-0 bottom-0 h-[55vh] w-[min(900px,85vw)] opacity-50" aria-hidden="true" />

      <div className="relative mx-auto min-h-[calc(100vh-5rem)] max-w-[1400px] px-6 md:px-12 lg:px-16">
        <div className="grid min-h-[inherit] items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Left column — intro & CTA */}
          <div className="hero-greeting relative z-40 order-2 flex flex-col justify-center gap-6 py-6 lg:order-1 lg:col-span-4 lg:py-16">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-cream/80 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {hero.availability}
            </span>

            <p className="hero-headline max-w-sm text-base leading-relaxed text-cream/65 md:text-lg">
              {hero.intro}
            </p>

            <div className="hero-cta flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => scrollToSection("#contact")}
                className="rounded-full bg-cream px-8 text-charcoal hover:bg-gold"
              >
                Schedule Call
              </Button>
              <Button
                variant="outline"
                href={siteConfig.resumePath}
                className="rounded-full border-white/25 text-cream hover:border-gold hover:text-gold"
              >
                View Resume
              </Button>
            </div>
          </div>

          {/* Center stage — name, outline role, merged portrait */}
          <div className="relative order-1 flex min-h-[58vh] flex-col items-center justify-end lg:order-2 lg:col-span-8 lg:min-h-[calc(100vh-8rem)]">
            {/* Solid name + outlined role behind portrait */}
            <div
              className="pointer-events-none absolute inset-x-0 top-[6%] z-10 flex flex-col items-center select-none md:top-[10%]"
              aria-hidden="true"
            >
              <span className="hero-title-line text-[clamp(3rem,11.5vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.04em] text-white">
                {nameParts[0]}
              </span>
              <span className="hero-title-line -mt-1 text-[clamp(3rem,11.5vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.04em] text-white md:-mt-3">
                {nameParts.slice(1).join(" ")}
              </span>
              <p className="hero-role-outline mt-1 text-[clamp(1.6rem,4.8vw,4rem)] leading-none font-bold tracking-tight uppercase md:mt-2">
                {hero.roleOutline}
              </p>
            </div>

            {/* Portrait merged into dark background */}
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
