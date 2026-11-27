"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, Download, Loader2, LogOut, RotateCcw, Wand2 } from "lucide-react";
import {
  FONT_MAX,
  FONT_MIN,
  catalog,
  defaultConfig,
  normalizeConfig,
  type CatalogNode,
  type Node,
  type ResumeConfig,
} from "@/lib/resume-model";
import { arrangeForJd } from "@/lib/tailor";
import { logout } from "@/app/studio/actions";

const STORAGE_KEY = "resume-studio-layout-v1";

type Meta = { pages: number; fontSize: number; fits: boolean };

// Apply `fn` to the list found by following child indices `path` from the root list.
function mapList(nodes: Node[], path: number[], fn: (list: Node[]) => Node[]): Node[] {
  if (path.length === 0) return fn(nodes);
  const [head, ...rest] = path;
  return nodes.map((n, i) => (i === head ? { ...n, children: mapList(n.children ?? [], rest, fn) } : n));
}
const toggleAt = (list: Node[], i: number) => list.map((n, j) => (j === i ? { ...n, on: !n.on } : n));
function moveAt(list: Node[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export function ResumeStudio() {
  const cat = useMemo(() => catalog(), []);
  const [config, setConfig] = useState<ResumeConfig>(defaultConfig);
  const [restored, setRestored] = useState(false);
  const [jd, setJd] = useState("");
  const [matched, setMatched] = useState<string[] | null>(null);
  const [company, setCompany] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  // Restore the last layout from this browser (new content items arrive unticked).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage after hydration
      if (saved) setConfig(normalizeConfig(JSON.parse(saved)));
    } catch {
      /* ignore corrupt storage */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (restored) localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config, restored]);

  // Re-render the real PDF shortly after each change.
  useEffect(() => {
    if (!restored) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ config }),
          signal: ctrl.signal,
        });
        if (res.status === 401) throw new Error("Session expired. Reload and sign in again.");
        if (!res.ok) throw new Error("Could not render the PDF.");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        setPdfUrl(url);
        setMeta({
          pages: Number(res.headers.get("X-Resume-Pages") ?? 1),
          fontSize: Number(res.headers.get("X-Resume-Font-Size") ?? config.fontSize),
          fits: res.headers.get("X-Resume-Fits") !== "false",
        });
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError((e as Error).message);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [config, restored]);

  const updateSections = (path: number[], fn: (l: Node[]) => Node[]) =>
    setConfig((c) => ({ ...c, sections: mapList(c.sections, path, fn) }));

  function download() {
    if (!pdfUrl) return;
    const slug = company.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `Ishaan_Mishra_Resume${slug ? `_${slug}` : ""}.pdf`;
    a.click();
  }

  function reset() {
    if (!window.confirm("Reset to the standard resume layout? Your current layout will be lost.")) return;
    setConfig(defaultConfig());
    setMatched(null);
  }

  const fitNote = !meta
    ? null
    : !meta.fits
      ? { tone: "text-red-400", text: `Doesn't fit on ${config.pages} page${config.pages > 1 ? "s" : ""} even at ${FONT_MIN}pt. Untick something.` }
      : meta.fontSize < config.fontSize - 0.01
        ? { tone: "text-amber-300", text: `Auto-fitted to ${meta.fontSize.toFixed(2)}pt to stay on ${config.pages} page${config.pages > 1 ? "s" : ""}.` }
        : { tone: "text-emerald-400", text: `${meta.pages} page${meta.pages > 1 ? "s" : ""} at ${meta.fontSize.toFixed(2)}pt.` };

  const input =
    "w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-slate-500 focus:outline-none";

  return (
    <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_480px]">
      {/* --- LIVE PDF --- */}
      <div className="relative h-[85vh] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:sticky lg:top-24">
        {pdfUrl ? (
          <iframe title="Resume preview" src={`${pdfUrl}#toolbar=0&view=FitH`} className="h-full w-full" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Rendering…</div>
        )}
        {loading && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-300">
            <Loader2 className="h-3 w-3 animate-spin" /> Updating
          </div>
        )}
      </div>

      {/* --- CONTROLS --- */}
      <aside className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Resume studio</h1>
          <form action={logout}>
            <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </form>
        </div>

        <Panel title="Export">
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (for the file name)" className={input} />
          {fitNote && <p className={`mt-2 text-xs ${fitNote.tone}`}>{fitNote.text}</p>}
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          <div className="mt-3 flex gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={download}
              disabled={!pdfUrl || loading || meta?.fits === false}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-white disabled:opacity-40"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
          </div>
        </Panel>

        <Panel title="Page">
          <div className="flex gap-2">
            {([1, 2] as const).map((p) => (
              <button
                key={p}
                onClick={() => setConfig((c) => ({ ...c, pages: p }))}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                  config.pages === p ? "border-slate-400 bg-slate-800 text-slate-100" : "border-slate-800 text-slate-400 hover:bg-slate-800/50"
                }`}
              >
                {p === 1 ? "One page" : "Up to two pages"}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-xs text-slate-400">
            Font size: <span className="text-slate-200">{config.fontSize.toFixed(2)}pt</span>
            <span className="text-slate-600"> (max; shrinks automatically if it won&apos;t fit)</span>
          </label>
          <input
            type="range"
            min={FONT_MIN}
            max={FONT_MAX}
            step={0.25}
            value={config.fontSize}
            onChange={(e) => setConfig((c) => ({ ...c, fontSize: Number(e.target.value) }))}
            className="mt-2 w-full accent-sky-400"
          />
        </Panel>

        <Panel title="Arrange for a job description" hint="Reorders skills and bullets and ticks the 3 most relevant projects. You can adjust after.">
          <textarea value={jd} onChange={(e) => setJd(e.target.value)} rows={5} placeholder="Paste the job description…" className={`${input} resize-y`} />
          <button
            onClick={() => {
              const r = arrangeForJd(config, jd);
              setConfig(r.config);
              setMatched(r.matched);
            }}
            disabled={jd.trim().length < 30}
            className="mt-2 flex items-center gap-1.5 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 disabled:opacity-40"
          >
            <Wand2 className="h-4 w-4" /> Arrange
          </button>
          {matched && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {matched.length === 0 && <span className="text-xs text-slate-500">No familiar keywords found.</span>}
              {matched.map((m) => (
                <span key={m} className="rounded-md bg-sky-500/10 px-2 py-0.5 font-mono text-[11px] text-sky-300">{m}</span>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Contact line">
          <Tree
            nodes={config.contacts}
            cat={cat.contacts}
            onToggle={(_, i) => setConfig((c) => ({ ...c, contacts: toggleAt(c.contacts, i) }))}
            onMove={(_, i, d) => setConfig((c) => ({ ...c, contacts: moveAt(c.contacts, i, d) }))}
            path={[]}
          />
        </Panel>

        <Panel title="Sections & content" hint="Tick what to show; arrows set the order. Expand an item to pick its bullets or skills.">
          <Tree
            nodes={config.sections}
            cat={cat.sections}
            onToggle={(path, i) => updateSections(path, (l) => toggleAt(l, i))}
            onMove={(path, i, d) => updateSections(path, (l) => moveAt(l, i, d))}
            path={[]}
          />
        </Panel>
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

type TreeProps = {
  nodes: Node[];
  cat: CatalogNode[];
  path: number[];
  depth?: number;
  onToggle: (path: number[], i: number) => void;
  onMove: (path: number[], i: number, dir: -1 | 1) => void;
};

function Tree({ nodes, cat, path, depth = 0, onToggle, onMove }: TreeProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const byId = useMemo(() => new Map(cat.map((c) => [c.id, c])), [cat]);

  return (
    <ul className={depth > 0 ? "ml-5 border-l border-slate-800 pl-2" : ""}>
      {nodes.map((n, i) => {
        const c = byId.get(n.id);
        if (!c) return null;
        const hasKids = Boolean(n.children?.length);
        const expanded = open[n.id] ?? depth === 0;
        const ticked = n.children?.filter((k) => k.on).length ?? 0;
        return (
          <li key={n.id}>
            <div className="group flex items-start gap-2 rounded-md py-1 pr-1 hover:bg-slate-800/40">
              <input type="checkbox" checked={n.on} onChange={() => onToggle(path, i)} className="mt-1 shrink-0 accent-sky-400" />
              <button
                type="button"
                onClick={() => hasKids && setOpen((o) => ({ ...o, [n.id]: !expanded }))}
                className={`flex min-w-0 flex-1 items-start gap-1 text-left ${depth === 0 ? "text-sm font-medium" : "text-xs"} ${
                  n.on ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {hasKids &&
                  (expanded ? <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />)}
                <span className={depth >= 2 ? "line-clamp-3" : ""}>{c.label}</span>
                {hasKids && !expanded && <span className="ml-1 shrink-0 text-slate-600">{ticked}/{n.children!.length}</span>}
              </button>
              <div className="flex shrink-0 opacity-40 group-hover:opacity-100">
                <IconBtn label="Move up" disabled={i === 0} onClick={() => onMove(path, i, -1)}>
                  <ChevronUp className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn label="Move down" disabled={i === nodes.length - 1} onClick={() => onMove(path, i, 1)}>
                  <ChevronDown className="h-3.5 w-3.5" />
                </IconBtn>
              </div>
            </div>
            {hasKids && expanded && (
              <Tree
                nodes={n.children!}
                cat={c.children ?? []}
                path={[...path, i]}
                depth={depth + 1}
                onToggle={onToggle}
                onMove={onMove}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function IconBtn({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded p-0.5 text-slate-400 hover:bg-slate-700 hover:text-slate-100 disabled:opacity-20"
    >
      {children}
    </button>
  );
}
