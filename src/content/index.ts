import { es } from "./es";
import type { Locale, SiteContent } from "./types";

const catalog: Record<Locale, SiteContent> = { es };

/** Returns the site copy for a locale. Add new locales to `catalog`. */
export function getContent(locale: Locale = "es"): SiteContent {
  return catalog[locale];
}

export type { Locale, SiteContent } from "./types";
