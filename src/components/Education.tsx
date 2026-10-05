import type { EducationItem } from "@/content/types";

export function Education({ items }: { items: EducationItem[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.id}>
          <h3 className="text-base font-semibold text-fg">{item.degree}</h3>
          <p className="text-sm text-accent">{item.mention}</p>
          <p className="text-sm text-muted">
            {item.institution} · {item.period}
          </p>
        </li>
      ))}
    </ul>
  );
}
