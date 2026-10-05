import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

describe("next.config", () => {
  it("exports a static site compatible with GitHub Pages", () => {
    expect(nextConfig.output).toBe("export");
    expect(nextConfig.trailingSlash).toBe(true);
    expect(nextConfig.images?.unoptimized).toBe(true);
  });

  it("reads basePath from NEXT_PUBLIC_BASE_PATH (empty by default)", () => {
    expect(nextConfig.basePath).toBe(process.env.NEXT_PUBLIC_BASE_PATH ?? "");
  });
});
