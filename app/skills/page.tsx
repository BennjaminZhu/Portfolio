import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionMark from "@/components/SectionMark";
import { buildingTowardNext, skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Benjamin Zhu's skills by category, each linked to the project that actually demonstrates it.",
};

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10 sm:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Skills
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Tools, grouped by what they&apos;re actually for.
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-muted">
              Every &ldquo;Proficient&rdquo; tag below links to the project
              that used it. If there&apos;s no link, I haven&apos;t shipped
              anything with it yet — it&apos;s working knowledge, not a
              claim.
            </p>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
            <SectionMark label="By category" />
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {skillCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-[220px_1fr_200px] lg:items-start lg:gap-8"
                >
                  <div>
                    <h3 className="font-display text-xl text-ink">{cat.name}</h3>
                    <span
                      className={`mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.1em] ${
                        cat.level === "Proficient" ? "text-accent" : "text-ink-muted"
                      }`}
                    >
                      {cat.level}
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-2 self-start">
                    {cat.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-[3px] border border-line bg-paper-deep/60 px-3 py-1.5 font-mono text-xs text-ink"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted/70">
                      Evidence
                    </span>
                    {cat.evidence.length > 0 ? (
                      cat.evidence.map((e) => (
                        <Link
                          key={e.href}
                          href={e.href}
                          className="text-xs text-ink-muted transition-colors hover:text-accent"
                        >
                          {e.label} →
                        </Link>
                      ))
                    ) : (
                      <span className="text-xs italic text-ink-muted/70">
                        No shipped project yet
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-paper-deep/40">
          <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
            <SectionMark label="Building toward next" />
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
              Gaps I know about and am actively closing — not everything
              belongs on a resume yet.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {buildingTowardNext.map((item) => (
                <li
                  key={item}
                  className="rounded-[3px] border border-dashed border-line px-3 py-1.5 font-mono text-xs text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
