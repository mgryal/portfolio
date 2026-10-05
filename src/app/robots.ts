import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const site = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.NEXT_PUBLIC_BASE_PATH ?? "");
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site}/sitemap.xml` };
}
