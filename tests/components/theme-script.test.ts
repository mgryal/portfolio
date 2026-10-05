import { beforeEach, describe, expect, it, vi } from "vitest";
import { THEME_SCRIPT } from "@/lib/theme-script";

function run(prefersLight: boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({ matches: prefersLight && q.includes("light") }));
  new Function(THEME_SCRIPT)();
}

describe("THEME_SCRIPT (runs in <head> before paint)", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  it("uses the system preference on first visit", () => {
    run(true);
    expect(document.documentElement.dataset.theme).toBe("light");
    run(false);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("prefers the stored choice over the system preference", () => {
    localStorage.setItem("theme", "dark");
    run(true);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("falls back to dark when storage and matchMedia fail", () => {
    vi.stubGlobal("matchMedia", () => {
      throw new Error("nope");
    });
    new Function(THEME_SCRIPT)();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
