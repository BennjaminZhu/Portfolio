export default function FlowPreview({ steps }: { steps: string[] }) {
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-2 px-6">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step} className="flex items-center gap-1.5">
            <span
              className={`rounded-[3px] border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] ${
                isLast
                  ? "border-accent/60 text-accent"
                  : "border-line text-ink-muted"
              }`}
            >
              {step}
            </span>
            {!isLast && (
              <span className="text-ink-muted/60" aria-hidden="true">
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
