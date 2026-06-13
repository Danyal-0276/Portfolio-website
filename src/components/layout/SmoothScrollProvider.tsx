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
        gsap.set(".reveal, .project-card:not(.showcase-panel)", { opacity: 1, y: 0 });
        return;
      }

      gsap.set(".project-card:not(.showcase-panel)", { opacity: 0, y: 40 });

      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 0.9,
        effects: false,
        smoothTouch: 0.05,
      });

      const refreshScroll = () => ScrollTrigger.refresh(true);
      refreshScroll();
      requestAnimationFrame(refreshScroll);

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-greeting", { opacity: 0, y: 24, duration: 0.7 })
        .from(".hero-title-line", { opacity: 0, y: 50, duration: 0.9, stagger: 0.12 }, "-=0.4")
        .from(".hero-role-outline", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
        .from(".hero-image", { opacity: 0, scale: 0.94, duration: 1.1, ease: "power2.out" }, "-=0.7")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, "-=0.5");

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

      ScrollTrigger.create({
        trigger: "#projects-grid",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(".project-card:not(.showcase-panel)", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
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

      window.addEventListener("load", refreshScroll);
      window.addEventListener("resize", refreshScroll);

      return () => {
        window.removeEventListener("load", refreshScroll);
        window.removeEventListener("resize", refreshScroll);
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
