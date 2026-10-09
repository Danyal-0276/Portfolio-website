"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/portfolio";
import { experiments } from "@/data/selected-work";
import { ProjectGallery } from "./ProjectGallery";
import { StackLab } from "./StackLab";
import { ContactForm } from "./ContactForm";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const links = [{ name: "Work", href: "#work" }, { name: "Toolkit", href: "#toolkit" }, { name: "About", href: "#about" }, { name: "Contact", href: "#contact" }];

function Star({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 0 57 33 85 15 67 43 100 50 67 57 85 85 57 67 50 100 43 67 15 85 33 57 0 50 33 43 15 15 43 33Z" fill="currentColor" /></svg>;
}

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [motion, setMotion] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("motion-off", !motion);
    return () => document.documentElement.classList.remove("motion-off");
  }, [motion]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotion(!media.matches);
    const update = () => setMotion(!media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    links.forEach((link) => { const section = document.querySelector(link.href); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  useGSAP(() => {
    if (!motion) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-line > span", { yPercent: 110, rotation: 3, duration: 1.05, stagger: 0.12 }, 0.1)
        .from(".hero-enter", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, clearProps: "all" }, 0.45)
        .from(".portrait-follow", { y: 65, opacity: 0, duration: 1.15, clearProps: "all" }, 0.25)
        .from(".portrait-disc", { scale: 0.6, rotation: -35, opacity: 0, duration: 1.2, clearProps: "all" }, 0.1);
      gsap.to(".page-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "max", scrub: 0.2 } });
      gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current).forEach((element) => {
        gsap.from(element, { y: 34, opacity: 0, duration: 0.85, ease: "power2.out", clearProps: "all", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
      });
      gsap.to(".portrait-disc", { rotation: 22, yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".about-star", { rotation: 140, ease: "none", scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const stage = root.current?.querySelector<HTMLElement>(".portrait-stage");
      const follow = root.current?.querySelector<HTMLElement>(".portrait-follow");
      if (!stage || !follow) return;
      const moveX = gsap.quickTo(follow, "x", { duration: 0.7, ease: "power3.out" });
      const moveY = gsap.quickTo(follow, "y", { duration: 0.7, ease: "power3.out" });
      const onMove = (event: PointerEvent) => { const rect = stage.getBoundingClientRect(); moveX(((event.clientX - rect.left) / rect.width - 0.5) * 22); moveY(((event.clientY - rect.top) / rect.height - 0.5) * 16); };
      const onLeave = () => { moveX(0); moveY(0); };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
      return () => { stage.removeEventListener("pointermove", onMove); stage.removeEventListener("pointerleave", onLeave); };
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [motion], revertOnUpdate: true });

  return <div ref={root} className={motion ? "portfolio" : "portfolio motion-paused"}>
    <div className="page-progress" aria-hidden="true" />
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Danyal Tanveer, back to top">danyal<span>.</span></a>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} id="main-navigation" aria-label="Main navigation">
        {links.map((link, index) => <a key={link.href} href={link.href} aria-current={activeSection === link.href ? "location" : undefined} onClick={() => setMenuOpen(false)}><span className="nav-index mono">0{index + 1}</span>{link.name}<span className="nav-dot" /></a>)}
      </nav>
      <div className="header-actions"><a className="header-hello" href="mailto:donibutt2112@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button></div>
    </header>
    <main id="main-content">
      <section className="hero shell" id="home" aria-labelledby="hero-title">
        <div className="hero-topline mono hero-enter"><span><span className="status-dot" />Open to software & AI engineering roles</span><span className="hero-location">Based in Lahore, PK / UTC+05:00</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-enter">Danyal Tanveer — Software & AI engineer</p>
            <h1 id="hero-title"><span className="hero-line"><span>I build</span></span><span className="hero-line"><span>what’s</span></span><span className="hero-line italic"><span>next<span className="coral-text">.</span></span></span></h1>
            <div className="hero-description hero-enter"><span className="hero-rule" /><p>Thoughtful interfaces. Intelligent systems.<br />From a first idea to software people use.</p></div>
            <div className="hero-actions hero-enter"><a className="pill-button dark" href="#work">Explore my work <span aria-hidden="true">↘</span></a><a className="resume-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">View résumé <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="portrait-stage">
            <div className="portrait-disc" aria-hidden="true"><div className="disc-ring" /><span className="disc-cross cross-one">+</span><span className="disc-cross cross-two">+</span></div>
            <span className="portrait-coordinate mono hero-enter" aria-hidden="true">31.5204° N<br />74.3587° E</span>
            <div className="portrait-follow"><Image className="hero-portrait" src="/images/portrait-2026.png" alt="Danyal Tanveer, software and AI engineer, seated with his laptop" width={1254} height={1254} priority sizes="(max-width: 700px) 95vw, 48vw" /></div>
            <div className="portrait-label hero-enter"><Star /><span>Engineer by training.<br /><strong>Builder by instinct.</strong></span></div>
            <span className="portrait-side mono" aria-hidden="true">Always curious. Always building.</span>
          </div>
        </div>
        <div className="hero-foot mono hero-enter"><a href="#work">Scroll to discover <span className="scroll-arrow" aria-hidden="true">↓</span></a><span>Full-stack development × Applied AI</span><span>Portfolio / 2026</span></div>
      </section>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0, 1, 2, 3].map((item) => <div className="ticker-group" key={item}><span>Ideas into interfaces</span><Star /><span>Data into intelligence</span><Star /><span>Code into real things</span><Star /></div>)}</div></div>
      <section id="work" className="work-section shell section-space" aria-labelledby="work-title">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span>01 /</span> Selected work</p><h2 id="work-title">Less talk.<br /><span className="serif">More built.</span></h2></div><p className="section-intro">A selection of products, platforms, and<br className="desktop-break" /> experiments across the stack.<br /><span className="muted">Built with intention. Learned by doing.</span></p></div>
        <ProjectGallery motion={motion} />
        <div className="work-bottom"><span className="mono">A closer look at how I think, build, and solve.</span><a className="text-link" href={siteConfig.github} target="_blank" rel="noopener noreferrer">More on GitHub <span aria-hidden="true">↗</span></a></div>
      </section>
      <section id="toolkit" className="toolkit-section section-space" aria-labelledby="toolkit-title"><div className="shell">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span>02 /</span> The toolkit</p><h2 id="toolkit-title">Different layers.<br /><span className="serif">One connected mind.</span></h2></div><p className="section-intro">The tools change. The goal stays simple:<br />build something useful, and build it well.</p></div>
        <StackLab motion={motion} />
        <div className="foundation-strip mono"><span>The foundations underneath</span><p>Python / TypeScript / JavaScript / Java / C++ / SQL / OOP / Data structures & algorithms</p></div>
      </div></section>
      <section id="about" className="about-section shell section-space" aria-labelledby="about-title">
        <div className="about-grid"><div className="about-title" data-reveal><p className="eyebrow"><span>03 /</span> The person behind the code</p><h2 id="about-title">Curiosity<br />is the <span className="serif">constant.</span></h2><Star className="about-star" /></div>
          <div className="about-body" data-reveal><p className="about-lead">Hi, I’m Danyal. I’m a computer science graduate who likes turning complicated problems into things that feel simple to use.</p><p>I work where product engineering meets applied AI: responsive frontends, dependable APIs, and machine learning pipelines that make it into a real application.</p><p>That has taken me from shipping restaurant software for live clients to training news credibility models and building a book archive you can talk to. I’m looking for a team where I can contribute, keep asking questions, and keep getting better.</p>
            <div className="education"><span className="mono">2022 — 2026 / Education</span><h3>BS Computer Science</h3><p>University of Central Punjab, Lahore</p><span className="education-grade">3.60 <span>/ 4.00 CGPA</span></span></div>
          </div>
        </div>
        <div className="experience-block" data-reveal><div className="experience-label"><p className="eyebrow">In the real world</p><span className="mono">Jul — Dec 2025</span></div><div className="experience-content"><div className="experience-title"><h3>Full-Stack Developer Intern</h3><span className="experience-badge">On-site / Lahore</span></div><p className="company-name">Tri Tech Technology LLC</p><p>Helped build and deploy a multi-tenant restaurant POS ecosystem: three Next.js frontends, one shared Express API, and the workflows that keep a restaurant moving.</p><div className="experience-facts"><span><strong>4</strong> connected services</span><span><strong>2</strong> restaurant clients</span><span><strong>5</strong> staff roles</span></div><p className="client-note mono">Deployed for CAP Cafe & Extraction</p></div></div>
      </section>
      <section id="research" className="research-section" aria-labelledby="research-title"><div className="shell research-grid">
        <div data-reveal><p className="eyebrow"><span>04 /</span> Beyond the interface</p><h2 id="research-title">Ask better questions.<br /><span className="serif">Test the answers.</span></h2><p className="research-copy">My research explores how sentiment and emotion features affect transformer-based fake news detection. I co-authored a preprint comparing RoBERTa, ELECTRA, BERT, and DistilBERT on the LIAR short-claim dataset.</p><p className="research-note mono">Preprint submitted to Elsevier · Publication pending</p><a className="text-link" href="/resumes/danyal-ai-ml.pdf" target="_blank" rel="noopener noreferrer">Read my AI / ML résumé <span aria-hidden="true">↗</span></a></div>
        <div className="research-result" data-reveal><div className="result-top mono"><span>Selected experiment</span><span>LIAR / ELECTRA</span></div><span className="result-value">72.03<span>%</span></span><p>Accuracy with text + sentiment + emotion</p><div className="result-metrics"><span><strong>0.7626</strong>F1 score</span><span><strong>0.4247</strong>MCC</span></div><p className="result-footnote">Selected combined-feature setting. Results documented in my AI/ML résumé.</p></div>
      </div></section>
      <section id="playground" className="playground-section shell section-space" aria-labelledby="playground-title">
        <div className="section-heading compact" data-reveal><div><p className="eyebrow"><span>05 /</span> The playground</p><h2 id="playground-title">Follow the <span className="serif">curiosity.</span></h2></div><p className="section-intro">Side quests, smaller builds,<br />and ideas worth trying.</p></div>
        <div className="experiment-list">{experiments.map((experiment, index) => <details className="experiment" key={experiment.name}><summary><span className="mono experiment-number">0{index + 1}</span><h3>{experiment.name}</h3><span className="mono experiment-type">{experiment.type}</span><span className="experiment-plus" aria-hidden="true">+</span></summary><div className="experiment-body"><div><p>{experiment.description}</p><a className="text-link" href={experiment.github} target="_blank" rel="noopener noreferrer">Explore repository <span aria-hidden="true">↗</span></a><p className="image-caption mono">{experiment.generated ? "Generated UI mockup; actual interface may differ." : "Actual project screenshot"}</p></div><div className="experiment-image"><Image src={experiment.image} alt={`${experiment.name} ${experiment.generated ? "generated UI mockup" : "screenshot"}`} width={900} height={600} sizes="(max-width: 700px) 85vw, 45vw" /></div></div></details>)}</div>
        <div className="credentials"><p className="eyebrow">Always a student</p><div><a href="https://coursera.org/verify/7C403PQ3QE0D" target="_blank" rel="noopener noreferrer"><span>Google / Coursera</span><strong>AI Fundamentals</strong><span className="mono">Apr 2026 ↗</span></a><div><span>Hugging Face</span><strong>Fundamentals of Agents · Unit 1</strong><span className="mono">May 2026</span></div><div><span>HackerRank</span><strong>Python (Basic)</strong><span className="mono">Aug 2026</span></div></div></div>
      </section>
      <section id="contact" className="contact-section section-space" aria-labelledby="contact-title"><div className="shell">
        <div className="contact-heading" data-reveal><p className="eyebrow"><span>06 /</span> Let’s make something</p><h2 id="contact-title">Have a good<br /><span className="serif">problem?</span><a href="mailto:donibutt2112@gmail.com" className="contact-arrow" aria-label="Email Danyal"><span aria-hidden="true">↗</span></a></h2><p>I’m open to junior software and AI engineering roles,<br className="desktop-break" /> collaborations, and conversations that lead somewhere.</p></div>
        <div className="contact-grid"><div className="contact-direct"><span className="mono">Start with hello</span><a className="email-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}<span aria-hidden="true">↗</span></a><a className="phone-link" href="tel:+923707076164">+92 370 7076164</a><div className="social-links"><a href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div><div className="resume-downloads"><span className="mono">Pick your résumé</span><a href="/resumes/danyal-full-stack.pdf" target="_blank" rel="noopener noreferrer">Full-stack ↗</a><a href="/resumes/danyal-ai-ml.pdf" target="_blank" rel="noopener noreferrer">AI / ML ↗</a></div></div><ContactForm /></div>
        <footer className="site-footer"><a className="wordmark" href="#home">danyal<span>.</span></a><span className="mono">© 2026 Danyal Tanveer / Made with curiosity</span><button type="button" className="motion-toggle mono" aria-pressed={motion} onClick={() => setMotion(!motion)}><span className={motion ? "motion-indicator on" : "motion-indicator"} />Motion {motion ? "on" : "off"}</button><a className="back-top mono" href="#home">Back to top ↑</a></footer>
      </div></section>
    </main>
  </div>;
}
