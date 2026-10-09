"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), message: data.get("message") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message couldn’t be sent. Please email me directly.");
      setStatus("success");
      setMessage("Message received. Thanks for reaching out!");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please email me directly.");
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Your name<input autoComplete="name" name="name" placeholder="Alex Morgan" required minLength={2} maxLength={100} /></label><label>Email address<input autoComplete="email" name="email" type="email" placeholder="alex@company.com" required maxLength={254} /></label></div>
    <label>What are you thinking?<textarea name="message" rows={3} placeholder="A role, a project, or an interesting problem…" required minLength={10} maxLength={2000} /></label>
    <div className="form-bottom"><span className="mono">Good conversations start here.</span><button type="submit" className="pill-button coral" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send a message"}<span aria-hidden="true">↗</span></button></div>
    <p className={`form-status ${status}`} role={status === "error" ? "alert" : "status"}>{message}</p>
  </form>;
}
