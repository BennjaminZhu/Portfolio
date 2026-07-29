"use client";

export default function DownloadPdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-accent"
      aria-label="Download this page as a PDF"
    >
      <svg
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 1.5v8.5" />
        <path d="M4.5 6.5 8 10l3.5-3.5" />
        <path d="M2 12v1.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V12" />
      </svg>
      PDF
    </button>
  );
}
