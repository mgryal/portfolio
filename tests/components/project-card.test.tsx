import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/ProjectCard";
import { getContent } from "@/content";
import type { Project } from "@/content/types";

const { ui } = getContent("es");
const labels = {
  privateProject: ui.privateProject,
  demo: ui.projectsLinks.demo,
  repo: ui.projectsLinks.repo,
  opensInNewTab: ui.opensInNewTab,
};

const base: Project = {
  id: "x",
  kind: "personal",
  title: "Demo project",
  summary: "Summary",
  tags: ["TypeScript"],
};

describe("ProjectCard", () => {
  it("renders no links when the project has none", () => {
    render(<ProjectCard project={base} labels={labels} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("renders demo and repo links only when provided", () => {
    const links = { demo: "https://example.com", repo: "https://github.com/x/y" };
    render(<ProjectCard project={{ ...base, links }} labels={labels} />);
    const demo = screen.getByRole("link", { name: /Demo/ });
    const repo = screen.getByRole("link", { name: /Repositorio/ });
    expect(demo).toHaveAttribute("href", links.demo);
    expect(repo).toHaveAttribute("href", links.repo);
    expect(demo).toHaveAttribute("rel", "noopener noreferrer");
    expect(demo).toHaveTextContent(ui.opensInNewTab);
  });

  it("renders only the link that exists", () => {
    render(<ProjectCard project={{ ...base, links: { repo: "https://github.com/x/y" } }} labels={labels} />);
    expect(screen.queryByRole("link", { name: /Demo/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Repositorio/ })).toBeInTheDocument();
  });

  it("marks work projects as private and shows tags", () => {
    render(<ProjectCard project={{ ...base, kind: "work" }} labels={labels} />);
    expect(screen.getByText(ui.privateProject)).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
