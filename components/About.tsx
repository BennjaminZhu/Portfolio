import Reveal from "./Reveal";
import SectionMark from "./SectionMark";

const SKILLS = [
  "Python",
  "SQL (MySQL)",
  "R",
  "Pandas",
  "scikit-learn",
  "XGBoost",
  "Power BI",
  "Tableau",
  "Matplotlib",
  "Excel",
  "A/B testing",
  "Causal analysis",
  "Feature engineering",
  "Temporal validation",
];

export default function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <SectionMark label="About" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div className="max-w-xl space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>
                I&apos;m a data and business analytics student pursuing a{" "}
                <span className="text-ink">
                  BBA in AI Marketing at The Chinese University of Hong
                  Kong, Shenzhen
                </span>{" "}
                (expected May 2028). I like turning ambiguous business
                questions into clean, testable ones — comfortable enough in
                the model to trust it, and clear enough in the writeup that
                other people trust it too.
              </p>
              <p>
                My work runs from{" "}
                <em className="font-display not-italic text-ink">
                  validated data pipelines and predictive models
                </em>{" "}
                to causal inference and SHAP-explained recommendations.
                Before university I spent six years helping manage a
                family restaurant in Louisiana — where I learned that
                analysis only matters if it changes what someone does next.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
                Tools &amp; methods
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {SKILLS.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-[3px] border border-line bg-paper-deep/60 px-3 py-1.5 font-mono text-xs text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
