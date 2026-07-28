import Image from "next/image";
import type { ContentBlock } from "@/data/caseStudies";

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
