"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGSAP, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import { runAfterIntro } from "@/lib/site-intro";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGSAP();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
        gsap.set(
          ".hero-meta-row, .hero-char, .hero-role-char, .hero-headline, .hero-cta, .hero-image, .hero-role-title",
          { opacity: 1, clearProps: "transform" },
        );
        document.documentElement.classList.remove("is-loading");
        return;
      }

      gsap.set(
        ".hero-meta-row, .hero-char, .hero-role-char, .hero-headline, .hero-cta, .hero-image, .hero-role-title",
        { opacity: 0 },
      );

      let smoother: ScrollSmoother | null = null;
      let teardownExperience: (() => void) | undefined;

      const initExperience = () => {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.1,
          effects: false,
          smoothTouch: 0.05,
        });

        const refreshScroll = () => {
          ScrollTrigger.refresh(true);
          smoother?.refresh();
        };

        requestAnimationFrame(refreshScroll);
        const refreshTimer = window.setTimeout(refreshScroll, 400);
        let resizeTimer: ReturnType<typeof window.setTimeout>;

        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl
          .from(".hero-meta-row", { opacity: 0, y: -12, duration: 0.5 })
          .from(
            ".hero-char",
            {
              opacity: 0,
              y: 80,
              duration: 0.7,
              stagger: 0.02,
              ease: "power3.out",
            },
            "-=0.2",
          )
          .from(
            ".hero-role-char",
            {
              opacity: 0,
              y: 50,
              duration: 0.6,
              stagger: 0.015,
              ease: "power3.out",
            },
            "-=0.35",
          )
          .from(".hero-role-title", { opacity: 0, y: 12, duration: 0.55 }, "-=0.25")
          .from(".hero-headline", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
          .from(
            ".hero-cta",
            { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 },
            "-=0.15",
          )
          .from(
            ".hero-image",
            { opacity: 0, y: 28, scale: 0.96, duration: 0.9, ease: "power2.out" },
            "-=0.55",
          );

        ScrollTrigger.batch(".reveal", {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            });
          },
          start: "top 85%",
          once: true,
        });

        const onResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(refreshScroll, 150);
        };

        window.addEventListener("load", refreshScroll);
        window.addEventListener("resize", onResize);

        teardownExperience = () => {
          window.clearTimeout(refreshTimer);
          clearTimeout(resizeTimer);
          window.removeEventListener("load", refreshScroll);
          window.removeEventListener("resize", onResize);
          smoother?.kill();
        };
      };

      const cleanupIntro = runAfterIntro(initExperience);

      return () => {
        cleanupIntro();
        teardownExperience?.();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
