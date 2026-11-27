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
  aws: ["aws", "amazon web services", "glue", "redshift", "emr"],
  s3: ["s3", "object storage"],
  lambda: ["lambda", "aws lambda"],
  "step-functions": ["step functions", "step function", "stepfunctions", "state machine", "state machines"],
  eventbridge: ["eventbridge", "cloudwatch events", "event bridge"],
  "event-driven": ["event-driven", "event driven", "event triggers", "triggers", "sqs", "sns"],
  athena: ["athena", "presto", "trino"],
  dynamodb: ["dynamodb", "dynamo db"],
  nosql: ["nosql", "no-sql", "mongodb", "key-value"],
  iam: ["iam", "access management", "least privilege", "least-privilege"],
  orchestration: ["orchestration", "orchestrate", "workflow", "workflows"],
  itsm: ["servicenow", "itsm", "incident management", "bmc helix", "remedy"],
  "production-support": ["production support", "on-call", "incident", "incidents", "monitoring"],
  cloud: ["cloud", "gcp", "azure"],
  parquet: ["parquet", "avro", "orc", "file formats"],
  "data-engineering": ["data engineer", "data engineering", "data pipeline", "data pipelines", "data platform", "data warehouse", "data lake", "lakehouse", "spark", "pyspark", "airflow", "big data"],
  etl: ["etl", "elt", "ingestion", "batch processing"],
  "data-modeling": ["data modeling", "data modelling", "dimensional", "schema design", "star schema"],
  scheduling: ["scheduling", "scheduler", "batch jobs", "cron"],
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
export const RESUME_PROJECTS = PROJECTS.filter((p) => p.onResume !== false);

/** All resume-eligible projects, most relevant to the JD first (authored order breaks ties). */
export function rankProjects(jd: string): Project[] {
  const weights = extractTags(jd);
  if (weights.size === 0) {
    const order = new Map(DEFAULT_RESUME_PROJECTS.map((t, i) => [t, i]));
    return [...RESUME_PROJECTS].sort((a, b) => (order.get(a.title) ?? 99) - (order.get(b.title) ?? 99));
  }
  return RESUME_PROJECTS.map((p, i) => ({ p, s: score(p.tags, weights), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.p);
}

/** Titles of the projects suggested for this JD (the default three when there is no JD). */
export function suggestedProjects(jd: string): string[] {
  return extractTags(jd).size === 0 ? DEFAULT_RESUME_PROJECTS : rankProjects(jd).slice(0, MAX_PROJECTS).map((p) => p.title);
}

export type ResumeOptions = {
  jd?: string;
  projects?: string[]; // titles to include; omitted = suggestion
  hiddenBullets?: string[]; // experience bullet texts to leave out
};

/**
 * Builds the resume from content/profile.ts. With a JD, relevant experience bullets, projects
 * and skills move up. Content is only selected and reordered, never generated or reworded.
 */
export function buildResume({ jd = "", projects, hiddenBullets = [] }: ResumeOptions = {}): ResumeData {
  const weights = extractTags(jd);
  const tailored = weights.size > 0;
  const hidden = new Set(hiddenBullets);

  const experience = EXPERIENCE.map((role) => {
    const bullets = role.bullets.filter((b) => !hidden.has(b.text));
    return {
      ...role,
      bullets: tailored
        ? [
            ...bullets.filter((b) => !b.pinLast).sort((a, b) => score(b.tags, weights) - score(a.tags, weights)),
            ...bullets.filter((b) => b.pinLast),
          ]
        : bullets,
    };
  });

  const include = new Set(projects ?? suggestedProjects(jd));
  const chosen = rankProjects(jd).filter((p) => include.has(p.title)); // bullets keep authored order

  const skills = tailored
    ? SKILLS.map((g, i) => {
        const items = [...g.items].sort((a, b) => score(b.tags, weights) - score(a.tags, weights));
        return { g: { ...g, items }, s: g.items.reduce((sum, it) => sum + score(it.tags, weights), 0), i };
      })
        .sort((a, b) => b.s - a.s || a.i - b.i)
        .map((x) => x.g)
    : SKILLS;

  const matched = [...weights.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  return { experience, projects: chosen, skills, tailored, matched };
}

/** The standard resume everyone can download. */
export const defaultResume = () => buildResume();
