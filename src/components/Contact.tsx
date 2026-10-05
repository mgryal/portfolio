import type { ContactChannel, SiteContent } from "@/content/types";
import { ExternalLink } from "./ExternalLink";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

interface Props {
  contact: SiteContent["contact"];
  opensInNewTab: string;
}

const linkClass =
  "inline-flex items-center gap-3 border border-line-strong px-4 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent";

const icons: Record<ContactChannel["id"], () => React.JSX.Element> = {
  email: MailIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

export function Contact({ contact, opensInNewTab }: Props) {
  return (
    <>
      <p className="max-w-2xl">{contact.intro}</p>
      <ul className="mt-6 flex flex-wrap gap-4">
        {contact.items.map((item) => {
          const Icon = icons[item.id];
          const inner = (
            <>
              <Icon />
              <span>
                {item.label}: <span className="text-muted">{item.display}</span>
              </span>
            </>
          );
          return (
            <li key={item.id}>
              {item.external ? (
                <ExternalLink href={item.href} opensInNewTab={opensInNewTab} className={linkClass}>
                  {inner}
                </ExternalLink>
              ) : (
                <a href={item.href} className={linkClass}>
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
