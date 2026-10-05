import type { Project } from "@/content/types";
import { ExternalLink } from "./ExternalLink";

interface Props {
  project: Project;
  labels: { privateProject: string; demo: string; repo: string; opensInNewTab: string };
}

const linkClass = "text-sm text-accent underline decoration-line-strong underline-offset-4 hover:text-accent-strong";

export function ProjectCard({ project, labels }: Props) {
  const { links } = project;
  return (
    <article className="flex h-full flex-col border border-line bg-surface p-5 transition-colors hover:border-line-strong">
      <h3 className="text-base font-semibold text-fg">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
        {project.tags.map((tag) => (
          <li key={tag} className="border border-line-strong bg-accent-soft px-2 py-0.5 text-xs text-accent">
            {tag}
          </li>
        ))}
      </ul>
      {project.kind === "work" ? (
        <p className="mt-4 text-xs tracking-wide text-muted">{labels.privateProject}</p>
      ) : null}
      {links?.demo || links?.repo ? (
        <div className="mt-4 flex gap-4">
          {links.demo ? (
            <ExternalLink href={links.demo} opensInNewTab={labels.opensInNewTab} className={linkClass}>
              {labels.demo}
            </ExternalLink>
          ) : null}
          {links.repo ? (
            <ExternalLink href={links.repo} opensInNewTab={labels.opensInNewTab} className={linkClass}>
              {labels.repo}
            </ExternalLink>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
