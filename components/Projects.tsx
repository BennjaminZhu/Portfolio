import { projects } from "@/data/projects";
import Reveal from "./Reveal";
import SectionMark from "./SectionMark";

export default function Projects() {
  return (
    <section id="work" className="border-b border-line bg-paper-deep/40">
      <div className="mx-auto max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <SectionMark label="Selected work" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 100}>
              <article className="group flex h-full flex-col rounded-[4px] border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_30px_-18px_rgba(27,42,46,0.35)]">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {project.type}
                </span>
                <h3 className="mt-3 font-display text-2xl text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-muted">
                  {project.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors group-hover:text-accent">
                  {project.linkLabel}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
