import { catalog, type CatalogNode, type Node, type ResumeConfig } from "@/lib/resume-model";

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

const MAX_PROJECTS = 3;

/**
 * Suggests a layout for a job description, starting from the current one:
 * relevant skills, skill groups and experience bullets move up, and the most
 * relevant projects are ticked (top 3). Nothing is reworded or invented.
 */
export function arrangeForJd(config: ResumeConfig, jd: string): { config: ResumeConfig; matched: string[] } {
  const weights = extractTags(jd);
  const matched = [...weights.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  if (weights.size === 0) return { config, matched };

  const cat = new Map<string, CatalogNode>();
  const index = (nodes: CatalogNode[], prefix: string) =>
    nodes.forEach((n) => {
      cat.set(prefix + n.id, n);
      if (n.children) index(n.children, prefix + n.id + "/");
    });
  index(catalog().sections, "");

  const s = (path: string) => score(cat.get(path)?.tags ?? [], weights);
  const sortBy = (nodes: Node[], path: string) =>
    nodes
      .map((n, i) => ({ n, i, sc: s(path + n.id), pin: cat.get(path + n.id)?.pinLast }))
      .sort((a, b) => Number(a.pin ?? 0) - Number(b.pin ?? 0) || b.sc - a.sc || a.i - b.i)
      .map((x) => x.n);

  const sections = config.sections.map((sec) => {
    const base = sec.id + "/";
    const kids = sec.children ?? [];
    if (sec.id === "skills") {
      const groups = sortBy(kids, base).map((g) => ({ ...g, children: sortBy(g.children ?? [], base + g.id + "/") }));
      return { ...sec, children: groups };
    }
    if (sec.id === "experience") {
      return { ...sec, children: kids.map((r) => ({ ...r, children: sortBy(r.children ?? [], base + r.id + "/") })) };
    }
    if (sec.id === "projects") {
      const ranked = sortBy(kids, base);
      return { ...sec, children: ranked.map((p, i) => ({ ...p, on: i < MAX_PROJECTS })) };
    }
    return sec;
  });

  return { config: { ...config, sections }, matched };
}
