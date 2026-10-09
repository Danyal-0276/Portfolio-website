"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroScene({ motion }: { motion: boolean }) {
  const scene = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!motion) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".giant-word span", { yPercent: 120, rotate: 8, stagger: .075, duration: 1.1 }, .1)
        .from(".scene-person", { y: 90, opacity: 0, duration: 1.2 }, .35)
        .from(".scene-object", { scale: .5, opacity: 0, rotate: 0, stagger: .12, duration: .9 }, .65)
        .from(".scene-bottom, .scene-top", { y: 15, opacity: 0, duration: .6 }, .9);
      gsap.utils.toArray<HTMLElement>(".scene-object").forEach((item, index) => {
        gsap.to(item, { y: index % 2 ? -13 : 13, rotation: `+=${index % 2 ? -3 : 3}`, duration: 3 + index * .5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
      gsap.to(".giant-word", { xPercent: -9, ease: "none", scrollTrigger: { trigger: scene.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".scene-person", { y: 70, ease: "none", scrollTrigger: { trigger: scene.current, start: "top top", end: "bottom top", scrub: 1 } });
    });
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const target = scene.current;
      if (!target) return;
      const x = gsap.quickTo(".scene-orbit", "x", { duration: 1, ease: "power3.out" });
      const y = gsap.quickTo(".scene-orbit", "y", { duration: 1, ease: "power3.out" });
      const move = (event: PointerEvent) => { const rect = target.getBoundingClientRect(); x((event.clientX / rect.width - .5) * 30); y(((event.clientY - rect.top) / rect.height - .5) * 20); };
      const leave = () => { x(0); y(0); };
      target.addEventListener("pointermove", move); target.addEventListener("pointerleave", leave);
      return () => { target.removeEventListener("pointermove", move); target.removeEventListener("pointerleave", leave); };
    });
    return () => mm.revert();
  }, { scope: scene, dependencies: [motion], revertOnUpdate: true });

  return <section ref={scene} className="scene-hero" id="home" aria-labelledby="hero-title">
    <div className="scene-top shell mono"><span><i className="status-dot" />Open to software & AI engineering roles</span><span>Lahore, Pakistan / 2026</span></div>
    <div className="scene-canvas">
      <div className="scene-grid" aria-hidden="true" />
      <h1 id="hero-title" className="giant-word" aria-label="Danyal Tanveer. I turn ideas into working software.">{"BUILDER".split("").map((letter, index) => <span aria-hidden="true" key={index}>{letter}</span>)}</h1>
      <span className="scene-outline" aria-hidden="true">WITH INTENT.</span>
      <div className="scene-orbit">
        <a href="#work" className="scene-object orbit-phone" aria-label="Explore TRAK news platform"><div className="object-bar mono">TRAK / NEWS + AI</div><Image src="/projects/trak-2.png" alt="TRAK news application interface" width={240} height={400} sizes="160px" /></a>
        <a href="#work" className="scene-object orbit-browser" aria-label="Explore Feastly food delivery platform"><div className="object-bar mono"><i /><i /><i />feastly.app</div><Image src="/projects/feastly-ui.png" alt="Feastly generated website UI mockup" width={360} height={240} sizes="260px" /></a>
        <div className="scene-object orbit-code" aria-hidden="true"><span className="mono">FROM IDEA TO SHIPPED</span><strong>&lt;/&gt;</strong><span className="mono">FULL STACK × APPLIED AI</span></div>
        <div className="scene-object orbit-spark" aria-hidden="true">✳</div>
        <a className="scene-object orbit-sticker" href="#toolkit">A curious mind.<br /><strong>A builder’s instinct.</strong><span>↗</span></a>
      </div>
      <div className="scene-person"><Image src="/images/portrait-seated-v2.png" alt="AI-generated editorial portrait of Danyal Tanveer seated on a chrome chair" width={1024} height={1536} priority sizes="(max-width: 600px) 80vw, 460px" /></div>
      <span className="scene-name mono">DANYAL TANVEER<br /><strong>SOFTWARE & AI ENGINEER</strong></span>
      <span className="scene-annotation mono" aria-hidden="true">↳ A little curiosity.<br />A lot of building.</span>
    </div>
    <div className="scene-bottom shell"><p>I turn <strong>“what if”</strong> into<br />software that <strong>works.</strong></p><div><a className="pill-button scene-cta" href="#work">Enter the work <span>↘</span></a><a className="resume-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Get my résumé ↗</a></div><span className="mono scene-scroll">SCROLL TO UNFOLD<br />THE STORY ↓</span></div>
  </section>;
}
