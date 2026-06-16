"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { about, siteConfig } from "@/data/portfolio";
import { SplitLetters } from "@/components/ui/SplitLetters";
import { gsap, registerGSAP } from "@/lib/gsap";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".about-heading-char", {
        opacity: 0,
        y: 60,
        rotateX: -40,
        duration: 0.8,
        stagger: 0.015,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink py-24 text-cream md:py-32 lg:py-40"
    >
      <div className="about-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <p className="reveal mb-6 text-xs tracking-[0.28em] text-accent/80 uppercase">
          About
        </p>

        <h2 className="about-heading mb-16 max-w-5xl text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.03em] text-white md:mb-20">
          <span className="block text-cream/40">The developer</span>
          <span className="block">
            <SplitLetters text="BEHIND THE CODE." charClassName="about-heading-char" />
          </span>
        </h2>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-2xl shadow-black/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="/images/profile-collage.png"
                  alt={`${siteConfig.name} — developer portrait collage`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {about.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-sm"
                >
                  <p className="font-serif text-2xl text-accent">{item.value}</p>
                  <p className="text-[10px] tracking-[0.2em] text-cream/45 uppercase">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal space-y-6 lg:col-span-7">
            {about.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 30)}
                className="text-base leading-relaxed text-cream/65 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
              <h3 className="mb-4 font-serif text-xl text-cream">Education</h3>
              <p className="font-medium text-white">{about.education.degree}</p>
              <p className="text-sm text-cream/60">{about.education.institution}</p>
              <p className="mt-1 text-sm text-cream/40">{about.education.period}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
                  CGPA {about.education.cgpa}
                </span>
              </div>
              <p className="mt-4 text-sm text-cream/60">
                <span className="font-medium text-cream/80">Focus:</span>{" "}
                {about.education.focus}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.education.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-cream/60"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
