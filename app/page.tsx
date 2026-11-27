import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { StatTile } from "@/components/stat-tile";
import { SpotlightCard } from "@/components/spotlight-card";
import { SectionHeading } from "@/components/section-heading";
import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  PUBLICATIONS,
  SKILLS,
  STATS,
} from "@/content/profile";

// All content lives in content/profile.ts — this file is layout only.

function TimelineDot({ active }: { active?: boolean }) {
  return (
    <span
      className={`absolute -left-[39px] top-5 h-3.5 w-3.5 rounded-full border-2 ${
        active ? "border-sky-400 bg-sky-400/20" : "border-slate-700 bg-slate-950"
      } ring-4 ring-slate-950`}
    />
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 pb-8 font-sans selection:bg-sky-500/30">
      {/* --- HERO --- */}
      <section className="relative flex h-screen w-full shrink-0 flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 h-full w-full">
          <BackgroundRippleEffect />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-b from-transparent to-slate-950"
        />

        <div className="pointer-events-none relative z-20 flex w-full max-w-3xl flex-col items-center px-6">
          <span className="pointer-events-auto mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-400 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PROFILE.headline}
          </span>

          <h1 className="pointer-events-auto bg-gradient-to-b from-slate-50 to-slate-400 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent md:text-7xl">
            {PROFILE.name}
          </h1>

          <div className="pointer-events-auto mt-6 max-w-2xl text-center">
            <TextGenerateEffect words={PROFILE.tagline} className="text-base text-slate-400 md:text-xl" />
          </div>

          <div className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/resume"
              className="group flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105 hover:bg-white active:scale-95"
            >
              <FileText className="h-4 w-4" />
              Resume
            </Link>
            <a
              href="#work"
              className="group flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-colors hover:bg-slate-800"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* --- AT A GLANCE --- */}
      <section className="relative z-20 mx-auto -mt-16 w-full max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <StatTile key={s.label} value={s.value} label={s.label} detail={s.detail} />
          ))}
        </div>
      </section>

      {/* --- SELECTED WORK --- */}
      <section id="work" className="relative z-20 mx-auto mt-28 w-full max-w-5xl scroll-mt-20 px-6">
        <SectionHeading index="01" title="Selected work" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <SpotlightCard key={p.title}>
              <div className="flex h-full flex-col gap-4 p-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{p.kind}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-slate-100">{p.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-md bg-slate-800/80 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 pt-1">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
                    >
                      {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- RESEARCH --- */}
      <section id="research" className="relative z-20 mx-auto mt-28 w-full max-w-5xl scroll-mt-20 px-6">
        <SectionHeading index="02" title="Research" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <SpotlightCard className="md:col-span-3">
            <div className="p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Current focus</p>
              <h3 className="mt-1.5 text-lg font-semibold text-slate-100">Dataset bias in deepfake detection</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Detectors trained on merged datasets can score well by recognising <em>which dataset</em> an image came
                from rather than whether it is fake. I&apos;m measuring how much of reported accuracy comes from such
                shortcuts, and which fixes — identity-disjoint splits, matched compression, frequency features —
                actually help models generalise.
              </p>
            </div>
          </SpotlightCard>
          <SpotlightCard className="md:col-span-2">
            <div className="p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Publications</p>
              <ul className="mt-3 space-y-3">
                {PUBLICATIONS.map((p) => (
                  <li key={p.href} className="text-sm leading-relaxed text-slate-300">
                    {p.citation}{" "}
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-sky-400 hover:text-sky-300"
                    >
                      DOI <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* --- SKILLS --- */}
      <section id="skills" className="relative z-20 mx-auto mt-28 w-full max-w-5xl scroll-mt-20 px-6">
        <SectionHeading index="03" title="Toolkit" />
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g) => (
            <div key={g.label}>
              <p className="mb-3 text-sm font-medium text-slate-400">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it.name}
                    className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-xs text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
                  >
                    {it.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPERIENCE + EDUCATION --- */}
      <section id="experience" className="relative z-20 mx-auto mt-28 w-full max-w-5xl scroll-mt-20 px-6">
        <SectionHeading index="04" title="Experience" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="ml-2 flex flex-col gap-6 border-l border-slate-800 pl-8 md:col-span-3">
            {EXPERIENCE.map((r, i) => (
              <div key={r.org} className="relative">
                <TimelineDot active={i === 0} />
                <SpotlightCard>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-slate-100">{r.title}</h3>
                        <p className="mt-0.5 text-sm text-slate-400">
                          {r.org} · {r.period}
                        </p>
                      </div>
                      {r.link && (
                        <a
                          href={r.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex shrink-0 items-center gap-1 text-xs text-sky-400 hover:underline"
                        >
                          {r.link.label} <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                      {r.bullets.map((b) => (
                        <li key={b.text} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                          {b.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:col-span-2">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-slate-500">Education</p>
              {EDUCATION.map((e) => (
                <SpotlightCard key={e.title}>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-slate-100">{e.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {e.org} · {e.period}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">{e.detail}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-slate-500">Achievements</p>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                {ACHIEVEMENTS.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-900/20 p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Now</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{PROFILE.now}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="relative z-20 mx-auto mt-28 w-full max-w-5xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">Want my resume for a specific role?</h2>
            <p className="mt-1 text-sm text-slate-400">
              Paste the job description and download a version ordered around what the role needs.
            </p>
          </div>
          <Link
            href="/resume#tailor"
            className="group flex shrink-0 items-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-white"
          >
            Tailor my resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-20 mx-auto mt-20 w-full max-w-5xl px-6 pb-8">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-800/60 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} {PROFILE.name}</p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/contact" className="transition-colors hover:text-slate-200">
              Contact
            </Link>
            {[
              ["GitHub", PROFILE.links.github],
              ["LinkedIn", PROFILE.links.linkedin],
              ["Kaggle", PROFILE.links.kaggle],
              ["X", PROFILE.links.x],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-200">
                {label} <span className="text-slate-600">↗</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
