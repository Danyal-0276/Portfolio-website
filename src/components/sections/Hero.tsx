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
      className="hero-dark relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-24 text-cream"
    >
      {/* Subtle grid + golden glow */}
      <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-[30%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(237,179,60,0.35) 0%, rgba(237,179,60,0.08) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col px-6 md:px-12">
        {/* Large name behind portrait */}
        <div
          className="hero-name-bg pointer-events-none absolute inset-x-0 top-[14%] z-10 flex flex-col items-center select-none md:top-[16%]"
          aria-hidden="true"
        >
          <span className="hero-title-line text-[clamp(2.8rem,11vw,7.5rem)] leading-[0.9] font-bold tracking-tighter text-white/[0.07]">
            {nameParts[0]}
          </span>
          <span className="hero-title-line -mt-1 text-[clamp(2.8rem,11vw,7.5rem)] leading-[0.9] font-bold tracking-tighter text-white/[0.07] md:-mt-2">
            {nameParts.slice(1).join(" ")}
          </span>
        </div>

        {/* Role text flanking the portrait */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[38%] z-20 hidden items-center justify-between px-[4%] md:flex lg:px-[8%]"
          aria-hidden="true"
        >
          <span className="hero-role-left text-[clamp(1.6rem,5vw,4rem)] font-bold tracking-tight text-white/25">
            {hero.roleLineLeft}
          </span>
          <span className="hero-role-right text-[clamp(1.6rem,5vw,4rem)] font-bold tracking-tight text-white/25">
            {hero.roleLineRight}
          </span>
        </div>

        {/* Merged portrait */}
        <div className="relative z-30 mx-auto mt-[8vh] flex w-full max-w-[min(340px,78vw)] flex-1 flex-col items-center justify-start md:mt-[10vh]">
          <div className="hero-image relative aspect-[3/4] w-full">
            <Image
              src="/images/profile.png"
              alt={`${siteConfig.name}, professional headshot`}
              fill
              priority
              className="hero-portrait object-cover object-top"
              sizes="(max-width: 768px) 78vw, 340px"
            />
            {/* Bottom fade merges photo into dark background */}
            <div className="hero-portrait-fade pointer-events-none absolute inset-0" aria-hidden="true" />
          </div>

          <p className="hero-role-mobile mt-4 text-center text-sm font-semibold tracking-[0.25em] text-white/40 uppercase md:hidden">
            {hero.roleLineLeft} · {hero.roleLineRight}
          </p>
          <p className="mt-1 text-center text-xs tracking-[0.2em] text-gold/70 uppercase md:hidden">
            {hero.roleLineSecondary}
          </p>
        </div>

        {/* Bottom row: status, bio, CTA */}
        <div className="hero-subtext relative z-40 mx-auto grid w-full max-w-6xl gap-8 pb-10 md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-6">
          <div className="hero-greeting space-y-4 md:max-w-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-cream/80 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {hero.availability}
            </span>
            <p className="hero-headline text-sm leading-relaxed text-cream/60 md:text-base">
              {hero.intro}
            </p>
          </div>

          <div className="hidden text-center md:block">
            <p className="text-xs tracking-[0.3em] text-gold/80 uppercase">{hero.roleLineSecondary}</p>
          </div>

          <div className="hero-cta flex flex-wrap items-center gap-3 md:justify-end">
            <Button
              variant="primary"
              onClick={() => scrollToSection("#contact")}
              className="bg-cream text-charcoal hover:bg-gold"
            >
              Schedule Call
            </Button>
            <Button
              variant="outline"
              href={siteConfig.resumePath}
              className="border-white/25 text-cream hover:border-gold hover:text-gold"
            >
              View Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
