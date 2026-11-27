"use client";

import { useMemo, useState } from "react";
import { Download, Loader2, LogOut, RotateCcw } from "lucide-react";
import { EXPERIENCE } from "@/content/profile";
import { buildResume, rankProjects, suggestedProjects } from "@/lib/tailor";
import { ResumePreview } from "@/components/resume-preview";
import { logout } from "@/app/studio/actions";

// Owner-only tool: paste a JD, adjust what's included, download a PDF named for the company.
export function ResumeStudio() {
  const [company, setCompany] = useState("");
  const [jd, setJd] = useState("");
  const [projectOverride, setProjectOverride] = useState<string[] | null>(null); // null = follow suggestion
  const [hidden, setHidden] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ kind: "error" | "warn" | "ok"; text: string } | null>(null);

  const ranked = useMemo(() => rankProjects(jd), [jd]);
  const included = projectOverride ?? suggestedProjects(jd);
  const data = useMemo(
    () => buildResume({ jd, projects: included, hiddenBullets: hidden }),
    [jd, included, hidden],
  );

  const toggleProject = (title: string) =>
    setProjectOverride((included.includes(title) ? included.filter((t) => t !== title) : [...included, title]));
  const toggleBullet = (text: string) =>
    setHidden((h) => (h.includes(text) ? h.filter((t) => t !== text) : [...h, text]));
  const reset = () => {
    setProjectOverride(null);
    setHidden([]);
    setNote(null);
  };

  async function download() {
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd, company, projects: included, hiddenBullets: hidden }),
      });
      if (res.status === 401) throw new Error("Session expired. Reload and sign in again.");
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Could not generate the PDF.");

      const name = res.headers.get("Content-Disposition")?.match(/filename="(.+)"/)?.[1] ?? "Ishaan_Mishra_Resume.pdf";
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);

      const pages = Number(res.headers.get("X-Resume-Pages") ?? 1);
      setNote(
        pages > 1
          ? { kind: "warn", text: `Downloaded, but it runs to ${pages} pages. Untick a project or a bullet to fit one page.` }
          : { kind: "ok", text: `Downloaded ${name}` },
      );
    } catch (e) {
      setNote({ kind: "error", text: e instanceof Error ? e.message : "Something went wrong." });
    } finally {
      setBusy(false);
    }
  }

  const input =
    "w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:border-slate-500 focus:outline-none";

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
      <ResumePreview data={data} />

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl text-slate-100">Resume studio</h1>
          <form action={logout}>
            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </form>
        </div>

        <Panel title="Job">
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (used in the file name)" className={input} />
          <textarea
            value={jd}
            onChange={(e) => {
              setJd(e.target.value);
              setProjectOverride(null);
            }}
            rows={7}
            placeholder="Paste the job description…"
            className={`${input} mt-2 resize-y`}
          />
          {data.matched.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {data.matched.map((m) => (
                <span key={m} className="rounded-md bg-sky-500/10 px-2 py-0.5 font-mono text-[11px] text-sky-300">{m}</span>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Projects" hint="Ranked by relevance. Three fit on one page.">
          {ranked.map((p) => (
            <Check key={p.title} checked={included.includes(p.title)} onChange={() => toggleProject(p.title)} label={p.title} />
          ))}
        </Panel>

        <Panel title="Experience bullets">
          {EXPERIENCE.map((r) => (
            <div key={r.org} className="mb-2">
              <p className="mb-1 text-xs font-medium text-slate-500">{r.org}</p>
              {r.bullets.map((b) => (
                <Check key={b.text} checked={!hidden.includes(b.text)} onChange={() => toggleBullet(b.text)} label={b.text} small />
              ))}
            </div>
          ))}
        </Panel>

        {note && (
          <p className={`text-xs ${note.kind === "error" ? "text-red-400" : note.kind === "warn" ? "text-amber-300" : "text-emerald-400"}`}>
            {note.text}
          </p>
        )}

        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-full border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={download}
            disabled={busy}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-white disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </button>
        </div>
      </aside>
    </div>
  );
}

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
      <h2 className="text-sm font-semibold text-slate-200">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Check({ checked, onChange, label, small }: { checked: boolean; onChange: () => void; label: string; small?: boolean }) {
  return (
    <label className={`flex cursor-pointer items-start gap-2.5 py-1 ${small ? "text-xs" : "text-sm"} ${checked ? "text-slate-200" : "text-slate-500 line-through"}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="mt-0.5 accent-sky-400" />
      <span>{label}</span>
    </label>
  );
}
