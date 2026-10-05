import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getContent } from "@/content";
import { KRONOGRAM_NAME } from "@/content/es";

const content = getContent("es");

describe("getContent", () => {
  it("defaults to the Spanish content", () => {
    expect(getContent()).toBe(content);
    expect(content.profile.name).toBe("Maximiliano González");
    expect(content.profile.title).toBe("Ingeniero de Software");
  });
});

describe("content safety", () => {
  const serialized = JSON.stringify(content);

  it("contains no phone-like pattern", () => {
    expect(serialized).not.toMatch(/\+\s?56/);
    expect(serialized).not.toMatch(/tel:/i);
    // URLs (e.g. the LinkedIn profile id) legitimately contain long digit runs.
    const withoutUrls = serialized.replace(/https?:\/\/[^"\s]+/g, "");
    expect(withoutUrls).not.toMatch(/\+?\d(?:[\s().-]?\d){7,}/);
  });

  it("derives every contact channel href from the profile (single source of truth)", () => {
    const hrefs = Object.fromEntries(content.contact.items.map((i) => [i.id, i.href]));
    expect(hrefs).toEqual({
      email: `mailto:${content.profile.email}`,
      linkedin: content.profile.linkedin,
      github: content.profile.github,
    });
  });

  it("exposes the exact public contact data", () => {
    expect(content.profile.email).toBe("mgryal.d@gmail.com");
    expect(content.profile.linkedin).toBe(
      "https://www.linkedin.com/in/maximiliano-gonzalez-67108418b",
    );
    expect(content.profile.github).toBe("https://github.com/mgryal");
  });

  it("gives work projects no links", () => {
    const work = content.projects.filter((p) => p.kind === "work");
    expect(work).toHaveLength(4);
    for (const project of work) expect(project.links).toBeUndefined();
  });

  it("has two experience entries with timeline data", () => {
    expect(content.experience).toHaveLength(2);
    expect(content.experience[0].end).toBeNull();
    expect(content.experience[0].start).toBe("2022.11");
    expect(content.experience[1].start).toBe("2020.12");
    expect(content.experience[1].end).toBe("2022.11");
  });

  it("has no category with percentage or level data", () => {
    for (const group of content.skills) {
      for (const item of group.items) expect(typeof item).toBe("string");
    }
  });
});

describe("Kronogram employer name", () => {
  it("is defined once and reused by the experience entry", () => {
    expect(content.experience[1].company).toBe(KRONOGRAM_NAME);
  });

  it("is not hardcoded anywhere else in src", () => {
    const hits: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path);
        else if (/\.(tsx?|css)$/.test(entry) && /Kronogram/.test(readFileSync(path, "utf8"))) {
          hits.push(path);
        }
      }
    };
    walk(join(process.cwd(), "src"));
    expect(hits.map((h) => h.replace(process.cwd() + "/", ""))).toEqual(["src/content/es.ts"]);
    const occurrences = readFileSync(join(process.cwd(), "src/content/es.ts"), "utf8").match(/Kronogram/g);
    expect(occurrences?.length).toBe(2); // the constant and its explanatory comment
  });
});
