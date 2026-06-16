"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { statsBand } from "@/data/portfolio";
import { gsap, registerGSAP } from "@/lib/gsap";

export function StatsBand() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();
      const items = gsap.utils.toArray<HTMLElement>(".stat-item", sectionRef.current);
      if (items.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Key statistics"
      className="mesh-band px-6 py-14 text-ink md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
        {statsBand.map((stat) => (
          <div key={stat.label} className="stat-item text-center md:text-left">
            <p className="text-[clamp(2.5rem,6vw,4rem)] leading-none font-bold tracking-tight">
              {stat.value}
            </p>
            <p className="mt-2 text-[10px] tracking-[0.22em] text-ink/70 uppercase md:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
