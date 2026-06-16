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

      const progressState = { value: 0 };

      const updateProgress = () => {
        const rounded = Math.round(progressState.value);
        counter.textContent = `${rounded}`;
        gsap.set(progress, { scaleX: progressState.value / 100, transformOrigin: "left center" });
      };

      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      updateProgress();

      const introTl = gsap.timeline();
      introTl
        .from(".loader-aurora", { opacity: 0, duration: 0.5 })
        .from(
          ".loader-logo",
          { opacity: 0, scale: 0.82, y: 16, duration: 0.65, ease: "back.out(1.6)" },
          "-=0.2",
        )
        .from(
          ".loader-letter",
          { opacity: 0, y: 24, duration: 0.45, stagger: 0.04, ease: "power3.out" },
          "-=0.35",
        )
        .from(".loader-tagline", { opacity: 0, y: 8, duration: 0.4 }, "-=0.2")
        .from(".loader-track", { opacity: 0, scaleX: 0, duration: 0.45 }, "-=0.15");

      const progressTween = gsap.to(progressState, {
        value: 92,
        duration: 2.4,
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
            const exitTl = gsap.timeline({
              onComplete: () => {
                completeIntro();
                setVisible(false);
              },
            });

            exitTl
              .to(".loader-content", {
                opacity: 0,
                y: -18,
                duration: 0.35,
                ease: "power2.in",
              })
              .to(
                root,
                {
                  yPercent: -100,
                  duration: 0.85,
                  ease: "power4.inOut",
                },
                "-=0.05",
              );
          },
        });
      };

      const minDelay = new Promise<void>((resolve) => {
        window.setTimeout(resolve, 1600);
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

  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div
      ref={rootRef}
      className="loader-root fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#030508]"
      aria-hidden={!visible}
      aria-live="polite"
    >
      <div className="loader-aurora pointer-events-none absolute inset-0">
        <div className="aurora-base-gradient absolute inset-0 opacity-80" />
        <div
          className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45,212,191,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="loader-content relative z-10 flex w-full max-w-sm flex-col items-center px-8">
        <div className="loader-logo mb-8">
          <Image
            src={siteConfig.logoPath}
            alt=""
            width={120}
            height={80}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </div>

        <div className="loader-letters mb-3 flex gap-1 sm:gap-1.5" aria-hidden="true">
          {initials.split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="loader-letter font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              {letter}
            </span>
          ))}
        </div>

        <p className="loader-tagline mb-10 text-center text-[11px] tracking-[0.32em] text-cream/45 uppercase">
          Loading portfolio
        </p>

        <div className="loader-track w-full">
          <div className="relative h-px w-full overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-gradient-to-r from-accent via-glow to-accent-soft"
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
