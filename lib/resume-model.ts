import {
  ACHIEVEMENTS,
  CONTACTS,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  PUBLICATIONS,
  SKILLS,
  type Bullet,
  type Project,
  type Role,
} from "@/content/profile";

// ---------------------------------------------------------------------------
// A resume layout is a tree of { id, on, children } nodes. Array order = print order.
// The catalog lists everything that *can* appear (from content/profile.ts);
// a layout (ResumeConfig) says what is ticked and in what order.
// ---------------------------------------------------------------------------

export type SectionId = "education" | "skills" | "experience" | "projects" | "publications" | "volunteer" | "achievements";

export type Node = { id: string; on: boolean; children?: Node[] };

export type ResumeConfig = {
  contacts: Node[];
  sections: Node[];
  fontSize: number; // base size in pt; auto-fit may shrink it
  pages: 1 | 2;
};

export type CatalogNode = { id: string; label: string; tags: string[]; on: boolean; pinLast?: boolean; children?: CatalogNode[] };

export const SECTION_TITLES: Record<SectionId, string> = {
  education: "Education",
  skills: "Technical Skills",
  experience: "Experience",
  projects: "Projects",
  publications: "Publications",
  volunteer: "Volunteer Experience",
  achievements: "Achievements",
};

export const FONT_MIN = 7;
export const FONT_MAX = 12;
export const FONT_DEFAULT = 10;

const bulletNodes = (bullets: Bullet[]): CatalogNode[] =>
  bullets.map((b) => ({ id: b.id, label: b.text, tags: b.tags, on: true, pinLast: b.pinLast }));

const roleNode = (r: Role): CatalogNode => ({
  id: r.id,
  label: `${r.org} · ${r.title}`,
  tags: r.bullets.flatMap((b) => b.tags),
  on: r.resumeDefault ?? true,
  children: bulletNodes(r.bullets),
});

const projectNode = (p: Project): CatalogNode => ({
  id: p.id,
  label: p.title,
  tags: p.tags,
  on: p.resumeDefault ?? true,
  children: bulletNodes(p.bullets),
});

/** Everything that can appear on the resume, in authored order, with default on/off. */
export function catalog(): { contacts: CatalogNode[]; sections: CatalogNode[] } {
  return {
    contacts: CONTACTS.map((c) => ({ id: c.id, label: c.label, tags: [], on: c.resumeDefault })),
    sections: [
      { id: "education", label: SECTION_TITLES.education, tags: [], on: true, children: EDUCATION.map((e) => ({ id: e.id, label: e.school, tags: [], on: true })) },
      {
        id: "skills",
        label: SECTION_TITLES.skills,
        tags: [],
        on: true,
        children: SKILLS.map((g) => ({
          id: g.id,
          label: g.label,
          tags: g.items.flatMap((i) => i.tags),
          on: g.resumeDefault ?? true,
          children: g.items.map((i) => ({ id: i.id, label: i.name, tags: i.tags, on: i.resumeDefault ?? true })),
        })),
      },
      { id: "experience", label: SECTION_TITLES.experience, tags: [], on: true, children: EXPERIENCE.filter((r) => r.category === "work").map(roleNode) },
      { id: "projects", label: SECTION_TITLES.projects, tags: [], on: true, children: PROJECTS.filter((p) => p.onResume !== false).map(projectNode) },
      {
        id: "publications",
        label: SECTION_TITLES.publications,
        tags: [],
        on: true,
        children: PUBLICATIONS.map((p) => ({ id: p.id, label: p.title, tags: p.tags, on: true, children: bulletNodes(p.bullets) })),
      },
      { id: "volunteer", label: SECTION_TITLES.volunteer, tags: [], on: true, children: EXPERIENCE.filter((r) => r.category === "volunteer").map(roleNode) },
      {
        id: "achievements",
        label: SECTION_TITLES.achievements,
        tags: [],
        on: true,
        children: ACHIEVEMENTS.map((a) => ({ id: a.id, label: `${a.lead}: ${a.text}`, tags: a.tags, on: true })),
      },
    ],
  };
}

const strip = (n: CatalogNode): Node => ({ id: n.id, on: n.on, ...(n.children ? { children: n.children.map(strip) } : {}) });

/** The public, standard resume layout. */
export function defaultConfig(): ResumeConfig {
  const c = catalog();
  return { contacts: c.contacts.map(strip), sections: c.sections.map(strip), fontSize: FONT_DEFAULT, pages: 1 };
}

/**
 * Reconciles a saved layout with the current catalog: keeps saved order and ticks,
 * drops ids that no longer exist, and appends new content items UNTICKED.
 */
function reconcile(saved: unknown, cat: CatalogNode[], topLevel = false): Node[] {
  const list = Array.isArray(saved) ? saved : [];
  const byId = new Map(cat.map((c) => [c.id, c]));
  const seen = new Set<string>();
  const out: Node[] = [];
  for (const raw of list) {
    if (!raw || typeof raw !== "object") continue;
    const { id, on, children } = raw as { id?: unknown; on?: unknown; children?: unknown };
    if (typeof id !== "string" || seen.has(id) || !byId.has(id)) continue;
    const c = byId.get(id)!;
    seen.add(id);
    out.push({ id, on: on === true, ...(c.children ? { children: reconcile(children, c.children) } : {}) });
  }
  for (const c of cat) {
    if (seen.has(c.id)) continue;
    // New top-level sections follow their default; new items inside a saved layout start unticked.
    const n = strip(c);
    out.push(topLevel ? n : { ...n, on: list.length === 0 ? c.on : false });
  }
  return out;
}

export function normalizeConfig(input: unknown): ResumeConfig {
  const c = catalog();
  const raw = (input && typeof input === "object" ? input : {}) as Partial<ResumeConfig>;
  const size = Number(raw.fontSize);
  return {
    contacts: reconcile(raw.contacts, c.contacts),
    sections: reconcile(raw.sections, c.sections, true),
    fontSize: Number.isFinite(size) ? Math.min(FONT_MAX, Math.max(FONT_MIN, size)) : FONT_DEFAULT,
    pages: raw.pages === 2 ? 2 : 1,
  };
}

// ---------------------------------------------------------------------------
// Resolve a layout into printable content.
// ---------------------------------------------------------------------------

export type ResolvedSection =
  | { kind: "education"; title: string; items: (typeof EDUCATION)[number][] }
  | { kind: "skills"; title: string; items: { label: string; names: string[] }[] }
  | { kind: "experience" | "volunteer"; title: string; items: { role: Role; bullets: string[] }[] }
  | { kind: "projects"; title: string; items: { project: Project; bullets: string[] }[] }
  | { kind: "publications"; title: string; items: { pub: (typeof PUBLICATIONS)[number]; bullets: string[] }[] }
  | { kind: "achievements"; title: string; items: (typeof ACHIEVEMENTS)[number][] };

export type ResolvedResume = { contacts: typeof CONTACTS; sections: ResolvedSection[] };

const on = (nodes: Node[] | undefined) => (nodes ?? []).filter((n) => n.on);

function pickBullets(nodes: Node[] | undefined, bullets: Bullet[]): string[] {
  const byId = new Map(bullets.map((b) => [b.id, b.text]));
  return on(nodes).map((n) => byId.get(n.id)).filter((t): t is string => Boolean(t));
}

export function resolveResume(config: ResumeConfig): ResolvedResume {
  const contacts = on(config.contacts)
    .map((n) => CONTACTS.find((c) => c.id === n.id))
    .filter((c): c is (typeof CONTACTS)[number] => Boolean(c));

  const sections: ResolvedSection[] = [];
  for (const s of on(config.sections)) {
    const id = s.id as SectionId;
    const title = SECTION_TITLES[id];
    const kids = on(s.children);
    let section: ResolvedSection | null = null;

    if (id === "education") {
      section = { kind: id, title, items: kids.map((n) => EDUCATION.find((e) => e.id === n.id)).filter((e) => e !== undefined) };
    } else if (id === "skills") {
      section = {
        kind: id,
        title,
        items: kids
          .map((n) => {
            const g = SKILLS.find((x) => x.id === n.id);
            if (!g) return null;
            const names = on(n.children).map((c) => g.items.find((i) => i.id === c.id)?.name).filter((x): x is string => Boolean(x));
            return names.length ? { label: g.label, names } : null;
          })
          .filter((x) => x !== null),
      };
    } else if (id === "experience" || id === "volunteer") {
      section = {
        kind: id,
        title,
        items: kids
          .map((n) => EXPERIENCE.find((r) => r.id === n.id))
          .filter((r) => r !== undefined)
          .map((role) => ({ role, bullets: pickBullets(kids.find((k) => k.id === role.id)?.children, role.bullets) })),
      };
    } else if (id === "projects") {
      section = {
        kind: id,
        title,
        items: kids
          .map((n) => PROJECTS.find((p) => p.id === n.id))
          .filter((p) => p !== undefined)
          .map((project) => ({ project, bullets: pickBullets(kids.find((k) => k.id === project.id)?.children, project.bullets) })),
      };
    } else if (id === "publications") {
      section = {
        kind: id,
        title,
        items: kids
          .map((n) => PUBLICATIONS.find((p) => p.id === n.id))
          .filter((p) => p !== undefined)
          .map((pub) => ({ pub, bullets: pickBullets(kids.find((k) => k.id === pub.id)?.children, pub.bullets) })),
      };
    } else if (id === "achievements") {
      section = { kind: id, title, items: kids.map((n) => ACHIEVEMENTS.find((a) => a.id === n.id)).filter((a) => a !== undefined) };
    }

    if (section && section.items.length > 0) sections.push(section);
  }
  return { contacts, sections };
}
