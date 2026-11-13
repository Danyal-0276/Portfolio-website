"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "../_components/portfolio/navigation";

export function useActiveSection<T extends HTMLElement>(
  root: RefObject<T | null>,
) {
  const [activeSection, setActiveSection] = useState("");
  const pendingNavigation = useRef<string | null>(null);

  useEffect(() => {
    const sections = Array.from(
      root.current?.querySelectorAll<HTMLElement>("main > section[id]") ?? [],
    );
    const header = root.current?.querySelector<HTMLElement>(".site-header");
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = (header?.getBoundingClientRect().bottom ?? 90) + 40;
      const pending = sections.find(
        (section) => `#${section.id}` === pendingNavigation.current,
      );
      if (pending) {
        const bounds = pending.getBoundingClientRect();
        if (bounds.top > marker || bounds.bottom <= marker) return;
        pendingNavigation.current = null;
      }
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
      const href = atBottom ? "#contact" : current ? `#${current.id}` : "";
      setActiveSection(
        NAV_LINKS.some((link) => link.href === href) ? href : "",
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const interrupt = () => {
      pendingNavigation.current = null;
      schedule();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        interrupt();
    };
    const handleAnchor = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      pendingNavigation.current = NAV_LINKS.some((link) => link.href === href)
        ? href
        : null;
      setActiveSection(pendingNavigation.current ?? "");
      schedule();
    };

    const observer = new ResizeObserver(schedule);
    if (root.current) observer.observe(root.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    document.addEventListener("keydown", handleKey);
    root.current?.addEventListener("click", handleAnchor);
    ScrollTrigger.addEventListener("refresh", schedule);
    const container = root.current;
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      document.removeEventListener("keydown", handleKey);
      container?.removeEventListener("click", handleAnchor);
      ScrollTrigger.removeEventListener("refresh", schedule);
    };
  }, [root]);

  return activeSection;
}
