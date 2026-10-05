import type { SkillGroup } from "@/content/types";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.id}>
          <h3 className="text-sm font-semibold tracking-wide text-accent-2">
            <span aria-hidden="true" className="mr-2 text-muted">
              drwxr-xr-x
            </span>
            {group.label}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item} className="border border-line-strong bg-surface-2 px-2.5 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
