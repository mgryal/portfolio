import type { Metadata } from "next";
import type { SiteContent } from "@/content/types";

/** [COMPLETAR] URL final: set NEXT_PUBLIC_SITE_URL at build time. */
const PLACEHOLDER_SITE_URL = "https://example.com";

export function resolveSiteUrl(siteUrl: string | undefined, basePath: string): string {
  const base = (siteUrl || PLACEHOLDER_SITE_URL).replace(/\/+$/, "");
  return `${base}${basePath}`;
}

export function buildMetadata(content: SiteContent, siteUrl: string): Metadata {
  const { seo } = content;
  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      siteName: seo.siteName,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}
