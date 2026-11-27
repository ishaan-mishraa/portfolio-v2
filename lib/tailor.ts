import {
  DEFAULT_RESUME_PROJECTS,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  type Project,
  type Role,
  type SkillGroup,
} from "@/content/profile";

// Maps phrases that appear in job descriptions to the tags used in content/profile.ts.
// Matching is case-insensitive on word boundaries. Add synonyms here as needed.
const KEYWORDS: Record<string, string[]> = {
  python: ["python", "pandas", "numpy"],
  java: ["java", "jvm"],
  typescript: ["typescript"],
  javascript: ["javascript", "node.js", "nodejs"],
  sql: ["sql", "mysql", "t-sql", "pl/sql", "query", "queries"],
  postgresql: ["postgres", "postgresql"],
  supabase: ["supabase"],
  c: ["c programming", "c/c++", "embedded c"],
  linux: ["linux", "unix", "shell", "bash"],
  aws: ["aws", "amazon web services", "s3", "glue", "athena", "lambda", "redshift", "emr"],
  cloud: ["cloud", "gcp", "azure"],
  parquet: ["parquet", "avro", "orc", "file formats"],
  "data-engineering": ["data engineer", "data engineering", "data pipeline", "data pipelines", "data platform", "data warehouse", "data lake", "lakehouse", "spark", "pyspark", "airflow", "big data"],
  etl: ["etl", "elt", "ingestion", "batch processing"],
  "data-modeling": ["data modeling", "data modelling", "dimensional", "schema design", "star schema"],
  scheduling: ["scheduling", "scheduler", "orchestration", "batch jobs"],
  "control-m": ["control-m", "controlm"],
  jenkins: ["jenkins"],
  "ci-cd": ["ci/cd", "ci-cd", "continuous integration", "github actions", "devops pipeline"],
  docker: ["docker", "container", "containers", "kubernetes", "k8s"],
  devops: ["devops"],
  git: ["git", "version control"],
  jira: ["jira"],
  agile: ["agile", "scrum", "kanban"],
  ml: ["machine learning", "ml", "model training", "scikit-learn", "sklearn"],
  "deep-learning": ["deep learning", "neural network", "neural networks", "dl"],
  pytorch: ["pytorch", "torch"],
  "computer-vision": ["computer vision", "image classification", "vision", "cv", "opencv", "image"],
  transformers: ["transformer", "transformers", "vit", "attention", "llm", "foundation model"],
  research: ["research", "publication", "publications", "paper", "papers", "phd", "academic"],
  healthcare: ["healthcare", "medical", "clinical", "imaging"],
  spring: ["spring", "spring boot", "springboot", "microservices"],
  backend: ["backend", "back-end", "server-side", "api", "apis"],
  rest: ["rest", "restful"],
  frontend: ["frontend", "front-end", "ui", "web app"],
  react: ["react", "reactjs"],
  nextjs: ["next.js", "nextjs"],
  angular: ["angular"],
  cloudflare: ["cloudflare"],
  serverless: ["serverless", "edge functions"],
  security: ["security", "authentication", "authorization", "jwt", "oauth"],
  "data-visualization": ["visualization", "visualisation", "dashboards", "plotly"],
};

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
}

/** Returns tag -> number of mentions found in the job description. */
export function extractTags(jd: string): Map<string, number> {
  const text = ` ${jd.toLowerCase()} `;
  const found = new Map<string, number>();
  for (const [tag, phrases] of Object.entries(KEYWORDS)) {
    let count = 0;
    for (const p of phrases) {
      const re = new RegExp(`(?<![a-z0-9])${escapeRe(p)}(?![a-z0-9])`, "g");
      count += text.match(re)?.length ?? 0;
    }
    if (count > 0) found.set(tag, count);
  }
  return found;
}

const score = (tags: string[], weights: Map<string, number>) =>
  tags.reduce((s, t) => s + Math.min(weights.get(t) ?? 0, 3), 0);

export type ResumeData = {
  experience: Role[];
  projects: Project[];
  skills: SkillGroup[];
  tailored: boolean;
  matched: string[]; // human-readable matched keywords, for the UI
};

const MAX_PROJECTS = 3;
const RESUME_PROJECTS = PROJECTS.filter((p) => p.onResume !== false);

/** Default resume: authored content, with the projects listed in DEFAULT_RESUME_PROJECTS. */
export function defaultResume(): ResumeData {
  const projects = DEFAULT_RESUME_PROJECTS.map((t) => RESUME_PROJECTS.find((p) => p.title === t)).filter(
    (p): p is Project => Boolean(p),
  );
  return { experience: EXPERIENCE, projects, skills: SKILLS, tailored: false, matched: [] };
}

/**
 * Tailored resume: same true content, reordered and selected for relevance.
 * Nothing is invented or reworded; low-relevance items are moved down or left out.
 */
export function tailorResume(jd: string): ResumeData {
  const weights = extractTags(jd);
  if (weights.size === 0) return defaultResume();

  // Experience stays chronological; bullets inside each role are reordered by relevance.
  const experience = EXPERIENCE.map((role) => ({
    ...role,
    bullets: [...role.bullets].sort((a, b) => score(b.tags, weights) - score(a.tags, weights)),
  }));

  // Projects: pick the most relevant ones (stable for ties, so authored order wins).
  const projects = RESUME_PROJECTS.map((p, i) => ({ p, s: score(p.tags, weights), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, MAX_PROJECTS)
    .map((x) => x.p); // bullets keep their authored order so each project still reads as a story

  // Skills: within each group, relevant skills first; groups ordered by total relevance.
  const skills = SKILLS.map((g, i) => {
    const items = [...g.items].sort((a, b) => score(b.tags, weights) - score(a.tags, weights));
    return { g: { ...g, items }, s: g.items.reduce((s, it) => s + score(it.tags, weights), 0), i };
  })
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.g);

  const matched = [...weights.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  return { experience, projects, skills, tailored: true, matched };
}
