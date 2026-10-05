/**
 * Mirror of the base colours in theme.css. The Open Graph image is rendered at
 * build time and cannot read CSS variables, so it imports these values.
 * tests/palette.test.ts fails if this file drifts from theme.css.
 */
export const palette = {
  dark: {
    bg: "#03080a",
    fg: "#c4dccb",
    accent: "#39ff6a",
    accent2: "#ffb000",
    alert: "#ff3b3b",
  },
  light: {
    bg: "#f3f0e6",
    fg: "#1a1f16",
    accent: "#0b6b2a",
    accent2: "#8a4b00",
    alert: "#b3201f",
  },
} as const;
