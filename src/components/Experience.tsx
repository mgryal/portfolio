import type { ExperienceItem } from "@/content/types";

interface Props {
  items: ExperienceItem[];
  presentLabel: string;
}

export function Experience({ items, presentLabel }: Props) {
  return (
    <ol className="relative space-y-10 border-l border-line-strong pl-6 sm:pl-8">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span aria-hidden="true" className="absolute -left-[1.95rem] top-2 h-2.5 w-2.5 bg-accent sm:-left-[2.45rem]" />
          <p aria-hidden="true" className="text-xs tracking-[0.1em] text-accent-2">
            {`[${item.start} → ${item.end ?? presentLabel}]`}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-fg">
            {item.role} <span className="text-accent">@ {item.company}</span>
          </h3>
          <p className="text-sm text-muted">
            {item.periodLabel} · {item.location}
          </p>
          <p className="mt-3 max-w-3xl text-sm text-muted">{item.context}</p>
          <ul className="mt-4 space-y-2">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" className="select-none text-accent">
                  &gt;
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
