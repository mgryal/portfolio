import type { SiteContent } from "@/content/types";

export function About({ about }: { about: SiteContent["about"] }) {
  return (
    <>
      <div className="max-w-3xl space-y-4">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="mt-6 flex flex-wrap gap-x-3 border-t border-dashed border-line pt-4 text-sm">
        <dt className="text-accent">{about.interestsLabel}:</dt>
        <dd className="text-muted">{about.interests}</dd>
      </dl>
    </>
  );
}
