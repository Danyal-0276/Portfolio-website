"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { selectedWork, type Work, type WorkCategory } from "@/data/selected-work";

const filters = ["All work", "Full stack", "AI & ML", "Mobile"] as const;
const storyNotes: Record<string, { question: string; steps: string[]; motif: string }> = {
  trak: { question: "What if your feed helped you question what you read?", steps: ["Collect the news", "Test its credibility", "Make it personal"], motif: "QUESTION THE FEED." },
  feastly: { question: "How do four different people share one smooth delivery?", steps: ["Find your next meal", "Connect the kitchen", "Follow the last mile"], motif: "ORDER. MOVE. DELIVER." },
  archive: { question: "What if an entire fictional world could answer back?", steps: ["Turn books into vectors", "Retrieve the right context", "Stream a grounded answer"], motif: "ENTER THE ARCHIVE." },
  pos: { question: "What actually keeps a restaurant moving during the rush?", steps: ["One shared API", "Three connected consoles", "Two real restaurant clients"], motif: "BUILT FOR THE RUSH." },
  shopora: { question: "What makes the journey from discovery to checkout feel simple?", steps: ["Discover something good", "Keep the cart in sync", "Confirm the payment"], motif: "FIND. WANT. CHECKOUT." },
  orbit: { question: "Can a music player feel personal without needing a connection?", steps: ["Your local library", "Your own playlists", "Playback that stays with you"], motif: "YOUR MUSIC. YOUR ORBIT." },
};

export function ProjectGallery({ motion }: { motion: boolean }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const [selected, setSelected] = useState<Work | null>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = selectedWork.filter((work) => filter === "All work" || work.category === (filter as WorkCategory));

  useGSAP(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (motion && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((chapter, index) => {
          gsap.fromTo(chapter.querySelector(".preview-window"), { rotation: index % 2 ? 8 : -8, y: 60, scale: .88 }, { rotation: 0, y: -30, scale: 1, ease: "none", scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: 1 } });
          gsap.fromTo(chapter.querySelector(".story-motif"), { xPercent: 12 }, { xPercent: -12, ease: "none", scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
      });
      return () => { cancelAnimationFrame(frame); mm.revert(); };
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
        <nav className="story-index" aria-label="Jump to a project chapter">{visible.map((work) => <a key={work.id} href={`#chapter-${work.id}`}><span className="mono">0{selectedWork.indexOf(work) + 1}</span>{work.name}<span>↘</span></a>)}</nav>
        {visible.map((work) => (
          <article className={`work-card chapter-${work.id}`} id={`chapter-${work.id}`} key={work.id}>
            <div className="story-intro"><span className="mono story-chapter">CHAPTER 0{selectedWork.indexOf(work) + 1} / {work.category} / {work.year}</span><p className="story-question">{storyNotes[work.id].question}</p><button className="work-title" type="button" onClick={() => setSelected(work)}><h3>{work.name}</h3><span aria-hidden="true">↗</span></button><p className="story-description">{work.description}</p><ol className="story-steps">{storyNotes[work.id].steps.map((step, index) => <li key={step}><span className="mono">0{index + 1}</span>{step}</li>)}</ol><div className="work-stack">{work.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div><button type="button" className="text-link story-open" onClick={() => setSelected(work)}>Open the build notes ↗</button></div>
            <button type="button" className="project-preview" style={{ "--project-bg": work.color } as CSSProperties} onClick={() => setSelected(work)} aria-label={`Explore ${work.name}`}>
              <span className="story-motif" aria-hidden="true">{storyNotes[work.id].motif}</span>
              <span className="preview-label mono">{work.imageType === "Screenshot" ? "Product screenshot" : "Generated UI mockup"}</span>
              <div className="preview-window">
                <div className="window-bar" aria-hidden="true"><i /><i /><i /><span>{work.name.toLowerCase().replaceAll(" ", "-")}</span></div>
                <div className="preview-image"><Image src={work.image} alt={`${work.name} ${work.imageType.toLowerCase()}`} fill sizes="(max-width: 700px) 90vw, 43vw" /></div>
              </div>
              <span className="preview-open" aria-hidden="true">Explore project <span>↗</span></span>
              <span className="preview-index mono" aria-hidden="true">{String(selectedWork.indexOf(work) + 1).padStart(2, "0")}</span>
              <span className="story-outcome">{work.outcome}</span>
            </button>
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
