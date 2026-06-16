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

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-orb", { opacity: 0, scale: 0.85, duration: 1, stagger: 0.12, ease: "power2.out" })
        .from(".hero-meta-row", { opacity: 0, y: -12, duration: 0.5 }, "-=0.85")
        .from(".hero-char", {
          opacity: 0,
          y: 60,
          duration: 0.65,
          stagger: 0.018,
          ease: "power3.out",
        }, "-=0.4")
        .from(".hero-role-char", {
          opacity: 0,
          y: 30,
          duration: 0.55,
          stagger: 0.012,
          ease: "power3.out",
        }, "-=0.35")
        .from(".hero-greeting > *:not(h1)", { opacity: 0, y: 20, duration: 0.5, stagger: 0.06 }, "-=0.3")
        .from(".hero-image", { opacity: 0, y: 30, scale: 0.96, duration: 0.9, ease: "power2.out" }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 }, "-=0.4");

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

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(refreshScroll, 150);
      };

      window.addEventListener("load", refreshScroll);
      window.addEventListener("resize", onResize);

      return () => {
        window.clearTimeout(refreshTimer);
        clearTimeout(resizeTimer);
        window.removeEventListener("load", refreshScroll);
        window.removeEventListener("resize", onResize);
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
