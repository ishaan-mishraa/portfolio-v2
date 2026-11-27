import { ACHIEVEMENTS, EDUCATION, PROFILE, PUBLICATIONS } from "@/content/profile";
import type { ResumeData } from "@/lib/tailor";

// HTML mirror of the PDF layout (lib/resume-pdf.tsx). Keep the two in sync.
export function ResumePreview({ data }: { data: ResumeData }) {
  const work = data.experience.filter((r) => r.category === "work");
  const volunteer = data.experience.filter((r) => r.category === "volunteer");

  return (
    <article className="rounded-2xl bg-white p-8 text-[13px] leading-snug text-black shadow-2xl shadow-black/40 md:p-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{PROFILE.name}</h1>
        <p className="mt-1.5 flex flex-wrap justify-center gap-x-2 text-xs">
          {[
            [PROFILE.email, `mailto:${PROFILE.email}`],
            ["ishaanm.dev", PROFILE.site],
            ["linkedin.com/in/ishaanmishraa", PROFILE.links.linkedin],
            ["github.com/ishaan-mishraa", PROFILE.links.github],
          ].map(([label, href], i) => (
            <span key={href}>
              {i > 0 && <span className="mr-2 text-slate-400">|</span>}
              <a className="underline" href={href}>{label}</a>
            </span>
          ))}
        </p>
      </header>

      <Section title="Education">
        {EDUCATION.map((e) => (
          <div key={e.school} className="pl-3">
            <Sub l1={e.school} r1={e.period} l2={`${e.degree} (${e.detail})`} r2={e.location} />
          </div>
        ))}
      </Section>

      <Section title="Technical Skills">
        {data.skills.map((g) => (
          <p key={g.label} className="pl-3">
            <span className="font-bold">{g.label}</span>: {g.items.map((i) => i.name).join(", ")}
          </p>
        ))}
      </Section>

      <Section title="Experience">
        {work.map((r) => (
          <div key={r.org} className="mb-2 pl-3">
            <Sub l1={r.org} r1={r.period} l2={r.title} r2={r.location} />
            <ul className="list-disc pl-5">{r.bullets.map((b) => <li key={b.text}>{b.text}</li>)}</ul>
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {data.projects.map((p) => (
          <div key={p.title} className="mb-2 pl-3">
            <div className="flex justify-between gap-4">
              <p>
                <span className="font-bold">{p.title}</span> | <em>{p.stack.join(", ")}</em>
                {p.links.map((l) => (
                  <span key={l.href}> | <a className="underline" href={l.href}>{l.label}</a></span>
                ))}
              </p>
              <p className="shrink-0">{p.year}</p>
            </div>
            <ul className="list-disc pl-5">{p.bullets.map((b) => <li key={b.text}>{b.text}</li>)}</ul>
          </div>
        ))}
      </Section>

      <Section title="Publications">
        {PUBLICATIONS.map((p) => (
          <div key={p.title} className="mb-2 pl-3">
            <div className="flex justify-between gap-4">
              <p className="font-bold">{p.title}</p>
              <p className="shrink-0">{p.date}</p>
            </div>
            <ul className="list-disc pl-5">{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
        ))}
      </Section>

      {volunteer.length > 0 && (
        <Section title="Volunteer Experience">
          {volunteer.map((r) => (
            <div key={r.org} className="mb-2 pl-3">
              <Sub l1={r.org} r1={r.period} l2={r.title} r2={r.location} />
              <ul className="list-disc pl-5">{r.bullets.map((b) => <li key={b.text}>{b.text}</li>)}</ul>
            </div>
          ))}
        </Section>
      )}

      <Section title="Achievements">
        {ACHIEVEMENTS.map((a) => (
          <p key={a.lead} className="pl-3"><span className="font-bold">{a.lead}</span>: {a.text}</p>
        ))}
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-3">
      <h2 className="mb-1 border-b border-black pb-0.5 text-[15px] font-bold">{title}</h2>
      {children}
    </section>
  );
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
