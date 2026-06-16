"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { featuredProject, getProjectThumbnail } from "@/data/portfolio";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { gsap, registerGSAP } from "@/lib/gsap";

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnail = getProjectThumbnail(featuredProject.id);

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".featured-content > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      if (image) {
        gsap.fromTo(
          image,
          { x: 80, opacity: 0, scale: 0.94 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          },
        );

        gsap.to(image, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="section-padding section-aurora px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <SplitHeading
          solid="FEATURED"
          outline="WORK"
          className="mb-12 text-[clamp(2rem,6vw,4rem)] leading-none"
        />

        <div className="featured-card glass-panel-strong overflow-hidden p-6 md:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="featured-content">
              <p className="mb-4 text-xs tracking-[0.22em] text-cream/40 uppercase">
                {featuredProject.category} · {featuredProject.tech.slice(0, 3).join(", ")}
              </p>
              <h3 className="mb-5 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight font-bold tracking-tight text-white">
                {featuredProject.title}
              </h3>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-cream/60">
                {featuredProject.description}
              </p>

              <div className="mb-8 flex flex-wrap gap-10">
                {featuredProject.metrics?.map((m) => (
                  <div key={m.label}>
                    <p className="text-3xl font-bold text-white md:text-4xl">{m.value}</p>
                    <p className="mt-1 text-[10px] tracking-[0.2em] text-cream/40 uppercase">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={featuredProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-white uppercase transition-colors hover:text-accent"
                data-cursor="view"
              >
                View case study
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-2xl shadow-black/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-glow/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="relative aspect-[16/10] w-full">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={`${featuredProject.title} preview`}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-cream/30">
                    Preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
