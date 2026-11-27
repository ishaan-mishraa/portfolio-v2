"use client";

import { useMemo, useState } from "react";
import { Download, Loader2, Sparkles, X } from "lucide-react";
import { ACHIEVEMENTS, EDUCATION, PROFILE, PUBLICATIONS } from "@/content/profile";
import { defaultResume, tailorResume } from "@/lib/tailor";

const MIN_JD = 30;

export function ResumeView() {
  const [jd, setJd] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const usingJd = jd.trim().length >= MIN_JD;
  // Tailoring is a pure function of public content, so the preview runs instantly in the browser.
  const data = useMemo(() => (usingJd ? tailorResume(jd) : defaultResume()), [jd, usingJd]);

  async function downloadTailored() {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not generate the PDF.");
      }
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "Ishaan_Mishra_Resume_Tailored.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
      {/* --- PREVIEW --- */}
      <article className="rounded-2xl bg-white p-8 text-[13px] leading-relaxed text-slate-800 shadow-2xl shadow-black/40 md:p-12">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{PROFILE.name}</h1>
          <p className="mt-1 text-slate-500">{PROFILE.headline}</p>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
            <span>{PROFILE.location}</span>
            <a className="text-blue-800" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a className="text-blue-800" href={PROFILE.site}>ishaanm.dev</a>
            <a className="text-blue-800" href={PROFILE.links.github}>GitHub</a>
            <a className="text-blue-800" href={PROFILE.links.linkedin}>LinkedIn</a>
          </p>
        </header>

        <Section title="Summary">
          <p>{PROFILE.summary}</p>
        </Section>

        <Section title="Experience">
          {data.experience.map((r) => (
            <div key={r.org} className="mb-3">
              <div className="flex justify-between gap-4">
                <p className="font-semibold text-slate-900">{r.title}</p>
                <p className="shrink-0 text-slate-500">{r.period}</p>
              </div>
              <p className="text-slate-500">{r.org} · {r.location}</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {r.bullets.map((b) => <li key={b.text}>{b.text}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Projects & Research">
          {data.projects.map((p) => (
            <div key={p.title} className="mb-2">
              <p>
                <span className="font-semibold text-slate-900">{p.title}</span>
                <span className="text-slate-500"> · {p.stack.join(", ")}</span>
              </p>
              <p>{p.summary}</p>
            </div>
          ))}
        </Section>

        <Section title="Skills">
          {data.skills.map((g) => (
            <p key={g.label}>
              <span className="font-semibold text-slate-900">{g.label}: </span>
              {g.items.map((i) => i.name).join(", ")}
            </p>
          ))}
        </Section>

        <Section title="Publications">
          {PUBLICATIONS.map((p) => <p key={p.href}>{p.citation}</p>)}
        </Section>

        <Section title="Education">
          {EDUCATION.map((e) => (
            <div key={e.title} className="flex justify-between gap-4">
              <p><span className="font-semibold text-slate-900">{e.title}</span> · {e.org} · {e.detail}</p>
              <p className="shrink-0 text-slate-500">{e.period}</p>
            </div>
          ))}
        </Section>

        <Section title="Achievements">
          <ul className="list-disc space-y-0.5 pl-5">
            {ACHIEVEMENTS.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </Section>
      </article>

      {/* --- CONTROLS --- */}
      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Always current</p>
          <h2 className="mt-1.5 text-lg font-semibold text-slate-100">Download resume</h2>
          <p className="mt-1 text-sm text-slate-400">Generated live from this site, so it&apos;s never out of date.</p>
          <a
            href="/api/resume"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-white"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>

        <div id="tailor" className="scroll-mt-24 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">For recruiters</p>
          <h2 className="mt-1.5 flex items-center gap-2 text-lg font-semibold text-slate-100">
            <Sparkles className="h-4 w-4 text-sky-400" /> Tailor to a job
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Paste a job description. The most relevant experience, projects and skills move to the top. The content
            itself is never changed or invented.
          </p>
          <div className="relative mt-4">
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              rows={8}
              placeholder="Paste the job description here…"
              className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:border-slate-500 focus:outline-none"
            />
            {jd && (
              <button
                onClick={() => setJd("")}
                aria-label="Clear"
                className="absolute right-2 top-2 rounded p-1 text-slate-500 hover:text-slate-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {usingJd && (
            <div className="mt-3">
              {data.matched.length > 0 ? (
                <>
                  <p className="text-xs text-slate-500">Matched in the description:</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {data.matched.map((m) => (
                      <span key={m} className="rounded-md bg-sky-500/10 px-2 py-0.5 font-mono text-[11px] text-sky-300">
                        {m}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-500">No familiar keywords found; the standard resume will be used.</p>
              )}
            </div>
          )}

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <button
            onClick={downloadTailored}
            disabled={!usingJd || downloading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download tailored PDF
          </button>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-2 border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-900">
        {title}
      </h2>
      {children}
    </section>
  );
}
