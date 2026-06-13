"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { registerGSAP, scrollToSection } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    registerGSAP();
  }, { scope: navRef });

  const handleNavClick = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 right-0 left-0 z-50 border-b border-charcoal/5 bg-cream/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          className="font-serif text-xl text-charcoal transition-colors hover:text-gold-dark"
        >
          DT<span className="text-gold">.</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-charcoal-light transition-colors hover:text-gold-dark"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <SocialLinks variant="compact" />
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="rounded-full bg-charcoal px-5 py-2 text-sm text-cream transition-colors hover:bg-gold hover:text-charcoal"
          >
            Get in Touch
          </button>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={cn(
              "block h-0.5 w-6 bg-charcoal transition-transform",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-charcoal transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-charcoal transition-transform",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-charcoal/5 bg-cream px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-base text-charcoal-light"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="text-base font-medium text-gold-dark"
              >
                Get in Touch
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-charcoal px-6 py-10 text-cream md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-serif text-xl">
            {siteConfig.name}
            <span className="text-gold">.</span>
          </p>
          <p className="mt-1 text-sm text-cream/60">
            Full-Stack & ML Developer · Lahore, Pakistan
          </p>
        </div>

        <div className="flex items-center gap-6">
          <SocialLinks
            variant="compact"
            className="[&_a]:text-cream/70 [&_a:hover]:text-gold"
          />
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-cream/70 transition-colors hover:text-gold"
          >
            Email
          </a>
        </div>

        <p className="text-sm text-cream/40">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
