"use client";

import { useState, type FormEvent } from "react";
import { hero, siteConfig } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section id="contact" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's work together"
          description="Have a project in mind or want to discuss research? Send me a message."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="reveal space-y-8">
            <div>
              <h3 className="mb-2 font-serif text-xl text-charcoal">Get in touch</h3>
              <p className="text-charcoal-light">
                I&apos;m based in {siteConfig.location}. {hero.availability}.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex min-w-0 items-center gap-3 break-all text-charcoal-light transition-colors hover:text-gold-dark sm:break-normal"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  @
                </span>
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-charcoal-light transition-colors hover:text-gold-dark"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  ☎
                </span>
                {siteConfig.phone}
              </a>
              <p className="flex items-center gap-3 text-charcoal-light">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  📍
                </span>
                {siteConfig.location}
              </p>
            </div>

            <SocialLinks />
          </div>

          <form
            onSubmit={handleSubmit}
            className="reveal space-y-5 rounded-2xl border border-charcoal/8 bg-white p-5 shadow-sm sm:space-y-5 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-charcoal">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3 text-charcoal outline-none transition-colors focus:border-gold"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-charcoal">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-charcoal/15 bg-cream px-4 py-3 text-charcoal outline-none transition-colors focus:border-gold"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-charcoal">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                className="w-full resize-none rounded-xl border border-charcoal/15 bg-cream px-4 py-3 text-charcoal outline-none transition-colors focus:border-gold"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>

            {status === "success" && (
              <p className="text-center text-sm text-emerald-600" role="status">
                Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-center text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
