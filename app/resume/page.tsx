import type { Metadata } from "next";
import Image from "next/image";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Benjamin Zhu's resume — data & business analytics, machine learning, and causal inference.",
};

const RESUME_PDF = "/resume/Benjamin-Zhu-Resume.pdf";

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10 sm:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Resume
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Benjamin Zhu
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
              Data &amp; Business Analytics · The Chinese University of Hong
              Kong, Shenzhen · Expected May 2028
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={RESUME_PDF}
                download="Benjamin-Zhu-Resume.pdf"
                className="rounded-[3px] bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-accent"
              >
                Download PDF
              </a>
              <a
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[3px] border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Open in new tab
              </a>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">
              Single-column, plain-text formatting — built to parse cleanly
              in an applicant tracking system, not just look good on screen.
            </p>
          </div>
        </section>

        <section className="border-b border-line bg-paper-deep/40">
          <div className="mx-auto max-w-[720px] px-6 py-14 sm:px-10 sm:py-20">
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-[4px] border border-line bg-white shadow-[0_12px_30px_-18px_rgba(27,42,46,0.35)] transition-opacity hover:opacity-90"
              aria-label="Open the full resume PDF in a new tab"
            >
              <Image
                src="/resume/resume-preview.png"
                alt="Preview of Benjamin Zhu's resume, page 1"
                width={1530}
                height={1980}
                className="w-full"
                sizes="(min-width: 720px) 720px, 100vw"
                priority
              />
            </a>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
