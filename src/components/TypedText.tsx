"use client";

import { useEffect, useRef } from "react";

/**
 * Terminal typing effect. The full text is always in the DOM for screen
 * readers (and for no-JS / reduced-motion users); only the visual copy animates.
 */
export function TypedText({ text }: { text: string }) {
  const visual = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = visual.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = text;
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    el.textContent = "";
    const tick = () => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i < text.length) timer = setTimeout(tick, 28 + Math.random() * 40);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <p className="min-h-[3.4em] text-base text-accent sm:text-lg">
      <span className="sr-only">{text}</span>
      <span ref={visual} aria-hidden="true" className="cursor">
        {text}
      </span>
    </p>
  );
}
