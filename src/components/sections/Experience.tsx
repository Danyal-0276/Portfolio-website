"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { experience } from "@/data/portfolio";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { gsap, registerGSAP } from "@/lib/gsap";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();
      const rows = gsap.utils.toArray<HTMLElement>(".timeline-row", sectionRef.current);
      if (rows.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(rows, {
        x: -40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="experience" ref={sectionRef} className="section-aurora px-6 py-20 text-cream md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SplitHeading
          solid="CAREER"
          outline="TIMELINE"
          className="mb-16 text-[clamp(2rem,6vw,4rem)] leading-none"
        />

        <div className="space-y-0 divide-y divide-white/10 border-t border-white/10">
          {experience.map((job) => (
            <article
              key={job.id}
              className="timeline-row grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12"
            >
              <div className="md:col-span-2">
                <p className="text-sm tracking-wide text-cream/40">{job.period}</p>
              </div>

              <div className="md:col-span-7">
                <h3 className="text-lg font-bold tracking-wide text-white uppercase md:text-xl">
                  {job.role}
                </h3>
                <ul className="mt-4 space-y-2">
                  {job.description.map((item) => (
                    <li key={item.slice(0, 40)} className="text-sm leading-relaxed text-cream/60 md:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-cream/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 md:text-right">
                <p className="text-sm font-medium tracking-[0.15em] text-cream/50 uppercase">
                  {job.company}
                </p>
                <p className="mt-1 text-xs text-cream/35">{job.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
