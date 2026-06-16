"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { about } from "@/data/portfolio";
import { SplitHeading } from "@/components/ui/SplitHeading";
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

      gsap.from(".about-block", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
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
      className="relative overflow-hidden section-aurora py-20 text-cream md:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="about-block mb-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[clamp(4rem,12vw,8rem)] leading-none font-bold tracking-[-0.04em] text-white uppercase">
              About
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px w-12 bg-accent" />
              <span className="text-xs tracking-[0.22em] text-accent uppercase">
                01 / The drive
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[clamp(1.5rem,3.5vw,2.25rem)] leading-snug font-medium tracking-tight text-white">
              I build production software and research AI systems, craft isn&apos;t a shortcut,
              it&apos;s the path.
            </p>
            <p className="mt-6 text-base leading-relaxed text-cream/60 md:text-lg">
              {about.bio[0]}
            </p>
          </div>
        </div>

        <div className="about-block max-w-3xl space-y-6 lg:max-w-4xl">
          {about.bio.slice(1).map((paragraph) => (
            <p
              key={paragraph.slice(0, 30)}
              className="text-base leading-relaxed text-cream/65 md:text-lg"
            >
              {paragraph}
            </p>
          ))}

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <SplitHeading
              solid="EDUCATION"
              outline="DETAILS"
              className="mb-4 text-xl md:text-2xl"
            />
            <p className="font-medium text-white">{about.education.degree}</p>
            <p className="text-sm text-cream/60">{about.education.institution}</p>
            <p className="mt-1 text-sm text-cream/40">{about.education.period}</p>
            <span className="mt-4 inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
              CGPA {about.education.cgpa}
            </span>
            <p className="mt-4 text-sm text-cream/60">{about.education.focus}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
