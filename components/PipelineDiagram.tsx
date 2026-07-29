export default function PipelineDiagram({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  return (
    <div className="print-avoid-break rounded-[4px] border border-line bg-paper p-6 sm:p-7">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
        {title}
      </p>
      <ol className="mt-6 flex flex-col">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={step} className="relative pb-6 pl-8 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-[9px] top-[20px] h-[calc(100%-14px)] w-px bg-line"
                  aria-hidden="true"
                />
              )}
              <span
                className={`absolute left-0 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full border font-mono text-[9px] ${
                  isLast
                    ? "border-accent text-accent"
                    : "border-line text-ink-muted"
                } bg-paper`}
              >
                {i + 1}
              </span>
              <p
                className={`text-sm leading-snug ${
                  isLast ? "font-medium text-accent" : "text-ink"
                }`}
              >
                {step}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
