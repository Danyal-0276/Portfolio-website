"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { siteConfig } from "@/data/portfolio";
import { completeIntro, hasSeenIntro } from "@/lib/site-intro";
import { gsap, registerGSAP } from "@/lib/gsap";

export function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useGSAP(
    () => {
      registerGSAP();
      const root = rootRef.current;
      const progress = progressRef.current;
      const counter = counterRef.current;
      if (!root || !progress || !counter) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion || hasSeenIntro()) {
        completeIntro();
        setVisible(false);
        return;
      }

      gsap.set(root, { autoAlpha: 1 });

      const progressState = { value: 0 };

      const updateProgress = () => {
        counter.textContent = `${Math.round(progressState.value)}`;
        gsap.set(progress, {
          scaleX: progressState.value / 100,
          transformOrigin: "left center",
          force3D: true,
        });
      };

      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      updateProgress();

      const introTl = gsap.timeline();
      introTl
        .from(
          ".loader-logo",
          { autoAlpha: 0, scale: 0.82, y: 18, duration: 0.75, ease: "back.out(1.5)" },
        )
        .from(".loader-tagline", { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.35")
        .from(".loader-track", { autoAlpha: 0, y: 8, duration: 0.4 }, "-=0.2");

      const progressTween = gsap.to(progressState, {
        value: 90,
        duration: 1.8,
        ease: "power1.inOut",
        onUpdate: updateProgress,
      });

      const finish = () => {
        progressTween.kill();
        gsap.to(progressState, {
          value: 100,
          duration: 0.35,
          ease: "power2.out",
          onUpdate: updateProgress,
          onComplete: () => {
            completeIntro();

            gsap
              .timeline({
                onComplete: () => setVisible(false),
              })
              .to(".loader-track", {
                autoAlpha: 0,
                y: 8,
                duration: 0.35,
                ease: "power2.inOut",
              })
              .to(
                ".loader-tagline",
                { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" },
                "<",
              )
              .to(
                ".loader-logo",
                {
                  autoAlpha: 0,
                  scale: 1.08,
                  duration: 0.7,
                  ease: "power2.inOut",
                },
                "-=0.1",
              )
              .to(
                root,
                { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" },
                "-=0.45",
              );
          },
        });
      };

      const minDelay = new Promise<void>((resolve) => {
        window.setTimeout(resolve, 1100);
      });

      const loadReady = new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      });

      Promise.all([minDelay, loadReady]).then(finish);

      return () => {
        progressTween.kill();
        introTl.kill();
      };
    },
    { scope: rootRef },
  );

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="loader-root pointer-events-none fixed inset-0 z-[200] flex items-center justify-center"
      aria-hidden={!visible}
      aria-live="polite"
    >
      <div className="loader-content pointer-events-none relative z-10 flex w-full max-w-md flex-col items-center px-8">
        <div className="loader-logo mb-10 bg-transparent">
          <Image
            src={siteConfig.logoPath}
            alt={`${siteConfig.name} logo`}
            width={375}
            height={170}
            priority
            unoptimized
            className="h-24 w-auto bg-transparent sm:h-32 md:h-36"
          />
        </div>

        <p className="loader-tagline mb-10 text-center text-[11px] tracking-[0.32em] text-cream/45 uppercase">
          Loading portfolio
        </p>

        <div className="loader-track w-full max-w-xs">
          <div className="relative h-px w-full overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-gradient-to-r from-accent via-glow to-accent-soft will-change-transform"
            />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-[10px] tracking-[0.28em] text-cream/35 uppercase">
              Please wait
            </span>
            <p className="font-mono text-sm tabular-nums text-accent">
              <span ref={counterRef}>0</span>
              <span className="text-cream/40">%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
