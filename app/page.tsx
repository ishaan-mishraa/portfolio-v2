import React from "react";
import { Badge } from "@/components/ui/badge";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Download, Briefcase, GraduationCap, ExternalLink } from "lucide-react";

// ---------------------------------------------------------------------------
// CONTENT — edit this section to update the site. The layout below reads it.
// ---------------------------------------------------------------------------

// Tip: put your resume in /public (e.g. public/Ishaan_Mishra_Resume.pdf) and set
// this to "/Ishaan_Mishra_Resume.pdf". Google Drive download links can expire.
const RESUME_URL =
  "https://drive.usercontent.google.com/download?id=1PpmLUcKgG8oyywz1APtBKR-Cg2rVfX_r&export=download&authuser=0&confirm=t&uuid=9b0c78a2-11d7-4fd6-bde5-14d73b713f25&at=AFYLz4NtGQABJEni6o3hcUpLEjZE:1787755107775";

const TAGLINE =
  "I build reliable backends and train vision models, lately ones that catch deepfakes.";

const SKILLS = ["Java", "Spring Boot", "Angular", "Next.js", "Python", "Deep Learning", "PostgreSQL"];

const STATS = [
  { value: "9.37", label: "CGPA, B.Tech CSE (KIIT)" },
  { value: "96+", label: "GATE CS 2026 percentile" },
  { value: "93.47%", label: "Best deepfake-detection accuracy" },
  { value: "1", label: "Paper, Springer LNNS (ICTIS 2026)" },
];

type LinkItem = { label: string; href: string };
type Project = { title: string; kind: string; description: string; stack: string[]; links: LinkItem[] };

const PROJECTS: Project[] = [
  {
    title: "Hybrid Deepfake Detection",
    kind: "Research",
    description:
      "Pairs a SWIN Transformer with CNN and CLIP backbones to tell real faces from AI-generated ones. The best hybrid reached 93.47% accuracy, and every hybrid beat its standalone backbone. Team project; paper in preparation.",
    stack: ["Python", "Vision Transformers", "CNNs"],
    links: [{ label: "Code", href: "https://github.com/ishaan-mishraa/hybrid-deepfake-detection" }],
  },
  {
    title: "Brain Tumor Detection from MRI",
    kind: "Publication",
    description:
      "Co-authored a comparative study of modern CNN and transformer models for classifying brain MRI scans as tumor or non-tumor. Presented at ICTIS 2026 in Bangkok; to appear in Springer LNNS.",
    stack: ["Python", "Deep Learning", "Medical Imaging"],
    links: [{ label: "Code", href: "https://github.com/ishaan-mishraa/btd-comparative-study" }],
  },
  {
    title: "CricMarket",
    kind: "Product",
    description:
      "Tracks IPL auction prices (2024–26), team purses and player T20 stats. A Python scraper on GitHub Actions feeds Supabase, served through a Hono API on Cloudflare Workers and a Next.js app.",
    stack: ["Next.js", "Hono", "Cloudflare Workers", "Supabase", "Python"],
    links: [
      { label: "Live", href: "https://cricmarket.ishaanm.dev" },
      { label: "Code", href: "https://github.com/ishaan-mishraa/cricmarket" },
    ],
  },
  {
    title: "Leavewise",
    kind: "Full-stack",
    description:
      "Leave management for small teams that warns when too many teammates would be off at once. Separate employee, manager and HR roles, enforced with Spring Security and JWT.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    links: [
      { label: "Live", href: "https://leavewise-eight.vercel.app" },
      { label: "Code", href: "https://github.com/ishaan-mishraa/leavewise" },
    ],
  },
];

type Role = { title: string; org: string; meta: string; points: string[]; link?: LinkItem };

const EXPERIENCE: Role[] = [
  {
    title: "Systems Engineer (Digital)",
    org: "Tata Consultancy Services",
    meta: "Jun 2026 – Present · Bengaluru",
    points: [
      "Trained in the Java full-stack track (Spring Boot, Angular, SQL).",
      "Built a role-based banking app with JWT auth and guardian approval for high-value transfers as the final project.",
    ],
  },
  {
    title: "Project Intern",
    org: "ADRDE, DRDO",
    meta: "May – Jun 2024 · Agra",
    points: [
      "Built an intranet plotting tool in React that parses six data file formats into interactive 2D and 3D visualizations (Plotly.js, Three.js, Cesium.js).",
    ],
    link: { label: "Certificate", href: "https://drive.google.com/file/d/1DnLuerQ-N-id9Y5GgoMB3BZC9brV87U-/view?usp=sharing" },
  },
  {
    title: "Technical Team Member",
    org: "Enactus KIIT",
    meta: "Mar 2023 – Jan 2025 · Bhubaneswar",
    points: [
      "Built web apps for social-enterprise projects; part of the team that won the Early Stage category at Enactus Nationals 2024.",
    ],
  },
];

const EDUCATION = [
  { title: "B.Tech, Computer Science & Engineering", org: "KIIT University", meta: "2022 – 2026 · CGPA 9.37" },
  { title: "GATE Computer Science", org: "Qualified 2025 and 2026", meta: "96+ percentile (2026)" },
];

const NOW = "Learning Japanese and going deeper into deepfake-detection research.";

// ---------------------------------------------------------------------------
// LAYOUT
// ---------------------------------------------------------------------------

const cardClass = "bg-slate-900/40 border-slate-800 backdrop-blur-sm";

function TimelineDot({ active }: { active?: boolean }) {
  return (
    <div
      className={`absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 ${
        active ? "border-slate-400" : "border-slate-800"
      } bg-slate-950 ring-4 ring-slate-950`}
    />
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-slate-950 font-sans selection:bg-slate-800 overflow-x-hidden pb-8">
      {/* --- HERO --- */}
      <div className="relative flex h-screen w-full flex-col items-center justify-center shrink-0">
        <div className="absolute inset-0 z-0 w-full h-full">
          <BackgroundRippleEffect />
        </div>

        <div className="relative z-20 w-full max-w-3xl px-6 flex flex-col items-center pointer-events-none">
          <h1 className="text-center text-5xl md:text-7xl font-bold text-slate-100 tracking-tight pointer-events-auto">
            Ishaan Mishra
          </h1>

          <div className="mt-6 max-w-2xl text-center pointer-events-auto">
            <TextGenerateEffect words={TAGLINE} className="text-slate-400 text-base md:text-xl" />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 pointer-events-auto">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Download Resume
            </a>
            <a
              href="#work"
              className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-colors hover:bg-slate-800"
            >
              See my work
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10 pointer-events-auto">
            {SKILLS.map((s) => (
              <Badge key={s} variant="outline" className="bg-slate-900/50 text-slate-300 border-slate-700 backdrop-blur-sm px-3 py-1">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* --- AT A GLANCE --- */}
      <section className="relative z-20 w-full max-w-5xl px-6 mx-auto mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <Card key={s.label} className={cardClass}>
              <CardContent className="p-5">
                <p className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tighter">{s.value}</p>
                <p className="mt-1 text-xs text-slate-400 leading-snug">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- SELECTED WORK --- */}
      <section id="work" className="relative z-20 w-full max-w-5xl px-6 mx-auto mt-24 scroll-mt-12">
        <h2 className="text-2xl font-bold text-slate-100 mb-6">Selected work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((p) => (
            <Card key={p.title} className={`${cardClass} flex flex-col`}>
              <CardHeader>
                <CardDescription className="text-xs uppercase tracking-widest text-slate-500">{p.kind}</CardDescription>
                <CardTitle className="text-slate-100 text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow gap-4">
                <p className="text-slate-300 text-sm leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-slate-800 text-slate-300 border-none text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex gap-4 pt-2">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      {l.label} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- EXPERIENCE + EDUCATION --- */}
      <section id="experience" className="relative z-20 w-full max-w-5xl px-6 mx-auto mt-24 scroll-mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-400" /> Experience
            </h2>
            <div className="border-l-2 border-slate-800 ml-3 pl-8 py-2 flex flex-col gap-8">
              {EXPERIENCE.map((r, i) => (
                <div key={r.org} className="relative">
                  <TimelineDot active={i === 0} />
                  <Card className={`${cardClass} shadow-none`}>
                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-slate-100 text-base">{r.title}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {r.org} · {r.meta}
                        </CardDescription>
                      </div>
                      {r.link && (
                        <a
                          href={r.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-sky-400 hover:underline flex items-center gap-1"
                        >
                          {r.link.label} <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-slate-300 text-sm leading-relaxed space-y-2">
                      {r.points.map((pt) => (
                        <p key={pt}>{pt}</p>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-slate-400" /> Education
            </h2>
            <div className="border-l-2 border-slate-800 ml-3 pl-8 py-2 flex flex-col gap-8">
              {EDUCATION.map((e, i) => (
                <div key={e.title} className="relative">
                  <TimelineDot active={i === 0} />
                  <Card className={`${cardClass} shadow-none`}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-slate-100 text-base">{e.title}</CardTitle>
                      <CardDescription className="text-slate-400">
                        {e.org} · {e.meta}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">Now</p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{NOW}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-20 w-full max-w-5xl mx-auto px-6 mt-24 pb-8">
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Ishaan Mishra</p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="/contact" className="hover:text-slate-200 transition-colors">
              Contact
            </a>
            <a href="https://github.com/ishaan-mishraa" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
              GitHub <span className="text-slate-600">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/ishaanmishraa/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
              LinkedIn <span className="text-slate-600">↗</span>
            </a>
            <a href="https://x.com/ishaanmishraa" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">
              X <span className="text-slate-600">↗</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}