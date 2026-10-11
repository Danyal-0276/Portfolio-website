"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeSkills } from "@/data/resume-skills";

export function SkillsSection() {
  const [query, setQuery] = useState("");
  useEffect(() => { const frame = requestAnimationFrame(() => ScrollTrigger.refresh()); return () => cancelAnimationFrame(frame); }, [query]);
  const search = query.trim().toLowerCase();
  const groups = resumeSkills.map(group => ({ ...group, skills: ` ${group.name.toLowerCase()} `.includes(` ${search} `) ? group.skills : group.skills.filter(skill => skill.toLowerCase().includes(search)) })).filter(group => group.skills.length);
  const count = groups.reduce((total, group) => total + group.skills.length, 0);
  return <section id="skills" className="skills-section section-space" aria-labelledby="skills-title"><div className="shell">
    <div className="section-heading" data-reveal><div><p className="eyebrow"><span>03 /</span> Skills & capabilities</p><h2 id="skills-title">A versatile stack.<br /><span className="serif">A builder’s mindset.</span></h2></div><p className="section-intro">The languages, tools, and foundations<br />I bring to a project. Across software,<br />mobile, and applied AI.</p></div>
    <div className="skills-toolbar"><div className="skills-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a skill — Python, React, RAG…" aria-label="Search skills" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear skill search">×</button>}</div><span className="mono" role="status">{count} {count === 1 ? "skill" : "skills"} / {groups.length} {groups.length === 1 ? "discipline" : "disciplines"}</span></div>
    <div className="skills-grid">{groups.map(group => <article className="skill-discipline" key={group.name}><div className="skill-card-heading"><span className="skill-mark" aria-hidden="true">{group.mark}</span><span className="mono">{String(group.skills.length).padStart(2, "0")} SKILLS</span></div><h3>{group.name}</h3><p>{group.note}</p><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
    {count === 0 && <p className="skills-empty">No matching skills. Try a language, framework, or category.</p>}
    <div className="skills-foot mono"><span>PUT INTO PRACTICE, PROJECT BY PROJECT.</span><a href="#toolkit">Explore how I connect the stack ↘</a></div>
  </div></section>;
}
