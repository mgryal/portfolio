import type { ReactNode } from "react";

interface Props {
  href: string;
  opensInNewTab: string;
  className?: string;
  children: ReactNode;
}

export function ExternalLink({ href, opensInNewTab, className, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {opensInNewTab}</span>
    </a>
  );
}
