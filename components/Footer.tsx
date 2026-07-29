export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center sm:px-10">
        <p className="font-mono text-xs text-ink-muted">
          © {year} Benjamin Zhu. Built with Next.js.
        </p>
        <a
          href="/#top"
          className="no-print font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-accent"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
