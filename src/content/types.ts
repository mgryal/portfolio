/** Supported locales. Add `'en'` here and create `en.ts` to translate the site. */
export type Locale = "es";

export type SectionId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "contact";

export interface SectionCopy {
  /** Visible heading, e.g. "Experiencia". */
  title: string;
  /** Decorative microtext label; the count is appended by the component. */
  metaLabel: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  /** Timeline start as `YYYY.MM`. */
  start: string;
  /** Timeline end as `YYYY.MM`, or `null` when the role is current. */
  end: string | null;
  /** Human readable period, e.g. "Nov 2022 – Presente". */
  periodLabel: string;
  context: string;
  highlights: string[];
}

export interface Project {
  id: string;
  kind: "work" | "personal";
  title: string;
  summary: string;
  /** Technologies actually used; never invent entries. */
  tags: string[];
  /** Optional links. Work projects are private and must not define them. */
  links?: { demo?: string; repo?: string };
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  mention: string;
  institution: string;
  period: string;
}

export interface SiteContent {
  locale: Locale;
  profile: {
    name: string;
    title: string;
    location: string;
    shortPhrase: string;
    email: string;
    linkedin: string;
    github: string;
  };
  brand: { prompt: string };
  nav: { label: string; items: { id: SectionId; label: string }[] };
  sections: Record<SectionId, SectionCopy>;
  hero: { greeting: string; ctaProjects: string; ctaContact: string };
  about: { paragraphs: string[]; interestsLabel: string; interests: string };
  experience: ExperienceItem[];
  projects: Project[];
  skills: SkillGroup[];
  education: EducationItem[];
  contact: {
    intro: string;
    items: { id: "email" | "linkedin" | "github"; label: string; display: string }[];
  };
  seo: {
    title: string;
    description: string;
    siteName: string;
    ogLocale: string;
    ogImageAlt: string;
  };
  ui: {
    skipToContent: string;
    statusOnline: string;
    present: string;
    privateProject: string;
    opensInNewTab: string;
    projectsLinks: { demo: string; repo: string };
    theme: { toLight: string; toDark: string };
    menu: { open: string; close: string };
    footer: { lines: string[]; rights: string };
  };
}
