// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH
// Everything on the website AND in the resume comes from this file.
//
// Every resume item has a stable `id`: the private studio (/studio) uses it to
// remember what you ticked and in which order. Don't reuse or rename ids.
// New items appear in the studio automatically (unticked in saved layouts).
//
// `resumeDefault: false` keeps an item off the public standard resume.
// `tags` only feed the "arrange for a job description" helper; never shown.
// ---------------------------------------------------------------------------

export type LinkItem = { label: string; href: string };

export type Bullet = { id: string; text: string; tags: string[]; pinLast?: boolean }; // pinLast: stays last when arranging for a JD

export type Role = {
  id: string;
  org: string;
  title: string;
  period: string;
  location: string;
  category: "work" | "volunteer"; // volunteer roles get their own resume section
  bullets: Bullet[];
  link?: LinkItem;
  resumeDefault?: boolean;
};

export type Project = {
  id: string;
  title: string;
  kind: "Research" | "Publication" | "Product" | "Full-stack";
  year: string;
  description: string; // website card text
  bullets: Bullet[]; // resume bullets
  stack: string[];
  tags: string[];
  links: LinkItem[];
  onResume?: boolean; // false = website only (publications have their own resume section)
  resumeDefault?: boolean;
};

export type Skill = { id: string; name: string; tags: string[]; resumeDefault?: boolean };
export type SkillGroup = { id: string; label: string; items: Skill[]; resumeDefault?: boolean };

export const PROFILE = {
  name: "Ishaan Mishra",
  tagline: "I build data pipelines on AWS and train vision models, lately ones that catch deepfakes.",
  location: "Bengaluru, Karnataka, India",
  email: "ishaancodes01@gmail.com",
  site: "https://ishaanm.dev",
  links: {
    github: "https://github.com/ishaan-mishraa",
    linkedin: "https://www.linkedin.com/in/ishaanmishraa/",
    x: "https://x.com/ishaanmishraa",
    kaggle: "https://www.kaggle.com/ishaanmxshra",
  },
  now: "Working as a data engineer at TCS. Learning Japanese and going deeper into deepfake-detection research.",
};

// Contact line at the top of the resume. No phone number: the standard resume is public.
export const CONTACTS = [
  { id: "email", label: "ishaancodes01@gmail.com", href: "mailto:ishaancodes01@gmail.com", resumeDefault: true },
  { id: "site", label: "ishaanm.dev", href: "https://ishaanm.dev", resumeDefault: true },
  { id: "linkedin", label: "linkedin.com/in/ishaanmishraa", href: "https://www.linkedin.com/in/ishaanmishraa/", resumeDefault: true },
  { id: "github", label: "github.com/ishaan-mishraa", href: "https://github.com/ishaan-mishraa", resumeDefault: true },
  { id: "kaggle", label: "kaggle.com/ishaanmxshra", href: "https://www.kaggle.com/ishaanmxshra", resumeDefault: false },
];

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
    id: "kiit",
    school: "Kalinga Institute of Industrial Technology",
    degree: "B.Tech in Computer Science and Engineering",
    detail: "CGPA: 9.37",
    period: "Aug 2022 – May 2026",
    location: "Bhubaneswar, India",
  },
];

export const SKILLS: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { id: "java", name: "Java", tags: ["java"] },
      { id: "python", name: "Python", tags: ["python"] },
      { id: "sql", name: "SQL", tags: ["sql"] },
      { id: "javascript", name: "JavaScript", tags: ["javascript"] },
      { id: "typescript", name: "TypeScript", tags: ["typescript", "javascript"] },
      { id: "html-css", name: "HTML/CSS", tags: ["frontend"] },
      { id: "c", name: "C", tags: ["c"] },
    ],
  },
  {
    id: "aws",
    label: "Cloud (AWS)",
    items: [
      { id: "s3", name: "S3", tags: ["s3", "aws", "cloud"] },
      { id: "lambda", name: "Lambda", tags: ["lambda", "aws", "serverless", "cloud"] },
      { id: "step-functions", name: "Step Functions", tags: ["step-functions", "aws", "orchestration", "serverless"] },
      { id: "eventbridge", name: "EventBridge", tags: ["eventbridge", "aws", "event-driven"] },
      { id: "athena", name: "Athena", tags: ["athena", "aws", "sql"] },
      { id: "dynamodb", name: "DynamoDB", tags: ["dynamodb", "aws", "nosql"] },
      { id: "iam", name: "IAM", tags: ["iam", "aws", "security"] },
    ],
  },
  {
    id: "data",
    label: "Data Engineering",
    items: [
      { id: "etl", name: "ETL pipelines", tags: ["etl", "data-engineering"] },
      { id: "parquet", name: "Parquet", tags: ["parquet", "data-engineering"] },
      { id: "data-modeling", name: "Data modeling", tags: ["data-modeling", "data-engineering", "sql"] },
      { id: "control-m", name: "BMC Control-M", tags: ["control-m", "scheduling", "orchestration"] },
      { id: "supabase", name: "Supabase", tags: ["supabase", "postgresql"] },
    ],
  },
  {
    id: "web",
    label: "Web & Backend",
    items: [
      { id: "spring-boot", name: "Spring Boot", tags: ["spring", "java", "backend"] },
      { id: "angular", name: "Angular", tags: ["angular", "frontend"] },
      { id: "nextjs", name: "Next.js / React", tags: ["nextjs", "react", "frontend"] },
      { id: "nodejs", name: "Node.js", tags: ["javascript", "backend"] },
      { id: "express", name: "Express", tags: ["javascript", "backend"] },
      { id: "postgresql", name: "PostgreSQL", tags: ["postgresql", "sql"] },
      { id: "rest", name: "REST APIs", tags: ["rest", "backend"] },
      { id: "jwt", name: "JWT", tags: ["security"] },
    ],
  },
  {
    id: "ml",
    label: "AI/ML",
    items: [
      { id: "pytorch", name: "PyTorch", tags: ["pytorch", "deep-learning", "ml"] },
      { id: "cnns", name: "CNNs", tags: ["computer-vision", "deep-learning"] },
      { id: "vits", name: "Vision Transformers", tags: ["transformers", "computer-vision", "deep-learning"] },
      { id: "timm", name: "timm", tags: ["pytorch", "computer-vision"] },
      { id: "numpy", name: "NumPy", tags: ["python", "ml"] },
      { id: "matplotlib", name: "Matplotlib", tags: ["python", "data-visualization"] },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    items: [
      { id: "git", name: "Git", tags: ["git"] },
      { id: "github-actions", name: "GitHub Actions", tags: ["ci-cd", "git"] },
      { id: "jenkins", name: "Jenkins", tags: ["jenkins", "ci-cd"] },
      { id: "docker", name: "Docker", tags: ["docker", "devops"] },
      { id: "linux", name: "Linux CLI", tags: ["linux"] },
      { id: "jira", name: "Jira", tags: ["jira", "agile"] },
      { id: "bmc-helix", name: "BMC Helix", tags: ["itsm", "production-support"] },
      { id: "swagger", name: "Swagger", tags: ["rest", "backend"] },
    ],
  },
];

export const EXPERIENCE: Role[] = [
  {
    id: "tcs",
    org: "Tata Consultancy Services",
    title: "Systems Engineer (Digital) – Data Engineer",
    period: "Jun 2026 – Present",
    location: "Bengaluru, India",
    category: "work",
    bullets: [
      {
        id: "tcs-pipelines",
        text: "Build and maintain serverless ETL pipelines on AWS (Step Functions, Lambda, S3) for a US insurance client, generating Parquet and other downstream data files.",
        tags: ["data-engineering", "etl", "aws", "step-functions", "lambda", "s3", "serverless", "parquet", "cloud"],
      },
      {
        id: "tcs-orchestration",
        text: "Orchestrate multi-step workflows with Step Functions triggered by EventBridge rules and S3 events; query and validate output data with Amazon Athena.",
        tags: ["step-functions", "eventbridge", "event-driven", "s3", "athena", "sql", "orchestration", "aws"],
      },
      {
        id: "tcs-dynamodb-iam",
        text: "Work with DynamoDB tables and IAM roles and policies across pipeline services, and with the client's insurance data models.",
        tags: ["dynamodb", "nosql", "iam", "security", "data-modeling", "aws"],
      },
      {
        id: "tcs-ops",
        text: "Schedule and monitor production batch jobs with BMC Control-M; deploy through Jenkins CI/CD; resolve incidents via BMC Helix and Jira.",
        tags: ["control-m", "scheduling", "jenkins", "ci-cd", "jira", "itsm", "production-support", "agile"],
      },
      {
        id: "tcs-ilp",
        text: "Completed TCS's Initial Learning Program in Java Full Stack (Spring Boot, Angular, SQL); built a role-based banking app as the capstone.",
        tags: ["java", "spring", "angular", "sql", "backend"],
        pinLast: true,
      },
    ],
  },
  {
    id: "drdo",
    org: "ADRDE, DRDO, Govt. of India",
    title: "Project Intern",
    period: "May 2024 – Jun 2024",
    location: "Agra, India",
    category: "work",
    bullets: [
      {
        id: "drdo-plotting",
        text: "Developed an intranet plotting application in React that parses six distinct file formats into 2D and 3D data visualizations (Plotly.js, Three.js, Cesium.js).",
        tags: ["react", "frontend", "javascript", "data-visualization"],
      },
      {
        id: "drdo-ux",
        text: "Improved usability with interactive, customizable visualization tools for defense applications.",
        tags: ["frontend", "data-visualization"],
      },
    ],
    link: { label: "Certificate", href: "https://drive.google.com/file/d/1DnLuerQ-N-id9Y5GgoMB3BZC9brV87U-/view?usp=sharing" },
  },
  {
    id: "enactus",
    org: "Enactus KIIT (Student Society)",
    title: "Technical Team Member",
    period: "Mar 2023 – Jan 2025",
    location: "Bhubaneswar, India",
    category: "volunteer",
    bullets: [
      {
        id: "enactus-apps",
        text: "Built web applications supporting social-entrepreneurship initiatives; part of the team that won the 2024 Early Stage Category at Enactus Nationals.",
        tags: ["frontend", "react", "teamwork"],
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "deepfake",
    title: "Hybrid Deepfake Detection",
    kind: "Research",
    year: "2025",
    description:
      "Pairs a Swin Transformer with ConvNeXt, DenseNet, MobileNet and CLIP backbones, plus an FFT frequency branch and attention fusion, to tell real faces from manipulated ones. The best hybrid (ConvNeXt-Swin) reached 93.47% test accuracy, and every hybrid beat its standalone backbone.",
    bullets: [
      {
        id: "deepfake-arch",
        text: "Researched hybrid architectures combining Swin Transformers with CNN and CLIP backbones, an FFT frequency branch and attention fusion to detect AI-generated and manipulated faces.",
        tags: ["deep-learning", "computer-vision", "transformers", "research", "pytorch"],
      },
      {
        id: "deepfake-results",
        text: "Achieved a peak test accuracy of 93.47% and an F1 score of 93.01% with a ConvNeXt-Swin hybrid, outperforming standalone architectures.",
        tags: ["deep-learning", "ml", "research"],
      },
    ],
    stack: ["PyTorch", "timm", "Vision Transformers", "CLIP"],
    tags: ["pytorch", "computer-vision", "deep-learning", "transformers", "ml", "research", "python"],
    links: [{ label: "GitHub", href: "https://github.com/ishaan-mishraa/hybrid-deepfake-detection" }],
  },
  {
    id: "cricmarket",
    title: "CricMarket",
    kind: "Product",
    year: "2026",
    description:
      "Tracks IPL auction prices (2024–26), team purses and player T20 stats. A Python scraper on GitHub Actions feeds Supabase, served through a Hono API on Cloudflare Workers and a Next.js app.",
    bullets: [
      {
        id: "cricmarket-platform",
        text: "Built a monorepo platform tracking IPL auction prices, team purses and player stats, with a Next.js front end and a Hono edge API on Cloudflare Workers.",
        tags: ["nextjs", "react", "typescript", "cloudflare", "serverless", "backend", "frontend"],
      },
      {
        id: "cricmarket-ingestion",
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
    id: "bank",
    title: "Bank Management System with Guardian Approval",
    kind: "Full-stack",
    year: "2026",
    description:
      "Role-based banking app for customers, guardians and admins, with JWT auth and guardian approval for high-value transfers. Built as the final project of TCS's Java full-stack training.",
    bullets: [
      {
        id: "bank-roles",
        text: "Developed a role-based full-stack banking application with JWT authentication and authorization for Customer, Guardian and Admin workflows.",
        tags: ["java", "spring", "angular", "security", "backend", "frontend", "rest"],
      },
      {
        id: "bank-transfers",
        text: "Implemented secure fund transfers with configurable approval thresholds, trusted contacts and guardian approval for high-value transactions, using transactional processing and pessimistic locking.",
        tags: ["java", "spring", "sql", "backend", "security"],
      },
    ],
    stack: ["Angular 18", "Spring Boot", "H2"],
    tags: ["java", "spring", "angular", "sql", "backend", "frontend", "security", "rest"],
    links: [],
  },
  {
    id: "leavewise",
    title: "Leavewise",
    kind: "Full-stack",
    year: "2026",
    description:
      "Leave management for small teams that warns when too many teammates would be off at once. Separate employee, manager and HR roles, enforced with Spring Security and JWT.",
    bullets: [
      {
        id: "leavewise-app",
        text: "Built a leave-management app that warns managers when too many teammates would be off at once.",
        tags: ["java", "spring", "angular", "backend", "frontend"],
      },
      {
        id: "leavewise-security",
        text: "Enforced employee, manager and HR roles with Spring Security and JWT; PostgreSQL storage, containerised with Docker.",
        tags: ["java", "spring", "security", "postgresql", "sql", "docker", "backend"],
      },
    ],
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    tags: ["java", "spring", "angular", "postgresql", "sql", "docker", "backend", "frontend", "security", "rest"],
    links: [{ label: "GitHub", href: "https://github.com/ishaan-mishraa/leavewise" }],
    resumeDefault: false,
  },
  {
    id: "btd",
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
    id: "btd-paper",
    title: "Conference Paper: Comparative Study of Emerging DL Models in Brain Tumor Detection",
    date: "Apr 2026",
    venue: "ICTIS 2026, Bangkok · Springer LNNS vol. 2137",
    citation:
      "A. Hasan, I. Mishra, J. Bose, J. V. C. Sai, J. Kumar, K. Akhter, R. K. Dash. “Comparative Study of Emerging DL Models in BTD.” ICT for Intelligent Systems (ICTIS 2026), LNNS vol. 2137, Springer, 2027.",
    href: undefined as string | undefined, // add the DOI link once the chapter is live
    code: "https://github.com/ishaan-mishraa/btd-comparative-study",
    tags: ["research", "deep-learning", "computer-vision", "healthcare"],
    bullets: [
      {
        id: "btd-presented",
        text: "Co-authored and presented research on binary classification of brain tumors from MRI scans at ICTIS 2026 in Bangkok, Thailand; published in Springer LNNS.",
        tags: ["research", "healthcare"],
      },
      {
        id: "btd-benchmark",
        text: "Benchmarked VGG19, ResNet50, DenseNet121, ConvNeXt-Tiny and EfficientNet-B0 with transfer learning; modern CNNs (ConvNeXt, EfficientNet) performed best.",
        tags: ["deep-learning", "computer-vision", "pytorch"],
      },
    ] as Bullet[],
  },
];

export const ACHIEVEMENTS = [
  { id: "gate", lead: "GATE CS 2026", text: "cleared with a 96+ percentile (also qualified in 2025)", tags: ["gate"] },
];
