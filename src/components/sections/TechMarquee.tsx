"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { techMarquee } from "@/data/portfolio";
import { gsap, registerGSAP } from "@/lib/gsap";

const MARQUEE_DURATION = 65;

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...techMarquee, ...techMarquee];

  useGSAP(
    () => {
      registerGSAP();
      const track = trackRef.current;
      if (!track) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        track.style.transform = "none";
        return;
      }

      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: MARQUEE_DURATION,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Technologies I work with"
      className="border-y border-white/10 bg-white/[0.04] py-5 backdrop-blur-md md:py-6"
    >
      <div className="overflow-hidden">
        <div ref={trackRef} className="marquee-track flex w-max items-center gap-14 px-6 md:gap-16">
          {items.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="flex shrink-0 items-center gap-3 text-white/45 transition-colors duration-300 hover:text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
              <span className="whitespace-nowrap text-sm font-medium tracking-wide uppercase md:text-base">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
