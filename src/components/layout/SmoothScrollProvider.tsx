"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGSAP, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

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
        return;
      }

      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.15,
        effects: true,
        smoothTouch: 0.1,
      });

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-image", { opacity: 0, scale: 0.95, duration: 1 })
        .from(".hero-greeting", { opacity: 0, y: 20, duration: 0.6 }, "-=0.6")
        .from(".hero-name", { opacity: 0, y: 30, duration: 0.7 }, "-=0.4")
        .from(".hero-headline", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-subtext", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(".hero-social", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".hero-line", { scaleX: 0, duration: 0.8, transformOrigin: "left" }, "-=0.4");

      ScrollTrigger.batch(".reveal", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          });
        },
        start: "top 85%",
        once: true,
      });

      ScrollTrigger.batch(".project-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: 50,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
        start: "top 90%",
        once: true,
      });

      ScrollTrigger.batch(".skill-badge", {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            stagger: 0.04,
            ease: "back.out(1.4)",
            overwrite: true,
          });
        },
        start: "top 90%",
        once: true,
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        smoother?.kill();
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
