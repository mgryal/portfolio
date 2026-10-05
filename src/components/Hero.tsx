import type { SiteContent } from "@/content/types";
import { TypedText } from "./TypedText";

export function Hero({ content }: { content: SiteContent }) {
  const { profile, hero } = content;
  return (
    <section aria-labelledby="hero-title" className="relative px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm tracking-[0.15em] text-muted">{hero.greeting}</p>
        <h1 id="hero-title" className="mt-3 font-display text-6xl uppercase leading-none tracking-wide text-fg [text-shadow:var(--glow)] sm:text-8xl">
          <span className="glitch" data-text={profile.name}>
            {profile.name}
          </span>
        </h1>
        <p className="mt-4 bg-clip-text font-display text-2xl uppercase tracking-[0.15em] text-transparent [background-image:var(--grad-accent)] sm:text-4xl">
          {profile.title}
        </p>
        <p className="mt-1 text-sm text-muted">{profile.location}</p>
        <div className="mt-8 max-w-2xl">
          <TypedText text={profile.shortPhrase} />
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="cmd">
            {hero.ctaProjects}
          </a>
          <a href="#contact" className="cmd cmd--ghost">
            {hero.ctaContact}
          </a>
        </div>
      </div>
    </section>
  );
}
