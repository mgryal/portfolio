import type { SiteContent } from "@/content/types";
import { ExternalLink } from "./ExternalLink";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

interface Props {
  profile: SiteContent["profile"];
  contact: SiteContent["contact"];
  opensInNewTab: string;
}

const linkClass =
  "inline-flex items-center gap-3 border border-line-strong px-4 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent";

export function Contact({ profile, contact, opensInNewTab }: Props) {
  const byId = Object.fromEntries(contact.items.map((i) => [i.id, i]));
  return (
    <>
      <p className="max-w-2xl">{contact.intro}</p>
      <ul className="mt-6 flex flex-wrap gap-4">
        <li>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            <MailIcon />
            <span>
              {byId.email.label}: <span className="text-muted">{byId.email.display}</span>
            </span>
          </a>
        </li>
        <li>
          <ExternalLink href={profile.linkedin} opensInNewTab={opensInNewTab} className={linkClass}>
            <LinkedinIcon />
            <span>
              {byId.linkedin.label}: <span className="text-muted">{byId.linkedin.display}</span>
            </span>
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={profile.github} opensInNewTab={opensInNewTab} className={linkClass}>
            <GithubIcon />
            <span>
              {byId.github.label}: <span className="text-muted">{byId.github.display}</span>
            </span>
          </ExternalLink>
        </li>
      </ul>
    </>
  );
}
