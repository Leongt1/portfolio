"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || "Transmission failed. Try again.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Transmission failed. Try again.");
    }
  }

  const inputClass =
    "w-full border border-hud-line2 bg-hud-panel2 px-4 py-3 text-sm text-hud-text placeholder:text-hud-dim focus:border-hud-cyan focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      {/* Honeypot — hidden from real users */}
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs tracking-[0.2em] text-hud-muted">
            CALLSIGN {"//"} NAME
          </span>
          <input name="name" required minLength={2} maxLength={200} placeholder="Jane Doe" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs tracking-[0.2em] text-hud-muted">
            FREQUENCY {"//"} EMAIL
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={320}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block font-mono text-xs tracking-[0.2em] text-hud-muted">
          TRANSMISSION {"//"} MESSAGE
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What are we building?"
          className={`${inputClass} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="hud-btn hud-btn-outline px-8 py-3 font-mono text-sm tracking-[0.2em] font-semibold disabled:opacity-50 disabled:pointer-events-none"
        >
          {status === "sending" ? "TRANSMITTING…" : "SEND TRANSMISSION"}
        </button>
        <p role="status" aria-live="polite" className="font-mono text-xs tracking-[0.15em]">
          {status === "sent" && <span className="text-hud-cyan">✓ MESSAGE RECEIVED — I&apos;LL GET BACK TO YOU SOON.</span>}
          {status === "error" && <span className="text-hud-red">{errorMsg.toUpperCase()}</span>}
        </p>
      </div>
    </form>
  );
}
