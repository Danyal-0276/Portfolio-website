"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { gsap, registerGSAP, scrollToSection, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function NavLinkItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="explore"
      className="nav-link-btn relative overflow-hidden px-1.5 py-2"
    >
      <span
        className="nav-link-glow pointer-events-none absolute inset-x-0 top-1/2 h-8 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,107,0,0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <span className="nav-link-label relative z-10 block text-sm text-cream/70 2xl:text-[0.9375rem]">
        {label}
      </span>
      <span
        className="nav-link-underline absolute right-1.5 bottom-1 left-1.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        aria-hidden="true"
      />
    </button>
  );
}

function NavActionButton({
  children,
  onClick,
  href,
  variant = "outline",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "outline" | "primary";
}) {
  const isPrimary = variant === "primary";
  const className = cn(
    "nav-action-btn relative overflow-hidden rounded-full border px-4 py-2 text-sm whitespace-nowrap 2xl:px-5",
    isPrimary ? "nav-action-btn-primary border-accent/40 text-cream" : "nav-action-btn-outline border-white/20 text-cream",
  );

  const inner = (
    <>
      <span
        className={cn(
          "nav-action-fill absolute inset-0 rounded-full",
          isPrimary ? "bg-accent" : "bg-accent/10",
        )}
        aria-hidden="true"
      />
      <span className="nav-action-text relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-cursor="view">
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} data-cursor="explore">
      {inner}
    </button>
  );
}

function MobileNavLink({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mobile-nav-link w-full rounded-lg px-3 py-2.5 text-left text-sm text-cream/80 transition-all duration-300 hover:translate-x-1.5 hover:bg-white/5 hover:text-accent"
    >
      <span className="flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-accent/50" aria-hidden="true" />
        {label}
      </span>
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGSAP();
  }, { scope: navRef });

  useGSAP(
    () => {
      registerGSAP();
      const header = headerRef.current;
      if (!header) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      let lastScroll = 0;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const current = self.scroll();
          const delta = current - lastScroll;

          if (current < 80) {
            gsap.to(header, { y: 0, duration: 0.4, ease: "power3.out" });
          } else if (delta > 8) {
            gsap.to(header, { y: "-110%", duration: 0.45, ease: "power3.out" });
          } else if (delta < -8) {
            gsap.to(header, { y: 0, duration: 0.45, ease: "power3.out" });
          }

          lastScroll = current;
        },
      });
    },
    { scope: navRef },
  );

  useGSAP(
    () => {
      registerGSAP();
      const menu = menuRef.current;
      if (!menu) return;

      const links = menu.querySelectorAll(".mobile-nav-link");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!open) {
        gsap.set(links, { clearProps: "opacity,transform" });
        return;
      }

      if (prefersReducedMotion) {
        gsap.set(links, { opacity: 1, x: 0 });
        return;
      }

      gsap.fromTo(
        links,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.04, ease: "power3.out" },
      );
    },
    { scope: menuRef, dependencies: [open] },
  );

  const handleNavClick = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header ref={navRef} className="fixed top-0 right-0 left-0 z-50">
      <div
        ref={headerRef}
        className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md transition-transform will-change-transform"
      >
        <nav className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8 xl:gap-6 xl:px-10">
          <button
            type="button"
            onClick={() => handleNavClick("#hero")}
            className="nav-logo-btn relative z-10 flex shrink-0 items-center"
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

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex xl:gap-2 2xl:gap-3">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <NavLinkItem label={link.label} onClick={() => handleNavClick(link.href)} />
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
            <SocialLinks variant="compact" className="nav-social [&_a]:text-cream/70 [&_a]:transition-transform [&_a]:duration-300 [&_a:hover]:scale-110 [&_a:hover]:text-accent" />
            <NavActionButton href={siteConfig.resumePath} variant="outline">
              Resume
            </NavActionButton>
            <NavActionButton variant="primary" onClick={() => handleNavClick("#contact")}>
              Contact
            </NavActionButton>
          </div>

          <button
            type="button"
            className="nav-hamburger ml-auto flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-white/5 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={cn(
                "block h-0.5 w-5 bg-cream transition-all duration-300 sm:w-6",
                open && "translate-y-2 rotate-45 bg-accent",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-cream transition-all duration-300 sm:w-6",
                open && "opacity-0 scale-x-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-cream transition-all duration-300 sm:w-6",
                open && "-translate-y-2 -rotate-45 bg-accent",
              )}
            />
          </button>
        </nav>

        <div
          ref={menuRef}
          className={cn(
            "overflow-hidden border-t border-white/10 bg-[#0a0a0a] transition-[max-height,opacity] duration-300 xl:hidden",
            open ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 border-t-transparent",
          )}
        >
          <div className="max-h-[calc(85vh-1px)] overflow-y-auto px-4 py-5 sm:px-6">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <MobileNavLink label={link.label} onClick={() => handleNavClick(link.href)} />
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap">
              <a
                href={siteConfig.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_4px_16px_rgba(255,107,0,0.2)] sm:flex-none"
                data-cursor="view"
              >
                View Resume
              </a>
              <button
                type="button"
                onClick={() => handleNavClick("#contact")}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-[0_4px_16px_rgba(255,107,0,0.35)] sm:flex-none"
                data-cursor="explore"
              >
                Get in Touch
              </button>
            </div>

            <div className="mt-5 flex justify-center border-t border-white/10 pt-5">
              <SocialLinks variant="compact" className="[&_a]:text-cream/70 [&_a:hover]:scale-110 [&_a:hover]:text-accent" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-charcoal px-4 py-10 text-cream sm:px-6 md:px-12 lg:px-20 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-serif text-xl">
            {siteConfig.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 max-w-xs text-sm text-cream/60 sm:max-w-none">
            Full-Stack Web Developer & AI/ML Researcher · Lahore, Pakistan
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <SocialLinks
            variant="compact"
            className="[&_a]:text-cream/70 [&_a:hover]:text-accent"
          />
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-cream/70 transition-colors hover:text-accent"
            data-cursor="view"
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
