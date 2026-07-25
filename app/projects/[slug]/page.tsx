import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyContent from "@/components/CaseStudyContent";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Benjamin Zhu`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const blocks = caseStudies[slug];

  if (!project || !blocks) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <article className="border-b border-line">
          <div className="mx-auto max-w-[840px] px-6 py-16 sm:px-10 sm:py-24">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-accent"
            >
              ← Back to work
            </Link>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {project.type}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
              {project.linkLabel}
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

            <div className="mt-14">
              <CaseStudyContent blocks={blocks} />
            </div>
          </div>
        </article>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
