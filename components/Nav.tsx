"use client";

import { useState } from "react";

const links = [
  { href: "#home", label: "HOME" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#skills", label: "SKILLS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-hud-line bg-hud-bg/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href="#home"
          className="font-mono text-lg tracking-[0.2em] text-hud-text"
          aria-label="Noel George Thomas — home"
        >
          NGT<span className="text-hud-red">{"//"}</span>
        </a>

        <ul className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hud-underline font-mono text-xs tracking-[0.25em] text-hud-muted hover:text-hud-text transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="sm:hidden flex flex-col justify-center gap-1.5 p-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-hud-text transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`block h-0.5 w-6 bg-hud-text ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-6 bg-hud-text transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="sm:hidden border-t border-hud-line bg-hud-panel px-6 py-4 space-y-4"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block font-mono text-sm tracking-[0.25em] text-hud-muted hover:text-hud-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
