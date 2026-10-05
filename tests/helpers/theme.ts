import { readFileSync } from "node:fs";
import { join } from "node:path";
import { clampRgb, formatHex, interpolate, parse, wcagContrast } from "culori";

export const THEME_PATH = join(process.cwd(), "src/styles/theme.css");
export const readTheme = () => readFileSync(THEME_PATH, "utf8");

export type Mode = "dark" | "light";
type Vars = Record<string, string>;

/** Extract `--name: value;` declarations from the first rule whose selector matches. */
function declarations(css: string, selectorPattern: RegExp): Vars {
  const out: Vars = {};
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  for (const match of css.matchAll(ruleRe)) {
    if (!selectorPattern.test(match[1].trim())) continue;
    for (const d of match[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      out[d[1]] = d[2].trim();
    }
  }
  return out;
}

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

export function themeVars(mode: Mode): Vars {
  const css = stripComments(readTheme());
  const base = mode === "dark" ? /^:root,\s*\[data-theme="dark"\]$/ : /^\[data-theme="light"\]$/;
  return {
    ...declarations(css, /^:root$/),
    ...declarations(css, base),
  };
}

/** Evaluates `#hex`, `var(--x)` and opaque `color-mix(in oklch, A p%, B q%)` into a hex colour. */
export function resolveColor(value: string, vars: Vars): string {
  const v = value.trim();
  const ref = v.match(/^var\((--[\w-]+)\)$/);
  if (ref) return resolveColor(vars[ref[1]], vars);
  const mix = v.match(/^color-mix\(in oklch,\s*(.+)\)$/);
  if (mix) {
    const parts = splitTop(mix[1]).map((p) => {
      const m = p.trim().match(/^(.*?)(?:\s+(\d+(?:\.\d+)?)%)?$/)!;
      return { color: resolveColor(m[1], vars), pct: m[2] ? Number(m[2]) : undefined };
    });
    const [a, b] = parts;
    const pa = a.pct ?? (b.pct !== undefined ? 100 - b.pct : 50);
    const pb = b.pct ?? 100 - pa;
    const t = pb / (pa + pb);
    const mixed = interpolate([a.color, b.color], "oklch")(t);
    return formatHex(clampRgb(mixed));
  }
  if (!parse(v)) throw new Error(`Cannot resolve colour: ${value}`);
  return formatHex(parse(v)!);
}

function splitTop(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(cur);
      cur = "";
    } else cur += ch;
  }
  parts.push(cur);
  return parts;
}

export function contrast(mode: Mode, fg: string, bg: string): number {
  const vars = themeVars(mode);
  return wcagContrast(resolveColor(`var(${fg})`, vars), resolveColor(`var(${bg})`, vars));
}
