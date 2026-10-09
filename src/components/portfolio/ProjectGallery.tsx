"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { selectedWork, type Work, type WorkCategory } from "@/data/selected-work";

const filters = ["All work", "Full stack", "AI & ML", "Mobile"] as const;

export function ProjectGallery({ motion }: { motion: boolean }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const [selected, setSelected] = useState<Work | null>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = selectedWork.filter((work) => filter === "All work" || work.category === (filter as WorkCategory));

  useGSAP(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (motion && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.from(".work-card", { y: 22, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", clearProps: "all" });
    }
    return () => cancelAnimationFrame(frame);
  }, { scope: gallery, dependencies: [filter, motion], revertOnUpdate: true });

  useEffect(() => {
    if (!selected || !dialog.current) return;
    dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  return (
    <>
      <div className="work-toolbar">
        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)}>{item}<sup>{item === "All work" ? selectedWork.length : selectedWork.filter((work) => work.category === item).length}</sup></button>)}
        </div>
        <span className="mono work-counter" aria-live="polite">{String(visible.length).padStart(2, "0")} projects</span>
      </div>
      <div className="work-grid" ref={gallery}>
        {visible.map((work) => (
          <article className="work-card" key={work.id}>
            <button type="button" className="project-preview" style={{ "--project-bg": work.color } as CSSProperties} onClick={() => setSelected(work)} aria-label={`Explore ${work.name}`}>
              <span className="preview-label mono">{work.imageType === "Screenshot" ? "Product screenshot" : "Generated UI mockup"}</span>
              <div className="preview-window">
                <div className="window-bar" aria-hidden="true"><i /><i /><i /><span>{work.name.toLowerCase().replaceAll(" ", "-")}</span></div>
                <div className="preview-image"><Image src={work.image} alt={`${work.name} ${work.imageType.toLowerCase()}`} fill sizes="(max-width: 700px) 90vw, 43vw" /></div>
              </div>
              <span className="preview-open" aria-hidden="true">Explore project <span>↗</span></span>
              <span className="preview-index mono" aria-hidden="true">{String(selectedWork.indexOf(work) + 1).padStart(2, "0")}</span>
            </button>
            <div className="work-meta mono"><span>{work.category}</span><span>{work.year}</span></div>
            <button className="work-title" type="button" onClick={() => setSelected(work)}><h3>{work.name}</h3><span aria-hidden="true">↗</span></button>
            <p>{work.description}</p>
            <div className="work-stack">{work.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
          </article>
        ))}
      </div>
      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        {selected && <div className="dialog-content">
          <div className="dialog-top"><span className="mono">Project notes / {selected.year}</span><button type="button" className="dialog-close" aria-label="Close project details" onClick={() => dialog.current?.close()}>×</button></div>
          <p className="eyebrow">{selected.category}</p>
          <h2 id="project-dialog-title">{selected.name}</h2>
          <p className="dialog-tagline">{selected.eyebrow}</p>
          <div className="dialog-image"><Image src={selected.image} alt={`${selected.name} ${selected.imageType.toLowerCase()}`} width={1536} height={1024} sizes="(max-width: 750px) 90vw, 760px" /></div>
          <p className="image-caption mono">{selected.imageType === "Screenshot" ? "Actual project screenshot" : "AI-generated UI mockup based on project features; actual interface may differ."}</p>
          <p className="dialog-outcome">{selected.outcome}</p>
          <ul className="project-details">{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          <div className="work-stack">{selected.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
          <div className="dialog-links"><a className="pill-button dark" href={selected.github} target="_blank" rel="noopener noreferrer">View source <span>↗</span></a>{selected.live && <a className="pill-button outline" href={selected.live} target="_blank" rel="noopener noreferrer">Visit project <span>↗</span></a>}</div>
        </div>}
      </dialog>
    </>
  );
}
