import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Panel } from "@/components/Panel";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SystemBar } from "@/components/SystemBar";
import { getContent } from "@/content";

export default function Home() {
  const content = getContent("es");
  const { sections, profile, ui } = content;
  const meta = (id: keyof typeof sections, value: string | number) => `${sections[id].metaLabel}: ${value}`;

  return (
    <>
      <SystemBar content={content} />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Hero content={content} />
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-8 sm:px-6">
          <Panel id="about" index={1} title={sections.about.title} meta={meta("about", profile.location)}>
            <About about={content.about} />
          </Panel>
          <Panel id="experience" index={2} title={sections.experience.title} meta={meta("experience", content.experience.length)}>
            <Experience items={content.experience} presentLabel={ui.present} />
          </Panel>
          <Panel id="projects" index={3} title={sections.projects.title} meta={meta("projects", content.projects.length)}>
            <Projects projects={content.projects} ui={ui} />
          </Panel>
          <Panel id="skills" index={4} title={sections.skills.title} meta={meta("skills", content.skills.length)}>
            <Skills groups={content.skills} />
          </Panel>
          <Panel id="education" index={5} title={sections.education.title} meta={meta("education", content.education.length)}>
            <Education items={content.education} />
          </Panel>
          <Panel id="contact" index={6} title={sections.contact.title} meta={meta("contact", content.contact.items.length)}>
            <Contact profile={profile} contact={content.contact} opensInNewTab={ui.opensInNewTab} />
          </Panel>
        </div>
      </main>
      <Footer ui={ui} />
    </>
  );
}
