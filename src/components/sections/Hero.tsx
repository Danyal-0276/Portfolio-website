"use client";

import Image from "next/image";
import { hero, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { scrollToSection } from "@/lib/gsap";

export function Hero() {
  return (
    <section
      id="hero"
      className="section-padding flex min-h-screen items-center pt-28"
    >
      <div className="section-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            className="hero-image relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-charcoal/20"
            data-speed="0.85"
          >
            <Image
              src="/images/profile.png"
              alt={`${siteConfig.name} — professional headshot`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
          <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-3xl bg-gold/20" />
        </div>

        <div className="flex flex-col gap-6">
          <p className="hero-greeting text-sm font-medium uppercase tracking-widest text-gold-dark">
            {hero.greeting}
          </p>

          <h1 className="hero-name font-serif text-5xl leading-none text-charcoal md:text-6xl lg:text-7xl">
            {hero.name}
          </h1>

          <div className="hero-line gold-line w-24" />

          <p className="hero-headline text-xl font-medium text-charcoal md:text-2xl">
            {hero.headline}
          </p>

          <p className="hero-subtext max-w-xl text-lg leading-relaxed text-charcoal-light">
            {hero.subtext}
          </p>

          <p className="inline-flex items-center gap-2 text-sm text-charcoal/60">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {hero.availability}
          </p>

          <SocialLinks variant="hero" />

          <div className="hero-cta flex flex-wrap gap-4 pt-2">
            <Button
              variant="primary"
              onClick={() => scrollToSection("#projects")}
            >
              View Projects
            </Button>
            <Button variant="outline" href={siteConfig.resumePath}>
              Download Resume
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#contact")}
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
