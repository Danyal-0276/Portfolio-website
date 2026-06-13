"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { projectSnapshots } from "@/data/portfolio";
import { gsap, registerGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const MOBILE_PROJECTS = new Set(["trak", "duolingo"]);

interface ProjectSnapshotStackProps {
  projectId: string;
  className?: string;
}

export function ProjectSnapshotStack({ projectId, className }: ProjectSnapshotStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = projectSnapshots[projectId] ?? [];
  const isMobileFrame = MOBILE_PROJECTS.has(projectId);

  useGSAP(
    () => {
      registerGSAP();
      if (!containerRef.current || images.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const cards = gsap.utils.toArray<HTMLElement>(".snapshot-card", containerRef.current);

      if (!prefersReducedMotion) {
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          rotation: (i) => (i - 1) * 8,
          scale: 0.85,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });

        gsap.to(containerRef.current, {
          y: -14,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (images.length <= 1 || prefersReducedMotion) return;

      const cycle = () => {
        const next = (activeIndex + 1) % images.length;
        const currentCard = cards[activeIndex % cards.length];
        if (!currentCard) return;

        gsap.timeline()
          .to(currentCard, {
            x: 90,
            y: -40,
            rotation: 12,
            opacity: 0,
            scale: 0.92,
            duration: 0.55,
            ease: "power2.in",
          })
          .add(() => setActiveIndex(next))
          .fromTo(
            cards[next % cards.length],
            { x: -60, y: 30, rotation: -10, opacity: 0, scale: 0.9 },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: "back.out(1.4)",
            },
          );
      };

      const interval = window.setInterval(cycle, 3800);
      return () => window.clearInterval(interval);
    },
    { scope: containerRef, dependencies: [projectId, images.length] },
  );

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex aspect-[4/5] items-center justify-center rounded-3xl bg-gradient-to-br from-gold/20 to-charcoal/5",
          className,
        )}
      >
        <p className="text-sm text-charcoal/40">Preview coming soon</p>
      </div>
    );
  }

  const displayImages =
    images.length >= 3
      ? [
          images[(activeIndex + 2) % images.length],
          images[(activeIndex + 1) % images.length],
          images[activeIndex],
        ]
      : images;

  return (
    <div ref={containerRef} className={cn("relative mx-auto w-full max-w-sm", className)}>
      {/* Glow */}
      <div
        className="absolute inset-4 -z-10 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, #edb33c 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative mx-auto aspect-[4/5] w-full",
          isMobileFrame ? "max-w-[240px]" : "max-w-[320px]",
        )}
      >
        {/* Device frame */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden bg-charcoal shadow-2xl shadow-charcoal/30",
            isMobileFrame
              ? "rounded-[2.25rem] border-[10px] border-charcoal ring-1 ring-white/10"
              : "rounded-xl border border-charcoal/20 bg-white",
          )}
        >
          {isMobileFrame && (
            <div className="absolute top-0 right-0 left-0 z-20 flex justify-center pt-2">
              <div className="h-1.5 w-16 rounded-full bg-black/40" />
            </div>
          )}

          {!isMobileFrame && (
            <div className="flex items-center gap-1.5 border-b border-charcoal/10 bg-cream px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
          )}

          <div
            className={cn(
              "relative h-full w-full",
              isMobileFrame ? "pt-4" : "pt-0",
              !isMobileFrame && "h-[calc(100%-2rem)]",
            )}
          >
            {displayImages.map((src, i) => {
              const isFront = i === displayImages.length - 1;
              const depth = i - (displayImages.length - 1);

              return (
                <div
                  key={`${src}-${i}`}
                  className="snapshot-card absolute inset-2 overflow-hidden rounded-lg bg-charcoal/5 shadow-lg"
                  style={{
                    zIndex: 10 + i,
                    transform: isFront
                      ? undefined
                      : `translate(${depth * 14}px, ${depth * 18}px) rotate(${depth * 4}deg) scale(${1 + depth * 0.04})`,
                    opacity: isFront ? 1 : 0.55 + i * 0.15,
                  }}
                >
                  <Image
                    src={src}
                    alt={`${projectId} screenshot ${i + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 240px, 320px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show screenshot ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-charcoal/20",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
