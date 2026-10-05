"use client";

import { useSyncExternalStore } from "react";
import { getServerTheme, getTheme, setTheme, subscribeTheme } from "@/lib/theme-store";

interface Props {
  labels: { toLight: string; toDark: string };
}

export function ThemeToggle({ labels }: Props) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-pressed={isLight}
      aria-label={isLight ? labels.toDark : labels.toLight}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="inline-flex h-9 w-9 items-center justify-center border border-line-strong text-accent transition-colors hover:bg-accent-soft"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        {isLight ? (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
