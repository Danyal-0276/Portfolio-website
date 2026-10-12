"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiments } from "@/data/selected-work";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const covers = [
  { color: "#d8ceff", mark: "✳", label: "PLAY / CONNECT" },
  { color: "#c8e5ff", mark: "✧", label: "ASK / DISCOVER" },
  { color: "#ccebd9", mark: "⌘", label: "DETECT / PROTECT" },
  { color: "#ffcfb4", mark: "↗", label: "COLLECT / CONNECT" },
  { color: "#ffe477", mark: "Aa", label: "LEARN / REPEAT" },
];

function ExperimentFolder({ index, open, onToggle, motion }: { index: number; open: boolean; onToggle: () => void; motion: boolean }) {
  const root = useRef<HTMLElement>(null);
  const project = experiments[index];
  const cover = covers[index];
  const panelId = `experiment-panel-${index}`;
  useGSAP(() => {
    if (!open || !motion) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out", clearProps: "transform,opacity,visibility,clipPath" } })
        .from(".folder-copy > *", { y: 20, autoAlpha: 0, duration: .5, stagger: .07 }, .12)
        .from(".folder-preview", { y: 35, rotation: -3, clipPath: "inset(0 0 100% 0)", duration: .75 }, .08);
    });
    return () => media.revert();
  }, { scope: root, dependencies: [open, motion], revertOnUpdate: true });

  return <article ref={root} className={`experiment-folder${open ? " is-open" : ""}`} style={{ "--folder-color": cover.color } as CSSProperties}>
    <h3 className="folder-heading"><button type="button" className="folder-trigger" id={`experiment-trigger-${index}`} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
      <span className="folder-number mono">0{index + 1}</span>
      <span className="folder-symbol" aria-hidden="true">{cover.mark}</span>
      <span className="folder-title"><span className="folder-category mono">{project.type}</span><span>{project.name}</span></span>
      <span className="folder-action"><span className="mono">{open ? "Close file" : "Open file"}</span><span className="folder-plus" aria-hidden="true">+</span></span>
    </button></h3>
    <div className="folder-drawer" id={panelId} role="region" aria-labelledby={`experiment-trigger-${index}`} aria-hidden={!open} inert={!open} onTransitionEnd={event => { if (event.target === event.currentTarget) ScrollTrigger.refresh(); }}>
      <div className="folder-overflow"><div className="folder-body">
        <div className="folder-copy"><span className="folder-stamp mono">EXPERIMENT / 0{index + 1}</span><h4>{cover.label.split(" / ")[0]}.<br /><span>{cover.label.split(" / ")[1]}.</span></h4><p>{project.description}</p><a className="folder-repo" href={project.github} target="_blank" rel="noopener noreferrer">Explore repository <span aria-hidden="true">↗</span></a><p className="folder-caption mono">{project.generated ? "Generated UI mockup; actual interface may differ." : "Actual project screenshot"}</p></div>
        <div className="folder-preview"><div className="folder-browser mono"><span aria-hidden="true">● ● ●</span><span>{project.name}</span><span aria-hidden="true">↗</span></div><div className="folder-image"><Image src={project.image} alt={`${project.name} ${project.generated ? "generated UI mockup" : "screenshot"}`} width={900} height={600} sizes="(max-width: 700px) 85vw, 50vw" /></div></div>
      </div></div>
    </div>
  </article>;
}

export function Playground({ motion }: { motion: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [active, motion]);
  useGSAP(() => {
    if (!motion) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".experiment-folder", root.current).forEach(folder => {
        gsap.from(folder, { y: 30, autoAlpha: 0, duration: .6, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: folder, start: "top 94%", toggleActions: "play none none none" } });
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });
  return <div ref={root} className="experiment-folders"><div className="playground-note mono"><span><span aria-hidden="true">✳</span> Small builds. Big curiosity.</span><span>05 files / open to explore ↓</span></div>{experiments.map((project, index) => <ExperimentFolder key={project.name} index={index} open={active === index} onToggle={() => setActive(active === index ? null : index)} motion={motion} />)}</div>;
}
