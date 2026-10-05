import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("GitHub Pages workflow", () => {
  it("exists and uses the official Pages actions", () => {
    expect(existsSync(join(process.cwd(), ".github/workflows/deploy.yml"))).toBe(true);
    const wf = read(".github/workflows/deploy.yml");
    for (const action of ["actions/configure-pages", "actions/upload-pages-artifact", "actions/deploy-pages"]) {
      expect(wf).toContain(action);
    }
  });

  it("sets the base path from the repository name and disables Jekyll", () => {
    const wf = read(".github/workflows/deploy.yml");
    expect(wf).toContain("NEXT_PUBLIC_BASE_PATH");
    expect(wf).toContain("github.event.repository.name");
    expect(wf).toContain("out/.nojekyll");
    expect(wf).toContain("node-version-file: .nvmrc");
  });
});

describe("GitHub Pages workflow safety", () => {
  it("never cancels an in-flight Pages deployment", () => {
    const wf = read(".github/workflows/deploy.yml");
    expect(wf).toMatch(/group:\s*pages/);
    expect(wf).toMatch(/cancel-in-progress:\s*false/);
    expect(wf).not.toMatch(/cancel-in-progress:\s*true/);
  });

  it("scopes write permissions to the deploy job only", () => {
    const wf = read(".github/workflows/deploy.yml");
    const [top, jobs] = wf.split(/^jobs:/m);
    expect(top).toMatch(/contents:\s*read/);
    expect(top).not.toMatch(/pages:\s*write|id-token:\s*write/);
    const deploy = jobs.slice(jobs.indexOf("  deploy:"));
    expect(deploy).toMatch(/pages:\s*write/);
    expect(deploy).toMatch(/id-token:\s*write/);
  });
});

describe("README", () => {
  const readme = () => read("README.md");

  it("documents where to edit content and colours", () => {
    expect(readme()).toContain("src/content/es.ts");
    expect(readme()).toContain("src/styles/theme.css");
    for (const v of ["--c-bg", "--c-fg", "--c-accent", "--c-accent-2", "--c-alert"]) {
      expect(readme()).toContain(v);
    }
  });

  it("covers the three deploy targets and the pending site URL", () => {
    for (const term of ["Vercel", "Netlify", "GitHub Pages", "NEXT_PUBLIC_SITE_URL", "[COMPLETAR]"]) {
      expect(readme()).toContain(term);
    }
  });
});
