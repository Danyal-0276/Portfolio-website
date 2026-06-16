"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
  isChartSnapshotProject,
  isDarkUiSnapshotProject,
  isMobileSnapshotProject,
  projectSnapshots,
} from "@/data/portfolio";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ProjectSnapshotStackProps {
  projectId: string;
  className?: string;
  disableScrollReveal?: boolean;
  /** Flat, contained layout for the mobile project section cards */
  compact?: boolean;
}

const STACK_OFFSETS = [
  { x: -14, y: 10, rotate: -4, scale: 0.96 },
  { x: 12, y: 6, rotate: 3, scale: 0.98 },
];

const STACK_OFFSETS_COMPACT = [
  { x: -6, y: 5, rotate: -2, scale: 0.98 },
  { x: 5, y: 4, rotate: 2, scale: 0.99 },
];

function getStackOffsets(compact: boolean) {
  return compact ? STACK_OFFSETS_COMPACT : STACK_OFFSETS;
}

function getSlideDistance(compact: boolean) {
  return compact ? 36 : 90;
}

export function ProjectSnapshotStack({
  projectId,
  className,
  disableScrollReveal = false,
  compact = false,
}: ProjectSnapshotStackProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const stackRef = useRef<(HTMLDivElement | null)[]>([]);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const visibleRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = projectSnapshots[projectId] ?? [];
  const isMobileFrame = isMobileSnapshotProject(projectId);
  const isChart = isChartSnapshotProject(projectId);
  const isDarkUi = isDarkUiSnapshotProject(projectId);

  const animateTo = useCallback(
    (nextIndex: number) => {
      const viewport = viewportRef.current;
      if (!viewport || animatingRef.current || nextIndex === indexRef.current) return;

      const current = slidesRef.current[indexRef.current];
      const next = slidesRef.current[nextIndex];
      if (!current || !next) return;

      const compactLayout = compact || window.matchMedia("(max-width: 639px)").matches;
      const slideDistance = getSlideDistance(compactLayout);
      const offsets = getStackOffsets(compactLayout);

      animatingRef.current = true;

      if (compactLayout) {
        gsap
          .timeline({
            onComplete: () => {
              indexRef.current = nextIndex;
              setActiveIndex(nextIndex);
              animatingRef.current = false;
              gsap.set(slidesRef.current, { zIndex: 0, pointerEvents: "none", clearProps: "transform" });
              gsap.set(next, { zIndex: 2, pointerEvents: "auto", clearProps: "transform" });
            },
          })
          .to(current, { opacity: 0, duration: 0.25, ease: "power2.inOut" })
          .set(current, { pointerEvents: "none" })
          .fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, "-=0.1");
        return;
      }

      gsap
        .timeline({
          onComplete: () => {
            indexRef.current = nextIndex;
            setActiveIndex(nextIndex);
            animatingRef.current = false;
            gsap.set(slidesRef.current, { zIndex: 0, pointerEvents: "none" });
            gsap.set(next, { zIndex: 2, pointerEvents: "auto" });
          },
        })
        .to(current, {
          x: -slideDistance,
          rotateY: compactLayout ? -10 : -18,
          opacity: 0,
          scale: 0.92,
          duration: 0.45,
          ease: "power3.in",
        })
        .fromTo(
          next,
          { x: slideDistance, rotateY: compactLayout ? 10 : 18, opacity: 0, scale: 0.92 },
          { x: 0, rotateY: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
          "-=0.15",
        );

      stackRef.current.forEach((layer, i) => {
        if (!layer) return;
        const offset = offsets[i % offsets.length];
        gsap.to(layer, {
          x: offset.x,
          y: offset.y,
          rotate: offset.rotate,
          scale: offset.scale,
          duration: 0.5,
          ease: "power3.out",
        });
      });
    },
    [compact],
  );

  useGSAP(
    () => {
      registerGSAP();
      const stage = stageRef.current;
      const frame = frameRef.current;
      const viewport = viewportRef.current;
      if (!stage || !frame || !viewport || images.length === 0) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const compactLayout = compact || window.matchMedia("(max-width: 639px)").matches;
      const offsets = getStackOffsets(compactLayout);

      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;
        gsap.set(slide, {
          x: 0,
          rotateY: 0,
          opacity: i === 0 ? 1 : 0,
          scale: 1,
          zIndex: i === 0 ? 2 : 0,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      if (!prefersReducedMotion) {
        if (compactLayout) {
          gsap.set(frame, { clipPath: "none", clearProps: "transform" });
        } else {
          const playStackEntrance = () => {
            if (entranceTl.progress() > 0) return;
            entranceTl.play();
          };

          gsap.set(frame, { clipPath: "circle(0% at 50% 50%)" });
          gsap.set(stackRef.current, { opacity: 0, y: 30, rotate: 0 });

          const entranceTl = gsap.timeline({ paused: true });
          entranceTl
            .to(frame, {
              clipPath: "circle(150% at 50% 50%)",
              duration: 1,
              ease: "power3.inOut",
            })
            .to(
              stackRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=0.5",
            )
            .from(
              slidesRef.current[0],
              { scale: 0.88, opacity: 0, duration: 0.7, ease: "back.out(1.2)" },
              "-=0.35",
            );

          stackRef.current.forEach((layer, i) => {
            if (!layer) return;
            const offset = offsets[i % offsets.length];
            entranceTl.to(
              layer,
              {
                x: offset.x,
                y: offset.y,
                rotate: offset.rotate,
                scale: offset.scale,
                duration: 0.55,
                ease: "back.out(1.4)",
              },
              "-=0.45",
            );
          });

          if (disableScrollReveal) {
            gsap.set(frame, { clipPath: "circle(150% at 50% 50%)" });
            gsap.set(stackRef.current, { opacity: 1, y: 0 });
            stackRef.current.forEach((layer, i) => {
              if (!layer) return;
              const offset = offsets[i % offsets.length];
              gsap.set(layer, {
                x: offset.x,
                y: offset.y,
                rotate: offset.rotate,
                scale: offset.scale,
              });
            });
            gsap.from(frame, { scale: 0.94, duration: 0.7, ease: "power3.out", clearProps: "transform" });
            gsap.fromTo(
              slidesRef.current[0],
              { scale: 0.92, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.65,
                ease: "back.out(1.2)",
                clearProps: "opacity,transform",
              },
            );
          } else {
            ScrollTrigger.create({
              trigger: stage,
              start: "top 88%",
              once: true,
              onEnter: playStackEntrance,
            });
          }
        }

        const onEnterFrame = () => {
          if (images.length <= 1 || compactLayout) return;
          stackRef.current.forEach((layer, i) => {
            if (!layer) return;
            const offset = offsets[i % offsets.length];
            gsap.to(layer, {
              x: offset.x * 1.8,
              y: offset.y * 1.4,
              rotate: offset.rotate * 1.5,
              duration: 0.4,
              ease: "power2.out",
            });
          });
          gsap.to(frame, { y: -4, duration: 0.35, ease: "power2.out" });
        };

        const onLeaveFrame = () => {
          if (compactLayout) return;
          stackRef.current.forEach((layer, i) => {
            if (!layer) return;
            const offset = offsets[i % offsets.length];
            gsap.to(layer, {
              x: offset.x,
              y: offset.y,
              rotate: offset.rotate,
              duration: 0.4,
              ease: "power2.out",
            });
          });
          gsap.to(frame, { y: 0, duration: 0.35, ease: "power2.out" });
        };

        if (!compactLayout) {
          frame.addEventListener("mouseenter", onEnterFrame);
          frame.addEventListener("mouseleave", onLeaveFrame);
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            visibleRef.current = entry.isIntersecting;
          },
          { threshold: 0.2, rootMargin: "80px" },
        );
        observer.observe(stage);

        let interval: ReturnType<typeof setInterval> | undefined;
        if (images.length > 1 && !compactLayout) {
          interval = setInterval(() => {
            if (!visibleRef.current || animatingRef.current) return;
            animateTo((indexRef.current + 1) % images.length);
          }, 5500);
        }

        return () => {
          if (!compactLayout) {
            frame.removeEventListener("mouseenter", onEnterFrame);
            frame.removeEventListener("mouseleave", onLeaveFrame);
          }
          observer.disconnect();
          if (interval) clearInterval(interval);
        };
      } else {
        gsap.set(frame, { clipPath: "none" });
      }
    },
    { scope: stageRef, dependencies: [projectId, images.length, disableScrollReveal, compact, animateTo] },
  );

  function goTo(index: number) {
    animateTo(index);
  }

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex min-h-[240px] items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-charcoal/5",
          className,
        )}
      >
        <p className="text-sm text-charcoal/40">Preview coming soon</p>
      </div>
    );
  }

  const stackLayers = !compact && images.length > 1 ? images.slice(1, 3) : [];

  return (
    <div
      ref={stageRef}
      className={cn(
        "snapshot-stage relative mx-auto w-full min-w-0 max-w-full",
        !compact && "lg:max-w-lg",
        compact && "overflow-hidden",
        className,
      )}
    >
      {/* Deck layers behind the frame */}
      {stackLayers.map((src, i) => (
        <div
          key={src}
          ref={(el) => {
            stackRef.current[i] = el;
          }}
          className="snapshot-stack-layer pointer-events-none absolute inset-x-1 top-2 h-[calc(100%-8px)] rounded-2xl border border-charcoal/10 bg-white shadow-lg sm:inset-x-3 sm:top-3 sm:h-[calc(100%-12px)] md:inset-x-4 md:top-4"
          style={{ zIndex: i }}
          aria-hidden="true"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[inherit] p-2">
            <Image
              src={src}
              alt=""
              fill
              className="object-contain object-center opacity-40"
              sizes="400px"
              quality={60}
              loading="lazy"
            />
          </div>
        </div>
      ))}

      {/* Main frame */}
      <div
        ref={frameRef}
        className={cn(
          "snapshot-frame relative z-10 w-full max-w-full overflow-hidden shadow-2xl shadow-charcoal/20",
          compact && "shadow-lg shadow-black/20",
          isMobileFrame
            ? "rounded-[1.75rem] border-[6px] border-charcoal bg-charcoal ring-1 ring-white/10 sm:rounded-[2rem] sm:border-[8px]"
            : isDarkUi
              ? "rounded-2xl border border-cyan-500/25 bg-[#0a0a0a] shadow-[0_0_40px_rgba(14,165,233,0.12)]"
              : "rounded-2xl border border-charcoal/10 bg-cream",
        )}
      >
        {isMobileFrame && (
          <div className="relative z-20 flex justify-center border-b border-black/20 bg-charcoal py-2">
            <div className="h-1.5 w-14 rounded-full bg-black/50" />
          </div>
        )}

        {!isMobileFrame && !isDarkUi && (
          <div className="relative z-20 flex items-center gap-1.5 border-b border-charcoal/8 bg-white/80 px-3 py-2 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-glow/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
            <span className="ml-2 truncate text-[10px] text-charcoal/35">{projectId}.dev</span>
          </div>
        )}

        {isDarkUi && (
          <div className="relative z-20 flex items-center gap-1.5 border-b border-cyan-500/10 bg-[#111] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400/60" />
          </div>
        )}

        <div
          ref={viewportRef}
          className={cn(
            "snapshot-viewport relative w-full max-w-full overflow-hidden",
            isMobileFrame
              ? "aspect-[9/19] w-full max-h-[min(380px,56vh)] p-2 pt-0 sm:max-h-[420px] sm:p-3"
              : isChart
                ? "aspect-square w-full max-h-[min(300px,88vw)]"
                : "aspect-[16/10] w-full",
            isDarkUi && "bg-black",
            !isMobileFrame && !isDarkUi && "bg-white",
          )}
          style={{ perspective: "900px" }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              ref={(el) => {
                slidesRef.current[i] = el;
              }}
              className="snapshot-slide absolute inset-0 flex items-center justify-center p-3 md:p-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`${projectId} preview ${i + 1}`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 90vw, 480px"
                  quality={80}
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 px-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show preview ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "group flex items-center gap-1.5 rounded-full px-2 py-1 transition-all duration-300",
                i === activeIndex ? "bg-white/10" : "hover:bg-white/5",
              )}
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "h-2 w-2 bg-accent"
                    : "h-1.5 w-1.5 bg-white/25 group-hover:bg-white/45",
                )}
              />
              <span
                className={cn(
                  "text-[10px] tabular-nums",
                  i === activeIndex ? "text-accent-soft" : "text-cream/40",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
