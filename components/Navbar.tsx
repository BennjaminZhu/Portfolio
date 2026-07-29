"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DownloadPdfButton from "./DownloadPdfButton";
import { EmailLink, quickActionLinkClass } from "./QuickActions";

const LINKS = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#work", label: "Work", id: "work" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const anchored = LINKS.filter((l) => l.id);
    const sections = anchored
      .map((l) => document.getElementById(l.id as string))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={`no-print sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-paper/90 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1180px] items-start justify-between gap-6 px-6 py-5 sm:items-center sm:px-10">
        <a
          href="/#top"
          className="shrink-0 font-mono text-sm tracking-[0.15em] text-ink"
          aria-label="Back to top"
        >
          BZ<span className="text-accent">/</span>DATA
        </a>
        <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 sm:gap-x-7">
          {LINKS.map((link) => {
            const isActive = link.id ? active === link.href : pathname === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive ? "text-accent" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
          <li className="hidden sm:block">
            <DownloadPdfButton />
          </li>
          <li className="hidden sm:block">
            <EmailLink className={quickActionLinkClass} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
