import Reveal from "./Reveal";
import SectionMark from "./SectionMark";

const LINKS = [
  {
    label: "Email",
    value: "benjaminzhu25123@outlook.com",
    href: "mailto:benjaminzhu25123@outlook.com",
  },
  {
    label: "Based in",
    value: "Shenzhen, China · U.S. Citizen",
    href: "#contact",
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <SectionMark label="Contact" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
              Have an internship, a dataset, or a question worth digging
              into?
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              I&apos;d like to hear about it. I usually reply within a day or
              two.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-4">
              {LINKS.map((link) => (
                <li key={link.label} className="border-b border-line pb-4">
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-4"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                      {link.label}
                    </span>
                    <span className="text-ink transition-colors group-hover:text-accent">
                      {link.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
