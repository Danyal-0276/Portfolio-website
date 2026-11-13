"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/portfolio";
import { NAV_LINKS } from "../portfolio/navigation";

export function SiteHeader({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Danyal Tanveer, back to top">
        <span className="brand-logo">
          <Image src={siteConfig.logoPath} alt="Danyal" width={2172} height={724} priority />
        </span>
      </a>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} id="main-navigation" aria-label="Main navigation">
        {NAV_LINKS.map((link, index) => (
          <a key={link.href} href={link.href} aria-current={activeSection === link.href ? "location" : undefined} onClick={() => setMenuOpen(false)}>
            <span className="nav-index mono">0{index + 1}</span>
            <span className="nav-roll"><span>{link.name}</span><span aria-hidden="true">{link.name}</span></span>
            <span className="nav-dot" />
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="header-hello" href={`mailto:${siteConfig.email}`}>Let’s talk <span aria-hidden="true">↗</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "Close −" : "Menu +"}
        </button>
      </div>
    </header>
  );
}
