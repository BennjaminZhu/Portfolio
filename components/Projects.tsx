import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import FlowPreview from "./FlowPreview";
import Reveal from "./Reveal";
import SectionMark from "./SectionMark";

const FALLBACK_STEPS: Record<string, string[]> = {
  "nba-matchup-predictor": ["Data", "Clean", "Features", "Train", "Predict"],
  "cathay-hackathon": ["Research", "Synthesis", "Strategy", "Pitch", "Finalist"],
};

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
              <div className="group print-avoid-break flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_30px_-18px_rgba(27,42,46,0.35)]">
                <Link
                  href={project.href}
                  className="relative block aspect-[16/9] w-full overflow-hidden border-b border-line bg-paper-deep/60"
                >
                  {project.previewImage ? (
                    <Image
                      src={project.previewImage}
                      alt={`${project.title} — preview chart`}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <FlowPreview steps={FALLBACK_STEPS[project.slug] ?? []} />
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-7">
                  <Link href={project.href} className="group/title">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {project.type}
                    </span>
                    <h3 className="mt-3 font-display text-2xl text-ink transition-colors group-hover/title:text-accent">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {project.problem}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-[3px] border border-line px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-baseline gap-2.5 rounded-[3px] border border-line bg-paper-deep/60 px-3.5 py-2.5">
                    <span className="font-display text-lg leading-none text-accent">
                      {project.metric.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                      {project.metric.label}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-line pt-4">
                    <div className="flex items-center gap-5">
                      <Link
                        href={project.href}
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-accent"
                      >
                        Read case study
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-accent"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-ink-muted/70">
                      {project.linkLabel}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
