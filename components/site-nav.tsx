"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#publications", label: "Publications" },
  { href: "/#experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

// Minimal top bar that gains a frosted background once you scroll.
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Ishaan Mishra, home"
          className="group relative font-serif text-[2.1rem] leading-none tracking-[0.02em] text-slate-100 transition-colors hover:text-white"
        >
          I<em className="text-slate-300 transition-colors group-hover:text-slate-100">M</em>
          <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-slate-300 to-transparent transition-all duration-300 group-hover:w-full" />
        </Link>
        <div className="flex items-center gap-1 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden rounded-md px-3 py-1.5 text-slate-400 transition-colors hover:text-slate-100 sm:block"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/resume"
            className="ml-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1.5 font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}
