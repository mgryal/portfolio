import { describe, expect, it } from "vitest";
import { contrast, readTheme, themeVars, type Mode } from "./helpers/theme";

const BASES = ["--c-bg", "--c-fg", "--c-accent", "--c-accent-2", "--c-alert"];
const MODES: Mode[] = ["dark", "light"];

describe("theme.css single-source palette", () => {
  it.each(MODES)("%s mode defines exactly the 5 base colours as hex", (mode) => {
    const vars = themeVars(mode);
    for (const name of BASES) expect(vars[name], name).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("keeps hex literals only inside the EDIT HERE block", () => {
    const [, afterEdit] = readTheme().split("/* ==== DERIVED");
    expect(afterEdit).toBeDefined();
    expect(afterEdit.replace(/\/\*[\s\S]*?\*\//g, "")).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it("derives every shade through color-mix from the base variables", () => {
    const vars = themeVars("dark");
    const derived = [
      "--surface", "--surface-2", "--line", "--line-strong", "--muted",
      "--accent-soft", "--accent-strong", "--accent-2-soft", "--glow",
      "--grad-accent", "--grad-surface", "--grid-color", "--scanline-color",
      "--selection-bg", "--focus-ring",
    ];
    for (const name of derived) {
      expect(vars[name], name).toBeDefined();
      expect(vars[name], name).toContain("color-mix(in oklch");
    }
  });

  describe.each(MODES)("WCAG AA contrast (%s)", (mode) => {
    const pairs: [string, string, string][] = [
      ["body text on page", "--c-fg", "--c-bg"],
      ["body text on surface", "--c-fg", "--surface"],
      ["body text on surface-2", "--c-fg", "--surface-2"],
      ["muted on page", "--muted", "--c-bg"],
      ["muted on surface", "--muted", "--surface"],
      ["muted on surface-2", "--muted", "--surface-2"],
      ["accent on page", "--c-accent", "--c-bg"],
      ["accent on surface", "--c-accent", "--surface"],
      ["accent-2 on page", "--c-accent-2", "--c-bg"],
      ["accent-2 on surface", "--c-accent-2", "--surface"],
      ["alert on page", "--c-alert", "--c-bg"],
    ];
    it.each(pairs)("%s >= 4.5:1", (_label, fg, bg) => {
      expect(contrast(mode, fg, bg)).toBeGreaterThanOrEqual(4.5);
    });
  });
});
