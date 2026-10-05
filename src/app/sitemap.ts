import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.NEXT_PUBLIC_BASE_PATH ?? "");
  return [{ url: `${site}/`, changeFrequency: "monthly", priority: 1 }];
}
