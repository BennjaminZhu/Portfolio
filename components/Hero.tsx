const POINTS: [number, number][] = [
  [20, 260],
  [80, 230],
  [140, 245],
  [200, 190],
  [260, 205],
  [320, 140],
  [380, 110],
  [440, 70],
];

const GRID_Y = [60, 120, 180, 240, 300];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-6 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="border-l border-line pl-6 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Data &amp; Business Analytics
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-[4.25rem]">
            Benjamin Zhu
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            I turn raw, messy data into decisions people can actually act on
            — from validated ML pipelines and causal analyses to
            recommendations stakeholders can move on.
          </p>
          <div className="no-print mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-[3px] bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-accent"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-[3px] border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </div>

        <HeroChart />
      </div>
    </section>
  );
}

function HeroChart() {
  const polyline = POINTS.map((p) => p.join(",")).join(" ");
  const [lastX, lastY] = POINTS[POINTS.length - 1];

  return (
    <svg
      viewBox="0 0 480 320"
      className="mx-auto w-full max-w-[480px]"
      role="img"
      aria-label="Illustrative ascending trend line"
    >
      {GRID_Y.map((y) => (
        <line key={y} x1={10} y1={y} x2={470} y2={y} className="stroke-line" strokeWidth={1} />
      ))}

      {POINTS.map(([x]) => (
        <line
          key={`tick-${x}`}
          x1={x}
          y1={296}
          x2={x}
          y2={304}
          className="stroke-ink-muted"
          strokeWidth={1}
        />
      ))}

      <polyline
        points={polyline}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-path stroke-accent-forest"
      />

      <g className="fade-in" style={{ animationDelay: "1.3s" }}>
        {POINTS.slice(0, -1).map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={3.5}
            strokeWidth={1.5}
            className="fill-paper stroke-ink-muted"
          />
        ))}
      </g>

      <g className="fade-in" style={{ animationDelay: "1.6s" }}>
        <line x1={lastX} y1={lastY} x2={lastX} y2={40} strokeWidth={1} className="stroke-accent" />
        <circle cx={lastX} cy={lastY} r={5.5} className="fill-accent" />
        <text
          x={lastX}
          y={32}
          textAnchor="end"
          fontSize={11}
          letterSpacing="0.1em"
          className="fill-accent font-mono"
        >
          SIGNAL
        </text>
      </g>
    </svg>
  );
}
