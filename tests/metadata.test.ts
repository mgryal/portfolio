import { describe, expect, it } from "vitest";
import { buildMetadata, resolveSiteUrl } from "@/lib/metadata";
import { getContent } from "@/content";

const content = getContent("es");

describe("buildMetadata", () => {
  const meta = buildMetadata(content, "https://example.com");

  it("uses the SEO copy from the content file", () => {
    expect(meta.title).toBe("Maximiliano González — Ingeniero de Software");
    expect(meta.description).toBe(content.seo.description);
  });

  it("sets Open Graph and Twitter card for es_CL", () => {
    expect(meta.openGraph).toMatchObject({
      type: "website",
      locale: "es_CL",
      title: content.seo.title,
      description: content.seo.description,
    });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: content.seo.title });
  });

  it("derives metadataBase from the site URL", () => {
    expect(String(meta.metadataBase)).toBe("https://example.com/");
  });

  it("does not leak a phone number", () => {
    expect(JSON.stringify(meta)).not.toMatch(/\+56|tel:/);
  });
});

describe("resolveSiteUrl", () => {
  it("falls back to a placeholder and appends the base path", () => {
    expect(resolveSiteUrl(undefined, "")).toBe("https://example.com");
    expect(resolveSiteUrl("https://mgryal.github.io", "/portfolio")).toBe("https://mgryal.github.io/portfolio");
    expect(resolveSiteUrl("https://mgryal.github.io/", "")).toBe("https://mgryal.github.io");
  });
});
