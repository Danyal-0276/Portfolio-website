"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const INTRO_STORAGE_KEY = "danyal-curtain-intro-v3";
const NAME = "DANYAL TANVEER";

export function HeroScene({ motion }: { motion: boolean }) {
  const scene = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const lastReplay = useRef(0);
  const [replay, setReplay] = useState(0);

  useGSAP(
    () => {
      const heading = title.current;
      const curtain = overlay.current;
      const name = mark.current;
      const skipButton = skip.current;
      if (!heading || !curtain || !name || !skipButton || !content.current) return;
      const isReplay = replay !== lastReplay.current;
      lastReplay.current = replay;
      if (!motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Preserve deep links and returning visitors' place in the page.
      if (!isReplay) {
        if (window.location.hash || window.scrollY > 80) return;
        try {
          if (sessionStorage.getItem(INTRO_STORAGE_KEY)) return;
        } catch {
          // The intro still works when browser storage is unavailable.
        }
      }

      const previousOverflow = document.body.style.overflow;
      const previousFocus = document.activeElement;
      const background = [
        content.current,
        ...document.querySelectorAll<HTMLElement>(".site-header, main > :not(#home)"),
      ].map((element) => ({ element, inert: element.inert }));
      let finished = false;

      const unlock = () => {
        document.body.style.overflow = previousOverflow;
        background.forEach(({ element, inert }) => { element.inert = inert; });
      };
      const finish = () => {
        if (finished) return;
        finished = true;
        curtain.style.display = "none";
        unlock();
        try { sessionStorage.setItem(INTRO_STORAGE_KEY, "seen"); } catch { /* Storage is optional. */ }
        if (document.activeElement === skipButton) {
          if (previousFocus instanceof HTMLElement && previousFocus !== document.body) {
            previousFocus.focus({ preventScroll: true });
          } else {
            heading.focus({ preventScroll: true });
          }
        }
      };

      document.body.style.overflow = "hidden";
      background.forEach(({ element }) => { element.inert = true; });
      gsap.set(curtain, { display: "block" });
      gsap.set(name, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });
      skipButton.focus({ preventScroll: true });

      const timeline = gsap.timeline({ onComplete: finish });
      timeline
        .from(".intro-letter", { yPercent: 110, duration: 0.65, stagger: 0.035, ease: "power3.out" }, 0.15)
        .from(".intro-rule", { scaleX: 0, transformOrigin: "left", duration: 1.05, ease: "power2.inOut" }, 0.2)
        .to(".intro-curtain", { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, 1.2)
        .to(".intro-skip, .intro-rule", { autoAlpha: 0, duration: 0.25 }, 1.2)
        .to(name, { y: -50, autoAlpha: 0, duration: 0.65, ease: "power3.in" }, 1.2)
        .from(".minimal-hero-reveal", { y: 22, opacity: 0, duration: 0.8, stagger: 0.09, clearProps: "transform,opacity", ease: "power3.out" }, 1.85)
        .from(".hero-portrait", { y: 35, opacity: 0, duration: 1.05, clearProps: "transform,opacity", ease: "power3.out" }, 1.65);

      const end = () => { timeline.progress(1); finish(); };
      const handleKey = (event: KeyboardEvent) => {
        if (finished) return;
        if (event.key === "Escape") end();
        if (event.key === "Tab") { event.preventDefault(); skipButton.focus(); }
      };
      skipButton.addEventListener("click", end);
      document.addEventListener("keydown", handleKey);
      // End safely when the viewport changes during the transition.
      window.addEventListener("resize", end);
      return () => {
        skipButton.removeEventListener("click", end);
        document.removeEventListener("keydown", handleKey);
        window.removeEventListener("resize", end);
        unlock();
      };
    },
    { scope: scene, dependencies: [motion, replay], revertOnUpdate: true },
  );

  return (
    <section ref={scene} className="minimal-hero" id="home" aria-labelledby="hero-title">
      <div ref={overlay} className="intro-overlay" role="dialog" aria-modal="true" aria-label="Opening Danyal Tanveer’s portfolio" style={{ display: "none" }}>
        <div className="intro-curtain" />
        <div ref={mark} className="intro-name" aria-hidden="true">
          {NAME.split("").map((letter, index) => <span className="intro-letter-mask" key={index}>{letter === " " ? "\u00a0" : <span className="intro-letter">{letter}</span>}</span>)}
        </div>
        <span className="intro-rule" />
        <button ref={skip} className="intro-skip mono" type="button">Skip intro <span aria-hidden="true">↗</span></button>
      </div>

      <div ref={content} className="minimal-hero-inner">
        <div className="hero-board">
          <div className="hero-board-top minimal-hero-reveal">
            <p className="hero-board-label">Software.<br /><span>With personality.</span></p>
            <a className="hero-availability" href="#contact"><i aria-hidden="true" /> Available for work <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-board-body">
            <div className="hero-headline minimal-hero-reveal">
              <h1 ref={title} id="hero-title" tabIndex={-1}>BUILT WITH<br /><span>INTENT.</span></h1>
              <div className="hero-links">
                <a className="pill-button scene-cta" href="#work">Enter the work <span aria-hidden="true">↘</span></a>
                <a className="resume-link" href="/resumes/danyal-full-stack.pdf" target="_blank" rel="noopener noreferrer">Get my résumé ↗</a>
              </div>
            </div>
            <div className="hero-portrait"><Image src="/images/hero-portrait.webp" alt="Danyal Tanveer in a black blazer with his arms crossed" width={960} height={1277} sizes="(max-width: 600px) 80vw, 45vw" priority /></div>
            <div className="hero-note minimal-hero-reveal"><p>Full-stack development.<br />Applied AI.<br /><span>A human touch.</span></p></div>
          </div>
        <div className="minimal-hero-bottom minimal-hero-reveal">
          <button type="button" onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); setReplay((value) => value + 1); }} disabled={!motion} aria-label="Replay opening animation">Replay intro <span aria-hidden="true">↻</span></button>
          <a href="#about">Meet the builder <span aria-hidden="true">↗</span></a>
        </div>
        </div>
      </div>
    </section>
  );
}
