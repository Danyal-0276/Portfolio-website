"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGSAP, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";
import { runAfterIntro, hasSeenIntro } from "@/lib/site-intro";

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

      const heroTargets =
        ".hero-meta-row, .hero-char, .hero-role-char, .hero-headline, .hero-cta, .hero-image, .hero-role-title";

      const introAlreadyDone =
        hasSeenIntro() || document.documentElement.classList.contains("is-ready");

      if (!introAlreadyDone) {
        gsap.set(heroTargets, { opacity: 0 });
      }

      let smoother: ScrollSmoother | null = null;
      let teardownExperience: (() => void) | undefined;

      const initExperience = () => {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 0.85,
          effects: false,
          smoothTouch: 0.04,
        });

        const refreshScroll = () => {
          ScrollTrigger.refresh(true);
          smoother?.refresh();
        };

        requestAnimationFrame(refreshScroll);
        const refreshTimer = window.setTimeout(refreshScroll, 400);
        let resizeTimer: ReturnType<typeof window.setTimeout>;

        if (!introAlreadyDone) {
          const heroTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              gsap.set(heroTargets, { clearProps: "opacity,transform" });
            },
          });

          heroTl
            .fromTo(
              ".hero-meta-row",
              { autoAlpha: 0, y: -12 },
              { autoAlpha: 1, y: 0, duration: 0.5, force3D: true },
            )
            .fromTo(
              ".hero-char",
              { autoAlpha: 0, y: 80 },
              { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.018, force3D: true },
              "-=0.2",
            )
            .fromTo(
              ".hero-role-char",
              { autoAlpha: 0, y: 50 },
              { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.012, force3D: true },
              "-=0.35",
            )
            .fromTo(
              ".hero-role-title",
              { autoAlpha: 0, y: 12 },
              { autoAlpha: 1, y: 0, duration: 0.5, force3D: true },
              "-=0.25",
            )
            .fromTo(
              ".hero-headline",
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.45, force3D: true },
              "-=0.2",
            )
            .fromTo(
              ".hero-cta button",
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, force3D: true },
              "-=0.15",
            )
            .fromTo(
              ".hero-image",
              { autoAlpha: 0, y: 28, scale: 0.96 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power2.out", force3D: true },
              "-=0.55",
            );
        } else {
          gsap.set(heroTargets, { opacity: 1, clearProps: "transform" });
        }

        ScrollTrigger.batch(".reveal", {
          onEnter: (elements) => {
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: "auto",
              force3D: true,
            });
          },
          start: "top 88%",
          once: true,
        });

        const onResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(refreshScroll, 280);
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
