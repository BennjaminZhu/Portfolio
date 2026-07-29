import Image from "next/image";
import type { ContentBlock } from "@/data/caseStudies";
import PipelineDiagram from "./PipelineDiagram";

export default function CaseStudyContent({
  blocks,
}: {
  blocks: ContentBlock[];
}) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="max-w-2xl text-lg leading-relaxed text-ink-muted"
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={i}
                className="pt-2 font-display text-2xl text-ink sm:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "list":
            return (
              <ul key={i} className="max-w-2xl space-y-3">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-lg leading-relaxed text-ink-muted"
                  >
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "stats":
            return (
              <div
                key={i}
                className="print-avoid-break grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-3"
              >
                {block.items.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl text-accent">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "summary":
            return (
              <div
                key={i}
                className="print-avoid-break rounded-[4px] border border-line bg-paper-deep/50 p-6 sm:p-7"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  TL;DR
                </p>
                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                      The question
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">
                      {block.question}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                      The finding
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">
                      {block.headline}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                      So what
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">
                      {block.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            );

          case "diagram":
            return <PipelineDiagram key={i} title={block.title} steps={block.steps} />;

          case "image":
            return (
              <figure
                key={i}
                className="print-avoid-break overflow-hidden rounded-[4px] border border-line bg-white"
              >
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={1600}
                  height={900}
                  className="w-full"
                  sizes="(min-width: 1024px) 900px, 100vw"
                />
                <figcaption className="border-t border-line px-5 py-4 font-mono text-xs leading-relaxed text-ink-muted">
                  {block.caption}
                </figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
