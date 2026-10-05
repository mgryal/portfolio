import { describe, expect, it } from "vitest";
import { palette } from "@/styles/palette";
import { themeVars } from "./helpers/theme";

describe("palette.ts mirrors theme.css (used by the OG image)", () => {
  it.each(["dark", "light"] as const)("%s base colours match", (mode) => {
    const vars = themeVars(mode);
    expect(palette[mode]).toEqual({
      bg: vars["--c-bg"],
      fg: vars["--c-fg"],
      accent: vars["--c-accent"],
      accent2: vars["--c-accent-2"],
      alert: vars["--c-alert"],
    });
  });
});
