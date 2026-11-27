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
  org: string;
  title: string;
  period: string;
  location: string;
  category: "work" | "volunteer"; // volunteer roles get their own resume section
  bullets: Bullet[];
  link?: LinkItem;
};

export type Project = {
  title: string;
  kind: "Research" | "Publication" | "Product" | "Full-stack";
  year: string;
  description: string; // website card text
  bullets: Bullet[]; // resume bullets
  stack: string[];
  tags: string[];
  links: LinkItem[];
  onResume?: boolean; // false = website only (e.g. publications, which have their own resume section)
};

export type SkillGroup = { label: string; items: { name: string; tags: string[] }[] };

export const PROFILE = {
  name: "Ishaan Mishra",
  headline: "Data Engineer · ML Researcher",
  tagline: "I build data pipelines by day and study how vision models detect deepfakes, and where they cheat.",
  location: "Bengaluru, Karnataka, India",
  email: "ishaancodes01@gmail.com",
  site: "https://ishaanm.dev",
  links: {
    github: "https://github.com/ishaan-mishraa",
    linkedin: "https://www.linkedin.com/in/ishaanmishraa/",
    x: "https://x.com/ishaanmishraa",
    kaggle: "https://www.kaggle.com/ishaanmxshra",
  },
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

export const EDUCATION = [
  {
    school: "Kalinga Institute of Industrial Technology",
    degree: "B.Tech in Computer Science and Engineering",
    detail: "CGPA: 9.37",
    period: "Aug 2022 – May 2026",
    location: "Bhubaneswar, India",
  },
];

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Java", tags: ["java"] },
      { name: "Python", tags: ["python"] },
      { name: "SQL", tags: ["sql"] },
      { name: "JavaScript", tags: ["javascript"] },
      { name: "TypeScript", tags: ["typescript", "javascript"] },
      { name: "HTML/CSS", tags: ["frontend"] },
      { name: "C", tags: ["c"] },
    ],
  },
  {
    label: "Data Engineering",
    items: [
      { name: "AWS", tags: ["aws", "cloud"] },
      { name: "Parquet", tags: ["parquet", "data-engineering"] },
      { name: "Data modeling", tags: ["data-modeling", "data-engineering", "sql"] },
      { name: "ETL pipelines", tags: ["etl", "data-engineering"] },
      { name: "BMC Control-M", tags: ["control-m", "scheduling", "data-engineering"] },
      { name: "Supabase", tags: ["supabase", "postgresql"] },
    ],
  },
  {
    label: "Web & Backend",
    items: [
      { name: "Spring Boot", tags: ["spring", "java", "backend"] },
      { name: "Angular", tags: ["angular", "frontend"] },
      { name: "Next.js / React", tags: ["nextjs", "react", "frontend"] },
      { name: "Node.js", tags: ["javascript", "backend"] },
      { name: "Express", tags: ["javascript", "backend"] },
      { name: "PostgreSQL", tags: ["postgresql", "sql"] },
      { name: "REST APIs", tags: ["rest", "backend"] },
      { name: "JWT", tags: ["security"] },
    ],
  },
  {
    label: "AI/ML",
    items: [
      { name: "PyTorch", tags: ["pytorch", "deep-learning", "ml"] },
      { name: "CNNs", tags: ["computer-vision", "deep-learning"] },
      { name: "Vision Transformers", tags: ["transformers", "computer-vision", "deep-learning"] },
      { name: "timm", tags: ["pytorch", "computer-vision"] },
      { name: "NumPy", tags: ["python", "ml"] },
      { name: "Matplotlib", tags: ["python", "data-visualization"] },
    ],
  },
  {
    label: "Tools & DevOps",
    items: [
      { name: "Git", tags: ["git"] },
      { name: "GitHub Actions", tags: ["ci-cd", "git"] },
      { name: "Jenkins", tags: ["jenkins", "ci-cd"] },
      { name: "Docker", tags: ["docker", "devops"] },
      { name: "Linux CLI", tags: ["linux"] },
      { name: "Jira", tags: ["jira", "agile"] },
      { name: "Swagger", tags: ["rest", "backend"] },
    ],
  },
];

export const EXPERIENCE: Role[] = [
  {
    org: "Tata Consultancy Services",
    title: "Systems Engineer (Digital), Data Engineering",
    period: "Jun 2026 – Present",
    location: "Bengaluru, India",
    category: "work",
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
        text: "Completed the Initial Learning Program in the Java Full Stack domain (Spring Boot, Angular, SQL), delivering a full-stack banking application as the final project.",
        tags: ["java", "spring", "angular", "sql", "backend"],
      },
    ],
  },
  {
    org: "ADRDE, DRDO, Govt. of India",
    title: "Project Intern",
    period: "May 2024 – Jun 2024",
    location: "Agra, India",
    category: "work",
    bullets: [
      {
        text: "Developed an intranet plotting application in React that parses six distinct file formats into 2D and 3D data visualizations (Plotly.js, Three.js, Cesium.js).",
        tags: ["react", "frontend", "javascript", "data-visualization"],
      },
      {
        text: "Improved usability with interactive, customizable visualization tools for defense applications.",
        tags: ["frontend", "data-visualization"],
      },
    ],
    link: { label: "Certificate", href: "https://drive.google.com/file/d/1DnLuerQ-N-id9Y5GgoMB3BZC9brV87U-/view?usp=sharing" },
  },
  {
    org: "Enactus KIIT (Student Society)",
    title: "Technical Team Member",
    period: "Mar 2023 – Jan 2025",
    location: "Bhubaneswar, India",
    category: "volunteer",
    bullets: [
      {
        text: "Built web applications supporting social-entrepreneurship initiatives; part of the team that won the 2024 Early Stage Category at Enactus Nationals.",
        tags: ["frontend", "react", "teamwork"],
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Hybrid Deepfake Detection",
    kind: "Research",
    year: "2025",
    description:
      "Pairs a Swin Transformer with ConvNeXt, DenseNet, MobileNet and CLIP backbones, plus an FFT frequency branch and attention fusion, to tell real faces from manipulated ones. Every hybrid beat its standalone backbone on our merged test split. Now studying how dataset bias inflates numbers like these.",
    bullets: [
      {
        text: "Researched hybrid architectures combining Swin Transformers with CNN and CLIP backbones, an FFT frequency branch and attention fusion to detect AI-generated and manipulated faces.",
        tags: ["deep-learning", "computer-vision", "transformers", "research", "pytorch"],
      },
      {
        text: "ConvNeXt-Swin hybrid reached 93.47% accuracy and 93.01% F1 on our merged test split, outperforming every standalone backbone.",
        tags: ["deep-learning", "ml", "research"],
      },
    ],
    stack: ["PyTorch", "timm", "Vision Transformers", "CLIP"],
    tags: ["pytorch", "computer-vision", "deep-learning", "transformers", "ml", "research", "python"],
    links: [{ label: "GitHub", href: "https://github.com/ishaan-mishraa/hybrid-deepfake-detection" }],
  },
  {
    title: "CricMarket",
    kind: "Product",
    year: "2026",
    description:
      "Tracks IPL auction prices (2024–26), team purses and player T20 stats. A Python scraper on GitHub Actions feeds Supabase, served through a Hono API on Cloudflare Workers and a Next.js app.",
    bullets: [
      {
        text: "Built a monorepo platform tracking IPL auction prices, team purses and player stats, with a Next.js front end and a Hono edge API on Cloudflare Workers.",
        tags: ["nextjs", "react", "typescript", "cloudflare", "serverless", "backend", "frontend"],
      },
      {
        text: "Automated data ingestion with Python scrapers on a GitHub Actions cron that seed a Supabase PostgreSQL database.",
        tags: ["python", "etl", "data-engineering", "ci-cd", "postgresql", "supabase", "scheduling"],
      },
    ],
    stack: ["Next.js", "Hono", "Cloudflare Workers", "Supabase", "Python", "GitHub Actions"],
    tags: ["nextjs", "react", "typescript", "cloudflare", "serverless", "supabase", "postgresql", "python", "etl", "ci-cd", "data-engineering", "backend", "frontend"],
    links: [
      { label: "GitHub", href: "https://github.com/ishaan-mishraa/cricmarket" },
      { label: "Live", href: "https://cricmarket.ishaanm.dev" },
    ],
  },
  {
    title: "Bank Management System with Guardian Approval",
    kind: "Full-stack",
    year: "2026",
    description:
      "Role-based banking app for customers, guardians and admins, with JWT auth and guardian approval for high-value transfers. Built as the final project of TCS's Java full-stack training.",
    bullets: [
      {
        text: "Developed a role-based full-stack banking application with JWT authentication and authorization for Customer, Guardian and Admin workflows.",
        tags: ["java", "spring", "angular", "security", "backend", "frontend", "rest"],
      },
      {
        text: "Implemented secure fund transfers with configurable approval thresholds, trusted contacts and guardian approval for high-value transactions, using transactional processing and pessimistic locking.",
        tags: ["java", "spring", "sql", "backend", "security"],
      },
    ],
    stack: ["Angular 18", "Spring Boot", "H2"],
    tags: ["java", "spring", "angular", "sql", "backend", "frontend", "security", "rest"],
    links: [],
  },
  {
    title: "Leavewise",
    kind: "Full-stack",
    year: "2026",
    description:
      "Leave management for small teams that warns when too many teammates would be off at once. Separate employee, manager and HR roles, enforced with Spring Security and JWT.",
    bullets: [
      {
        text: "Built a leave-management app that warns managers when too many teammates would be off at once.",
        tags: ["java", "spring", "angular", "backend", "frontend"],
      },
      {
        text: "Enforced employee, manager and HR roles with Spring Security and JWT; PostgreSQL storage, containerised with Docker.",
        tags: ["java", "spring", "security", "postgresql", "sql", "docker", "backend"],
      },
    ],
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    tags: ["java", "spring", "angular", "postgresql", "sql", "docker", "backend", "frontend", "security", "rest"],
    links: [{ label: "GitHub", href: "https://github.com/ishaan-mishraa/leavewise" }],
  },
  {
    title: "Brain Tumor Detection from MRI",
    kind: "Publication",
    year: "2026",
    description:
      "Co-authored a comparative study of five CNN architectures (VGG19, ResNet50, DenseNet121, ConvNeXt-Tiny, EfficientNet-B0) for classifying brain MRI scans as tumor or non-tumor. Presented at ICTIS 2026 in Bangkok; published in Springer LNNS.",
    bullets: [],
    stack: ["PyTorch", "Transfer learning", "Medical imaging"],
    tags: ["pytorch", "computer-vision", "deep-learning", "ml", "research", "python", "healthcare"],
    links: [{ label: "GitHub", href: "https://github.com/ishaan-mishraa/btd-comparative-study" }],
    onResume: false, // appears under Publications on the resume
  },
];

export const PUBLICATIONS = [
  {
    title: "Conference Paper: Comparative Study of Emerging DL Models in Brain Tumor Detection",
    date: "Apr 2026",
    venue: "ICTIS 2026, Bangkok · Springer LNNS vol. 2137",
    citation:
      "A. Hasan, I. Mishra, J. Bose, J. V. C. Sai, J. Kumar, K. Akhter, R. K. Dash. “Comparative Study of Emerging DL Models in BTD.” ICT for Intelligent Systems (ICTIS 2026), LNNS vol. 2137, Springer, 2027.",
    href: undefined as string | undefined, // add the DOI link once the chapter is live
    bullets: [
      "Co-authored and presented research on binary classification of brain tumors from MRI scans at ICTIS 2026 in Bangkok, Thailand; published in Springer LNNS.",
      "Benchmarked VGG19, ResNet50, DenseNet121, ConvNeXt-Tiny and EfficientNet-B0 with transfer learning; modern CNNs (ConvNeXt, EfficientNet) performed best.",
    ],
  },
];

export const ACHIEVEMENTS = [
  { lead: "GATE CS 2026", text: "cleared with a 96+ percentile (also qualified in 2025)" },
  { lead: "Enactus Nationals 2024", text: "Early Stage Category winner (team)" },
];

// Which projects the standard (non-tailored) resume shows, in this order.
// A tailored resume picks the most relevant ones instead.
export const DEFAULT_RESUME_PROJECTS = [
  "Bank Management System with Guardian Approval",
  "CricMarket",
  "Hybrid Deepfake Detection",
];
