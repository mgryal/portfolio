import type { SiteContent } from "@/content/types";

export function Footer({ ui }: { ui: SiteContent["ui"] }) {
  return (
    <footer className="mx-auto max-w-5xl px-4 pb-10 pt-12 text-xs text-muted sm:px-6">
      <ul className="space-y-1 border-t border-dashed border-line pt-4">
        {ui.footer.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-3">© {new Date().getFullYear()} {ui.footer.rights}</p>
    </footer>
  );
}
