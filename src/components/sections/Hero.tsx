"use client";

import Image from "next/image";
import { about, hero, siteConfig } from "@/data/portfolio";
import { scrollToSection } from "@/lib/gsap";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden pt-24 pb-8"
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="hero-bg-text absolute left-[-2%] font-serif text-charcoal/[0.04] select-none">
          DEV
        </span>
        <span className="hero-bg-text absolute right-[-2%] font-serif text-charcoal/[0.04] select-none">
          EL
        </span>
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 md:px-12">
        <div className="mb-8 flex w-full max-w-3xl items-start justify-between gap-4 text-sm">
          <div>
            <p className="hero-name font-serif text-lg font-medium text-charcoal md:text-xl">
              {siteConfig.name}
            </p>
            <p className="hero-greeting text-charcoal/50">{hero.tagline}</p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="hero-headline font-medium text-charcoal">{hero.roles[0]}</p>
            <p className="text-charcoal/50">{hero.roles[1]}</p>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/80 px-4 py-1.5 text-xs backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {hero.availability}
            </span>
          </div>
        </div>

        <div className="relative mb-8 w-full max-w-xs md:max-w-sm">
          <div
            className="hero-image relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden pill-frame shadow-2xl shadow-charcoal/15 md:max-w-[320px]"
            data-speed="0.9"
          >
            <Image
              src="/images/profile.png"
              alt={`${siteConfig.name}, professional headshot`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 280px, 320px"
            />
          </div>
        </div>

        <div className="hero-subtext mb-6 text-center">
          <p className="font-serif text-2xl text-charcoal md:text-3xl lg:text-4xl">
            {hero.roles[0]}
          </p>
          <p className="mt-1 text-lg text-gold-dark md:text-xl">&</p>
          <p className="font-serif text-2xl text-charcoal md:text-3xl lg:text-4xl">
            {hero.roles[1]}
          </p>
        </div>

        <div className="hero-subtext w-full max-w-5xl">
          <div className="grid items-end gap-8 border-t border-charcoal/10 pt-8 md:grid-cols-[auto_1fr_auto]">
            <button
              type="button"
              onClick={() => scrollToSection("#focus")}
              className="hero-cta flex h-12 w-12 items-center justify-center rounded-lg border border-charcoal/10 bg-white transition-colors hover:border-gold hover:bg-gold/5"
              aria-label="Scroll to focus areas"
            >
              <svg className="h-5 w-5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            <p className="hero-headline max-w-xl text-base leading-relaxed text-charcoal-light md:text-lg">
              {hero.subtext}
            </p>

            <div className="flex flex-wrap gap-6 md:gap-8">
              <div className="text-center md:text-right">
                <p className="font-serif text-4xl text-charcoal">{about.highlights[0].value}</p>
                <p className="text-xs uppercase tracking-wider text-charcoal/50">CGPA</p>
              </div>
              <div className="text-center md:text-right">
                <p className="font-serif text-4xl text-charcoal">{about.highlights[1].value}</p>
                <p className="text-xs uppercase tracking-wider text-charcoal/50">Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-line gold-line mx-auto mt-6 w-24" />
    </section>
  );
}
