"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import { ThemeToggle } from "./ThemeToggle";

export function SystemBar({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { nav, brand, ui } = content;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <a href="#main" className="font-display text-xl tracking-wide text-accent">
          {brand.prompt}
        </a>

        <nav aria-label={nav.label} className="ml-auto md:mx-auto">
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label={open ? ui.menu.close : ui.menu.open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border border-line-strong text-accent md:hidden"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
          <ul
            id="primary-menu"
            className={`${
              open ? "flex" : "hidden"
            } absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-bg px-4 py-3 md:static md:flex md:flex-row md:gap-5 md:border-0 md:bg-transparent md:p-0`}
          >
            {nav.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-1 py-2 text-sm text-muted transition-colors hover:text-accent md:py-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <span className="hidden items-center gap-2 text-xs tracking-[0.15em] text-muted lg:inline-flex">
          <i className="status-dot" aria-hidden="true" />
          {ui.statusOnline}
        </span>
        <ThemeToggle labels={ui.theme} />
      </div>
    </header>
  );
}
