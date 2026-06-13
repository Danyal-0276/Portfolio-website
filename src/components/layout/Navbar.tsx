"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
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
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8 xl:gap-6 xl:px-10">
        {/* Logo — constrained width so it never pushes nav items */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          className="relative z-10 flex shrink-0 items-center"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src={siteConfig.logoPath}
            alt={`${siteConfig.name} logo`}
            width={108}
            height={44}
            priority
            className="h-8 w-auto max-w-[5.5rem] object-contain object-left sm:h-9 sm:max-w-[6.5rem] lg:h-10 lg:max-w-[7.5rem]"
          />
        </button>

        {/* Center links — xl+ only so tablet/mobile stay clean */}
        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:flex xl:gap-5 2xl:gap-6">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-cream/70 transition-colors hover:text-gold 2xl:text-[0.9375rem]"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions — xl+ */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
          <SocialLinks variant="compact" className="[&_a]:text-cream/70 [&_a:hover]:text-gold" />
          <a
            href={siteConfig.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm whitespace-nowrap text-cream transition-colors hover:border-gold hover:text-gold 2xl:px-5"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => handleNavClick("#contact")}
            className="rounded-full border border-white/20 px-4 py-2 text-sm whitespace-nowrap text-cream transition-colors hover:border-gold hover:bg-gold hover:text-charcoal 2xl:px-5"
          >
            Contact
          </button>
        </div>

        {/* Mobile / tablet menu toggle */}
        <button
          type="button"
          className="ml-auto flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={cn(
              "block h-0.5 w-5 bg-cream transition-transform sm:w-6",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-cream transition-opacity sm:w-6",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-cream transition-transform sm:w-6",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Slide-down menu for mobile + tablet */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#0a0a0a] transition-[max-height,opacity] duration-300 xl:hidden",
          open ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 border-t-transparent",
        )}
      >
        <div className="max-h-[calc(85vh-1px)] overflow-y-auto px-4 py-5 sm:px-6">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-cream/80 transition-colors hover:bg-white/5 hover:text-gold"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap">
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold sm:flex-none"
            >
              View Resume
            </a>
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-gold-dark sm:flex-none"
            >
              Get in Touch
            </button>
          </div>

          <div className="mt-5 flex justify-center border-t border-white/10 pt-5">
            <SocialLinks variant="compact" className="[&_a]:text-cream/70 [&_a:hover]:text-gold" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-charcoal px-4 py-10 text-cream sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-serif text-xl">
            {siteConfig.name}
            <span className="text-gold">.</span>
          </p>
          <p className="mt-1 max-w-xs text-sm text-cream/60 sm:max-w-none">
            Full-Stack Web Developer & AI/ML Researcher · Lahore, Pakistan
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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

        <p className="text-center text-sm text-cream/40 md:text-right">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
