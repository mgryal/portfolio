export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-bg focus:px-4 focus:py-2 focus:text-accent focus:outline focus:outline-2 focus:outline-accent-2"
    >
      {label}
    </a>
  );
}
