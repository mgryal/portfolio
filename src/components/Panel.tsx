import type { ReactNode } from "react";

interface Props {
  id: string;
  index: number;
  title: string;
  /** Decorative microtext, e.g. "REGISTROS: 2". Hidden from assistive tech. */
  meta?: string;
  children: ReactNode;
}

export function Panel({ id, index, title, meta, children }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className="panel">
      <div className="flex items-center gap-3 border-b border-dashed border-line px-5 py-3 text-xs tracking-[0.15em] sm:px-8">
        <span aria-hidden="true" className="text-accent">
          {`// ${String(index).padStart(2, "0")} —`}
        </span>
        <h2 id={headingId} className="font-display text-xl uppercase tracking-[0.12em] text-fg sm:text-2xl">
          {title}
        </h2>
        {meta ? (
          <span aria-hidden="true" className="ml-auto hidden text-muted sm:inline">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="px-5 py-6 sm:px-8 sm:py-8">{children}</div>
    </section>
  );
}
