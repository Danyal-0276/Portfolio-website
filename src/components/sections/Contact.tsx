"use client";

import { useState, type FormEvent } from "react";
import { hero, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { SplitLetters } from "@/components/ui/SplitLetters";
import { SocialLinks } from "@/components/ui/SocialLinks";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <div className="contact-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="reveal mb-16 text-center md:mb-20">
          <p className="mb-4 text-xs tracking-[0.28em] text-accent/80 uppercase">Contact</p>
          <h2 className="mx-auto max-w-4xl text-[clamp(2rem,7vw,5rem)] leading-[0.95] font-bold tracking-[-0.03em] text-white">
            <SplitLetters text="LET'S BUILD" charClassName="contact-char" />
            <span className="mt-1 block text-accent">
              <SplitLetters text="SOMETHING AMAZING" charClassName="contact-char" />
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-cream/55">
            Have a project in mind or want to discuss research? {hero.availability}.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal space-y-8">
            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="view"
                className="group flex min-w-0 items-center gap-4 break-all text-cream/70 transition-colors hover:text-accent sm:break-normal"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
                  @
                </span>
                <span className="text-lg">{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                data-cursor="view"
                className="group flex items-center gap-4 text-cream/70 transition-colors hover:text-accent"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
                  ☎
                </span>
                <span className="text-lg">{siteConfig.phone}</span>
              </a>
              <p className="flex items-center gap-4 text-cream/70">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-accent">
                  📍
                </span>
                <span className="text-lg">{siteConfig.location}</span>
              </p>
            </div>

            <SocialLinks className="[&_a]:text-cream/60 [&_a:hover]:text-accent" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="reveal space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:space-y-5 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-cream/80">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-cream/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-accent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-cream/80">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-accent"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              magnetic
              className="w-full bg-accent text-white hover:bg-accent-soft"
              disabled={status === "loading"}
              data-cursor="explore"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>

            {status === "success" && (
              <p className="text-center text-sm text-emerald-400" role="status">
                Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-center text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
