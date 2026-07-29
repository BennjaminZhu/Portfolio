export default function SectionMark({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 sm:mb-14">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
        {label}
      </h2>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
