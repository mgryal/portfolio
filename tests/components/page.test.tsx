import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "@/app/page";
import { getContent } from "@/content";

const content = getContent("es");

describe("Home page", () => {
  it("has semantic landmarks and a single h1 with the name", () => {
    render(<Page />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(content.profile.name);
  });

  it("renders every section as a named region", () => {
    render(<Page />);
    for (const id of Object.keys(content.sections) as (keyof typeof content.sections)[]) {
      expect(screen.getByRole("region", { name: new RegExp(content.sections[id].title, "i") })).toBeInTheDocument();
    }
  });

  it("renders skills as tag chips without percentages", () => {
    const { container } = render(<Page />);
    expect(screen.getByText("Lenguajes")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\d+\s?%/);
  });

  it("renders the four work projects with a private note and no project links", () => {
    render(<Page />);
    expect(screen.getAllByText(content.ui.privateProject)).toHaveLength(4);
    const workProjects = content.projects.filter((p) => p.kind === "work");
    expect(workProjects).toHaveLength(4);
    for (const project of workProjects) {
      expect(project.links).toBeUndefined();
      const card = screen.getByRole("heading", { name: project.title }).closest("article") as HTMLElement;
      expect(card).not.toBeNull();
      expect(within(card).queryAllByRole("link")).toHaveLength(0);
    }
  });
});
