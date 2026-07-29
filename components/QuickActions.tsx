const EMAIL = "benjaminzhu25123@outlook.com";

export const quickActionLinkClass =
  "inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-accent";

function ResumeIcon() {
  return (
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
      <path d="M4 1.5h5.5L12.5 4.5V14.5H4Z" />
      <path d="M9.5 1.5V4.5H12.5" />
      <path d="M6 8.2h4M6 10.7h4" />
    </svg>
  );
}

function EmailIcon() {
  return (
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
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" />
      <path d="M2 4.5 8 9l6-4.5" />
    </svg>
  );
}

export function ResumeLink({ className = quickActionLinkClass }: { className?: string }) {
  return (
    <a href="/resume" className={className}>
      <ResumeIcon />
      Resume
    </a>
  );
}

export function EmailLink({ className = quickActionLinkClass }: { className?: string }) {
  return (
    <a href={`mailto:${EMAIL}`} className={className}>
      <EmailIcon />
      Email
    </a>
  );
}

export default function HeroQuickActions() {
  return (
    <div className="no-print mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
      <ResumeLink />
      <EmailLink />
    </div>
  );
}
