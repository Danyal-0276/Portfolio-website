"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { certifications } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGSAP();
      const cards = gsap.utils.toArray<HTMLElement>(".cert-card", sectionRef.current);
      if (cards.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 48 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.15,
            ease: "power3.out",
            overwrite: true,
          });
        },
        start: "top 88%",
        once: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section-padding section-aurora relative overflow-hidden text-cream"
    >
      <div className="section-container relative">
        <SectionHeading
          dark
          label="Certifications"
          title="Verified credentials in AI & agents"
          description="Professional certificates from Google and Hugging Face covering AI fundamentals and agent development."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="cert-card group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md transition-colors duration-300 hover:border-accent/40"
            >
              <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-white/5 to-accent/5 sm:min-h-[260px]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} certificate from ${cert.issuer}`}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 540px"
                    unoptimized
                  />
                </div>
              </div>

              <div className="space-y-3 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                    {cert.issuer}
                  </span>
                  <span className="text-xs text-cream/45">{cert.date}</span>
                </div>

                <h3 className="font-display text-xl leading-snug text-white">{cert.title}</h3>
                <p className="text-sm leading-relaxed text-cream/60">{cert.description}</p>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-soft"
                    data-cursor="view"
                  >
                    Verify certificate
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
