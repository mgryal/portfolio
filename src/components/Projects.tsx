import type { SiteContent } from "@/content/types";
import { ProjectCard } from "./ProjectCard";

export function Projects({ projects, ui }: { projects: SiteContent["projects"]; ui: SiteContent["ui"] }) {
  const labels = {
    privateProject: ui.privateProject,
    demo: ui.projectsLinks.demo,
    repo: ui.projectsLinks.repo,
    opensInNewTab: ui.opensInNewTab,
  };
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} labels={labels} />
        </li>
      ))}
    </ul>
  );
}
