import { PROFILE } from "@/content/profile";
import type { ResolvedResume, ResolvedSection } from "@/lib/resume-model";

// HTML mirror of the PDF layout (lib/resume-pdf.tsx), used on the public /resume page.
export function ResumePreview({ data }: { data: ResolvedResume }) {
  return (
    <article className="rounded-2xl bg-white p-8 text-[13px] leading-snug text-black shadow-2xl shadow-black/40 md:p-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{PROFILE.name}</h1>
        <p className="mt-1.5 flex flex-wrap justify-center gap-x-2 text-xs">
          {data.contacts.map((c, i) => (
            <span key={c.id}>
              {i > 0 && <span className="mr-2 text-slate-400">|</span>}
              <a className="underline" href={c.href}>{c.label}</a>
            </span>
          ))}
        </p>
      </header>
      {data.sections.map((sec) => (
        <section key={sec.kind} className="mt-3">
          <h2 className="mb-1 border-b border-black pb-0.5 text-[15px] font-bold">{sec.title}</h2>
          <Body sec={sec} />
        </section>
      ))}
    </article>
  );
}

function Body({ sec }: { sec: ResolvedSection }) {
  switch (sec.kind) {
    case "education":
      return sec.items.map((e) => (
        <div key={e.id} className="pl-3">
          <Sub l1={e.school} r1={e.period} l2={`${e.degree} (${e.detail})`} r2={e.location} />
        </div>
      ));
    case "skills":
      return sec.items.map((g) => (
        <p key={g.label} className="pl-3">
          <span className="font-bold">{g.label}</span>: {g.names.join(", ")}
        </p>
      ));
    case "experience":
    case "volunteer":
      return sec.items.map(({ role, bullets }) => (
        <div key={role.id} className="mb-2 pl-3">
          <Sub l1={role.org} r1={role.period} l2={role.title} r2={role.location} />
          <Bullets items={bullets} />
        </div>
      ));
    case "projects":
      return sec.items.map(({ project: p, bullets }) => (
        <div key={p.id} className="mb-2 pl-3">
          <div className="flex justify-between gap-4">
            <p>
              <span className="font-bold">{p.title}</span> | <em>{p.stack.join(", ")}</em>
              {p.links.map((l) => (
                <span key={l.href}> | <a className="underline" href={l.href}>{l.label}</a></span>
              ))}
            </p>
            <p className="shrink-0">{p.year}</p>
          </div>
          <Bullets items={bullets} />
        </div>
      ));
    case "publications":
      return sec.items.map(({ pub, bullets }) => (
        <div key={pub.id} className="mb-2 pl-3">
          <div className="flex justify-between gap-4">
            <p className="font-bold">{pub.title}</p>
            <p className="shrink-0">{pub.date}</p>
          </div>
          <Bullets items={bullets} />
        </div>
      ));
    case "achievements":
      return sec.items.map((a) => (
        <p key={a.id} className="pl-3"><span className="font-bold">{a.lead}</span>: {a.text}</p>
      ));
  }
}

function Bullets({ items }: { items: string[] }) {
  return items.length ? <ul className="list-disc pl-5">{items.map((b) => <li key={b}>{b}</li>)}</ul> : null;
}

function Sub({ l1, r1, l2, r2 }: { l1: string; r1: string; l2: string; r2: string }) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <p className="font-bold">{l1}</p>
        <p className="shrink-0">{r1}</p>
      </div>
      <div className="flex justify-between gap-4 text-[12px] italic">
        <p>{l2}</p>
        <p className="shrink-0">{r2}</p>
      </div>
    </div>
  );
}
