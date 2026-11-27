// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH
// Everything on the website AND in the downloadable resume comes from this file.
// Edit here, push, and both update.
//
// `tags` are used only for the "tailor to a job description" feature: they say
// which keywords an item is relevant to. They never appear on the page.
// ---------------------------------------------------------------------------

export type LinkItem = { label: string; href: string };

export type Bullet = { text: string; tags: string[] };

export type Role = {
  title: string;
  org: string;
  period: string;
  location: string;
  bullets: Bullet[];
  link?: LinkItem;
};

export type Project = {
  title: string;
  kind: "Research" | "Publication" | "Product" | "Full-stack";
  summary: string; // one line, used on the resume
  description: string; // longer, used on the website
  stack: string[];
  tags: string[];
  links: LinkItem[];
  featured?: boolean; // always kept on the default resume
};

export type SkillGroup = { label: string; items: { name: string; tags: string[] }[] };

export const PROFILE = {
  name: "Ishaan Mishra",
  headline: "Data Engineer · ML Researcher",
  tagline: "I build data pipelines by day and study how vision models detect deepfakes, and where they cheat.",
  location: "India",
  email: "ishaancodes01@gmail.com",
  site: "https://ishaanm.dev",
  links: {
    github: "https://github.com/ishaan-mishraa",
    linkedin: "https://www.linkedin.com/in/ishaanmishraa/",
    x: "https://x.com/ishaanmishraa",
    kaggle: "https://www.kaggle.com/ishaanmxshra",
  },
  summary:
    "Computer science graduate (CGPA 9.37) working as a data engineer on insurance data pipelines on AWS. Co-author of a Springer LNNS publication on deep learning for brain MRI classification; currently researching dataset bias and generalization in deepfake detection.",
  now: "Data engineering at TCS by day. Mornings go to deepfake-detection research, math for ML, and Japanese (JLPT N4, July 2027).",
};

export const STATS = [
  { value: "9.37", label: "CGPA", detail: "B.Tech in Computer Science & Engineering, KIIT University (2022–26)." },
  {
    value: "Springer",
    label: "LNNS publication",
    detail: "Comparative Study of Emerging DL Models in Brain Tumor Detection. Presented at ICTIS 2026, Bangkok.",
  },
  { value: "2×", label: "GATE CS qualified", detail: "Qualified GATE Computer Science in 2025 and 2026 (96+ percentile in 2026)." },
];

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", tags: ["python"] },
      { name: "Java", tags: ["java"] },
      { name: "TypeScript", tags: ["typescript", "javascript"] },
      { name: "SQL", tags: ["sql"] },
    ],
  },
  {
    label: "Data engineering",
    items: [
      { name: "AWS", tags: ["aws", "cloud"] },
      { name: "Parquet", tags: ["parquet", "data-engineering"] },
      { name: "Data modeling", tags: ["data-modeling", "data-engineering", "sql"] },
      { name: "ETL pipelines", tags: ["etl", "data-engineering"] },
      { name: "PostgreSQL", tags: ["postgresql", "sql"] },
      { name: "Supabase", tags: ["supabase", "postgresql"] },
    ],
  },
  {
    label: "Machine learning",
    items: [
      { name: "PyTorch", tags: ["pytorch", "deep-learning", "ml"] },
      { name: "timm / torchvision", tags: ["pytorch", "computer-vision"] },
      { name: "Vision Transformers", tags: ["transformers", "computer-vision", "deep-learning"] },
      { name: "CNNs", tags: ["computer-vision", "deep-learning"] },
      { name: "Transfer learning", tags: ["deep-learning", "ml"] },
    ],
  },
  {
    label: "Web & backend",
    items: [
      { name: "Spring Boot", tags: ["spring", "java", "backend"] },
      { name: "Next.js / React", tags: ["nextjs", "react", "frontend"] },
      { name: "Angular", tags: ["angular", "frontend"] },
      { name: "REST APIs", tags: ["rest", "backend"] },
      { name: "Cloudflare Workers", tags: ["cloudflare", "serverless", "cloud"] },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git & GitHub Actions", tags: ["git", "ci-cd"] },
      { name: "Jenkins", tags: ["jenkins", "ci-cd"] },
      { name: "Docker", tags: ["docker", "devops"] },
      { name: "BMC Control-M", tags: ["control-m", "scheduling", "data-engineering"] },
      { name: "Jira", tags: ["jira", "agile"] },
    ],
  },
];

export const EXPERIENCE: Role[] = [
  {
    title: "Systems Engineer (Digital), Data Engineering",
    org: "Tata Consultancy Services",
    period: "Jun 2026 – Present",
    location: "India",
    bullets: [
      {
        text: "Data engineer on a US insurance client's data platform: build and maintain pipelines on AWS that generate Parquet and other downstream data files.",
        tags: ["data-engineering", "aws", "parquet", "etl", "cloud"],
      },
      {
        text: "Work on data models and scheduled batch jobs (BMC Control-M), with builds through Jenkins and production tickets through Jira and BMC Helix.",
        tags: ["data-modeling", "control-m", "jenkins", "ci-cd", "jira", "scheduling", "agile"],
      },
      {
        text: "Completed TCS's Java full-stack training (Spring Boot, Angular, SQL); capstone was a role-based banking app with JWT auth and guardian approval for high-value transfers.",
        tags: ["java", "spring", "angular", "sql", "backend", "security"],
      },
    ],
  },
  {
    title: "Project Intern",
    org: "ADRDE, DRDO",
    period: "May – Jun 2024",
    location: "Agra",
    bullets: [
      {
        text: "Built an intranet plotting tool in React that parses six data file formats into interactive 2D and 3D visualizations (Plotly.js, Three.js, Cesium.js).",
        tags: ["react", "frontend", "javascript", "data-visualization"],
      },
    ],
    link: { label: "Certificate", href: "https://drive.google.com/file/d/1DnLuerQ-N-id9Y5GgoMB3BZC9brV87U-/view?usp=sharing" },
  },
  {
    title: "Technical Team Member",
    org: "Enactus KIIT",
    period: "Mar 2023 – Jan 2025",
    location: "Bhubaneswar",
    bullets: [
      {
        text: "Built web apps for social-enterprise projects; part of the team that won the Early Stage category at Enactus Nationals 2024.",
        tags: ["frontend", "react", "teamwork"],
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Hybrid Deepfake Detection",
    kind: "Research",
    summary:
      "Fused a Swin Transformer with CNN and CLIP backbones plus an FFT frequency branch to classify real vs. AI-generated faces; every hybrid beat its standalone backbone.",
    description:
      "Pairs a Swin Transformer with ConvNeXt, DenseNet, MobileNet and CLIP backbones, plus an FFT frequency branch and attention fusion, to tell real faces from manipulated ones. Every hybrid beat its standalone backbone on our merged test split. Now studying how dataset bias inflates numbers like these.",
    stack: ["PyTorch", "timm", "Vision Transformers", "CLIP"],
    tags: ["pytorch", "computer-vision", "deep-learning", "transformers", "ml", "research", "python"],
    links: [{ label: "Code", href: "https://github.com/ishaan-mishraa/hybrid-deepfake-detection" }],
    featured: true,
  },
  {
    title: "Brain Tumor Detection from MRI",
    kind: "Publication",
    summary:
      "Benchmarked VGG19, ResNet50, DenseNet121, ConvNeXt-Tiny and EfficientNet-B0 with transfer learning on a 13.7k-image MRI dataset; published in Springer LNNS.",
    description:
      "Co-authored a comparative study of five CNN architectures (VGG19, ResNet50, DenseNet121, ConvNeXt-Tiny, EfficientNet-B0) for classifying brain MRI scans as tumor or non-tumor. Presented at ICTIS 2026 in Bangkok; published in Springer LNNS.",
    stack: ["PyTorch", "Transfer learning", "Medical imaging"],
    tags: ["pytorch", "computer-vision", "deep-learning", "ml", "research", "python", "healthcare"],
    links: [{ label: "Code", href: "https://github.com/ishaan-mishraa/btd-comparative-study" }],
    featured: true,
  },
  {
    title: "CricMarket",
    kind: "Product",
    summary:
      "IPL auction and player-stats tracker: a Python scraper on GitHub Actions feeds Supabase, served by a Hono API on Cloudflare Workers and a Next.js front end.",
    description:
      "Tracks IPL auction prices (2024–26), team purses and player T20 stats. A Python scraper on GitHub Actions feeds Supabase, served through a Hono API on Cloudflare Workers and a Next.js app.",
    stack: ["Next.js", "Hono", "Cloudflare Workers", "Supabase", "Python"],
    tags: ["nextjs", "react", "typescript", "cloudflare", "serverless", "supabase", "postgresql", "python", "etl", "ci-cd", "data-engineering", "backend", "frontend"],
    links: [
      { label: "Live", href: "https://cricmarket.ishaanm.dev" },
      { label: "Code", href: "https://github.com/ishaan-mishraa/cricmarket" },
    ],
  },
  {
    title: "Leavewise",
    kind: "Full-stack",
    summary:
      "Leave management for small teams with clash warnings and employee/manager/HR roles enforced through Spring Security and JWT.",
    description:
      "Leave management for small teams that warns when too many teammates would be off at once. Separate employee, manager and HR roles, enforced with Spring Security and JWT.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    tags: ["java", "spring", "angular", "postgresql", "sql", "docker", "backend", "frontend", "security", "rest"],
    links: [{ label: "Code", href: "https://github.com/ishaan-mishraa/leavewise" }],
  },
];

export const PUBLICATIONS = [
  {
    citation:
      "A. Hasan, I. Mishra, J. Bose, J. V. C. Sai, J. Kumar, K. Akhter, R. K. Dash. “Comparative Study of Emerging DL Models in BTD.” ICT for Intelligent Systems (ICTIS 2026), LNNS vol. 2137, Springer, 2027.",
    href: "https://doi.org/10.1007/978-3-032-35628-4_39",
  },
];

export const EDUCATION = [
  { title: "B.Tech, Computer Science & Engineering", org: "KIIT University, Bhubaneswar", period: "2022 – 2026", detail: "CGPA 9.37 / 10" },
];

export const ACHIEVEMENTS = [
  "Qualified GATE Computer Science in 2025 and 2026 (96+ percentile in 2026).",
  "Enactus Nationals 2024: Early Stage category winner (team).",
];
