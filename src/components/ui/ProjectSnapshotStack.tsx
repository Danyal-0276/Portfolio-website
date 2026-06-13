"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  getProjectSnapshotFit,
  isChartSnapshotProject,
  isDarkUiSnapshotProject,
  isMobileSnapshotProject,
  projectSnapshots,
} from "@/data/portfolio";
import { gsap, registerGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ProjectSnapshotStackProps {
  projectId: string;
  className?: string;
}

export function ProjectSnapshotStack({ projectId, className }: ProjectSnapshotStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const visibleRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = projectSnapshots[projectId] ?? [];
  const isMobileFrame = isMobileSnapshotProject(projectId);
  const isChart = isChartSnapshotProject(projectId);
  const isDarkUi = isDarkUiSnapshotProject(projectId);
  const objectFit = getProjectSnapshotFit(projectId);

  useGSAP(
    () => {
      registerGSAP();
      const container = containerRef.current;
      const imageWrap = imageWrapRef.current;
      if (!container || !imageWrap || images.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!prefersReducedMotion) {
        gsap.from(container, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            once: true,
          },
        });
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.25, rootMargin: "100px" },
      );
      observer.observe(container);

      if (images.length <= 1 || prefersReducedMotion) {
        return () => observer.disconnect();
      }

      const cycle = () => {
        if (!visibleRef.current) return;

        const next = (indexRef.current + 1) % images.length;
        gsap
          .timeline()
          .to(imageWrap, {
            opacity: 0,
            scale: 0.98,
            duration: 0.3,
            ease: "power2.in",
          })
          .add(() => {
            indexRef.current = next;
            setActiveIndex(next);
          })
          .to(imageWrap, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          });
      };

      const interval = window.setInterval(cycle, 5000);
      return () => {
        window.clearInterval(interval);
        observer.disconnect();
      };
    },
    { scope: containerRef, dependencies: [projectId, images.length] },
  );

  function goTo(index: number) {
    indexRef.current = index;
    setActiveIndex(index);
  }

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

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto w-full",
        isChart ? "max-w-md" : "max-w-sm",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full",
          isChart ? "aspect-square max-w-[360px]" : "aspect-[4/5] max-w-[320px]",
          isMobileFrame && "max-w-[240px]",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 overflow-hidden shadow-xl shadow-charcoal/15",
            isMobileFrame
              ? "rounded-[2.25rem] border-[10px] border-charcoal bg-charcoal ring-1 ring-white/10"
              : isDarkUi
                ? "rounded-xl border border-cyan-500/20 bg-[#0a0a0a] shadow-[0_0_30px_rgba(14,165,233,0.15)]"
                : "rounded-xl border border-charcoal/15 bg-white",
          )}
        >
          {isMobileFrame && (
            <div className="absolute top-0 right-0 left-0 z-20 flex justify-center pt-2">
              <div className="h-1.5 w-16 rounded-full bg-black/40" />
            </div>
          )}

          {!isMobileFrame && !isDarkUi && (
            <div className="relative z-10 flex items-center gap-1.5 border-b border-charcoal/10 bg-cream px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
          )}

          {isDarkUi && (
            <div className="relative z-10 flex items-center gap-1.5 border-b border-cyan-500/10 bg-[#111] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-400/60" />
            </div>
          )}

          <div
            ref={imageWrapRef}
            className={cn(
              "relative w-full",
              isMobileFrame
                ? "h-full pt-5"
                : isChart || isDarkUi
                  ? "h-[calc(100%-2.25rem)]"
                  : "h-[calc(100%-2.25rem)]",
              isDarkUi && "bg-black",
            )}
          >
            <Image
              src={images[activeIndex]}
              alt={`${projectId} project preview ${activeIndex + 1}`}
              fill
              className={cn(
                objectFit === "contain" ? "object-contain p-2" : "object-cover object-top",
              )}
              sizes="(max-width: 768px) 280px, 360px"
              quality={75}
              loading={activeIndex === 0 ? "eager" : "lazy"}
            />
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 px-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show preview ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-charcoal/20 hover:bg-charcoal/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
