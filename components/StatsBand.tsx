const STATS = [
  { value: "66,738+", label: "Historical NBA games modeled" },
  { value: "41,176", label: "Customer records, causal study" },
  { value: "4", label: "End-to-end analytics projects" },
  { value: "1", label: "Hackathon finalist — Best Idea" },
];

export default function StatsBand() {
  return (
    <section aria-label="Impact at a glance" className="border-b border-line">
      <h2 className="sr-only">Impact at a glance</h2>
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 divide-y divide-line sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-line">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-6 py-8 sm:px-8">
            <p className="font-display text-3xl text-ink sm:text-[2rem]">{stat.value}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
