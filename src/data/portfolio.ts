export type ProjectCategory =
  | "Full Stack"
  | "Mobile"
  | "Machine Learning"
  | "Data Engineering"
  | "Frontend";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  github: string;
  highlight?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
  accent: string;
  /** Tailwind col-span classes for the bento grid (mobile + lg) */
  span: string;
}

export const siteConfig = {
  name: "Danyal Tanveer",
  title: "Danyal Tanveer | Full-Stack Web Developer & AI/ML Researcher",
  description:
    "Computer Science student at UCP specializing in full-stack development, NLP research, and fake news detection. Building production systems with React, Next.js, Django, and PyTorch.",
  url: "https://portfolio-website-danyal.vercel.app",
  ogImage: "/images/profile-hero.png",
  logoPath: "/images/logo.png",
  faviconPath: "/images/favicon-512.png",
  email: "donibutt2112@gmail.com",
  phone: "+92 370 7076164",
  location: "Lahore, Punjab, Pakistan",
  github: "https://github.com/Danyal-0276",
  linkedin: "https://linkedin.com/in/danyal-tanveer-30b887320",
  resumePath: "/resume.pdf",
};

export const hero = {
  greeting: "Hello, I'm",
  name: "Danyal Tanveer",
  roles: ["Full-Stack Web Developer", "AI & ML Researcher"],
  tagline: "Full-Stack Web Developer · AI & ML Researcher",
  headline: "Full-Stack Web Developer & AI/ML Researcher",
  subtext:
    "I build production-grade web systems and research AI models for misinformation detection, from POS ecosystems deployed in restaurants to BERT-family benchmarks on 100K+ news samples.",
  availability: "Open to fresher roles, internships & collaborations",
  intro:
    "Hey there! I'm a Full-Stack Web Developer and AI/ML Researcher building production apps and research pipelines.",
  roleLineLeft: "FULL-STACK",
  roleLineRight: "DEVELOPER",
  roleOutline: "Full-Stack Developer",
  roleLineSecondary: "AI & ML RESEARCHER",
};

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: "google-ai-fundamentals",
    title: "AI Fundamentals",
    issuer: "Google · Coursera",
    date: "Apr 2026",
    description:
      "Google Career Certificate covering core AI concepts, machine learning workflows, and practical applications for modern software development.",
    image: "/certifications/google-ai-fundamentals.png",
    verifyUrl: "https://coursera.org/verify/7C403PQ3QE0D",
  },
  {
    id: "huggingface-agents",
    title: "Fundamentals of Agents",
    issuer: "Hugging Face",
    date: "May 2026",
    description:
      "Unit 1: Foundations of Agents in the Hugging Face Agents Course — building and understanding AI agent architectures.",
    image: "/certifications/huggingface-agents.png",
  },
];

export const techMarquee = [
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "C",
  "C++",
  "PyTorch",
  "MongoDB",
  "MySQL",
  "Django",
  "Docker",
  "GitHub",
  "CI/CD",
  "Vercel",
  "Netlify",
  "Render",
  "Contabo",
  "HuggingFace",
  "Playwright",
  "PySpark",
  "Tailwind CSS",
  "Express",
  "scikit-learn",
  "Gemini",
  "Firebase",
  "VS Code",
  "Cursor",
  "Jupyter",
  "Google Colab",
  "Kaggle",
  "Android Studio",
  "Postman",
  "NumPy",
  "pandas",
  "Matplotlib",
  "LightGBM",
  "RoBERTa",
  "Linux",
  "Assembly",
  "GSAP",
  "Resend",
  "openpyxl",
  "Git",
];

export const about = {
  bio: [
    "I'm a Computer Science student at the University of Central Punjab with a passion for building software that works in the real world and research that pushes the boundaries of NLP.",
    "My work spans full-stack development (Next.js POS systems used by restaurants in Lahore) and academic research on multimodal fake news detection, where I benchmark BERT-family transformers on large-scale datasets with my fellow UCP student Nauman Irshad.",
    "I thrive at the intersection of engineering and research: shipping clean APIs, polished UIs, and reproducible ML pipelines.",
  ],
  education: {
    degree: "BSc Computer Science",
    institution: "University of Central Punjab (UCP)",
    period: "Sep 2022 to Jul 2026",
    cgpa: "3.59 / 4.00",
    focus: "Multimodal fake news detection & BERT-family benchmarking",
    coursework: [
      "OOP",
      "Data Structures & Algorithms",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
      "NLP",
      "Software Engineering",
      "Discrete Mathematics",
      "Programming Fundamentals",
    ],
  },
  highlights: [
    { label: "CGPA", value: "3.59" },
    { label: "Projects", value: "9+" },
    { label: "Internship", value: "Tri Tech" },
    { label: "Research", value: "100K+ samples" },
  ],
};

export const experience: Experience[] = [
  {
    id: "tri-tech",
    company: "Tri Tech Technology LLC",
    role: "Full-Stack Developer Intern",
    period: "Jul 2025 to Dec 2025",
    location: "Lahore, Pakistan",
    description: [
      "Built and deployed a complete POS ecosystem for CAP Cafe and Extraction restaurants, covering in-store operations, admin dashboards, and backend APIs.",
      "Developed the client frontend with Next.js 15 and React 19, integrated with Express + MongoDB backend featuring JWT auth, Swagger docs, and role-based access.",
      "Collaborated in an Agile workflow, delivering production features used daily by restaurant staff.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "JWT", "Vercel"],
  },
];

export const projects: Project[] = [
  {
    id: "trak",
    title: "TRAK: AI News Credibility Platform",
    description:
      "Mobile-first news intelligence app combining personalized topic tracking with backend AI credibility analysis. Django API deployed on Contabo VPS; JWT auth, role-based navigation, and HuggingFace-powered misinformation scoring.",
    category: "Full Stack",
    tech: ["React Native", "Django", "DRF", "MongoDB", "HuggingFace", "JWT", "Contabo"],
    github: "https://github.com/Danyal-0276/TRAK.git",
    highlight: "Full-stack mobile + API",
  },
  {
    id: "jarvis",
    title: "J.A.R.V.I.S — Personal AI Assistant",
    description:
      "Iron Man-inspired voice and chat assistant with a cinematic UI: 3D particle sphere, SiriWave visualizer, Google Gemini brain, voice commands, secure document search, and Gmail integration. Runs locally on localhost.",
    category: "Full Stack",
    tech: ["Python", "Eel", "Gemini", "JavaScript", "Bootstrap", "Canvas"],
    github: "https://github.com/Danyal-0276/Jarvis.git",
    highlight: "Voice + AI desktop assistant",
  },
  {
    id: "pos",
    title: "POS Ecosystem",
    description:
      "Production point-of-sale system deployed for CAP Cafe and Extraction. Three connected apps: in-store POS, admin panel, and centralized Express API with Swagger documentation. Deployed on Vercel and Render.",
    category: "Full Stack",
    tech: ["Next.js 15", "React 19", "TypeScript", "Express", "MongoDB", "Vercel", "Render"],
    github: "https://github.com/Danyal-0276/POS-client.git",
    highlight: "Deployed in production",
  },
  {
    id: "bert",
    title: "BERT Fake News Benchmark",
    description:
      "Evaluation workflow for 10+ BERT-family models on a curated fake-news classification benchmark. Includes dataset splits, model comparison tables, and reproducible Jupyter notebooks.",
    category: "Machine Learning",
    tech: ["Python", "PyTorch", "HuggingFace", "pandas", "NumPy", "Jupyter"],
    github: "https://github.com/Danyal-0276/Bert-Based-models-evaluation.git",
    highlight: "10+ transformer models",
  },
  {
    id: "nids",
    title: "Network Intrusion Detection System",
    description:
      "Distributed ML pipeline on CIC-IDS2017 using PySpark MLlib. Trains 4 classifiers with hard/soft ensemble voting and exports publication-ready LaTeX tables and charts.",
    category: "Data Engineering",
    tech: ["PySpark", "Java 11", "scikit-learn", "CIC-IDS2017"],
    github: "https://github.com/Danyal-0276/PDC-Project-Intrusion-Detection-System-.git",
    highlight: "Parallel & distributed computing",
  },
  {
    id: "scraper",
    title: "Multi-Marketplace Product Scraper",
    description:
      "Browser-based scraper for Amazon, Daraz.pk, and eBay across configurable categories. Exports normalized product data to multi-sheet Excel workbooks, no API keys required.",
    category: "Data Engineering",
    tech: ["Python", "Playwright", "pandas", "openpyxl"],
    github: "https://github.com/Danyal-0276/Ecommerce-website-scappers.git",
    highlight: "3 marketplaces, CLI runner",
  },
  {
    id: "duolingo",
    title: "Duolingo Clone (MAD)",
    description:
      "Android language-learning app with onboarding, Firebase auth (Google/Facebook), multi-step lesson selection, and bottom-navigation dashboard with five fragment screens.",
    category: "Mobile",
    tech: ["Java", "Android SDK", "Firebase", "Material Components", "ViewBinding", "RecyclerView"],
    github: "https://github.com/Danyal-0276/Doulingo-Clone.git",
    highlight: "Firebase + OAuth",
  },
  {
    id: "js-projects",
    title: "JavaScript Basic Projects",
    description:
      "Collection of 18 beginner-friendly web apps built with vanilla HTML, CSS, and JavaScript, covering DOM manipulation, browser APIs, local storage, and external API integration.",
    category: "Frontend",
    tech: ["HTML", "CSS", "JavaScript", "Browser APIs"],
    github: "https://github.com/Danyal-0276/Javascript-basic-projects.git",
    highlight: "18 standalone apps",
  },
  {
    id: "sentiment",
    title: "Disease Detection Models",
    description:
      "Multi-class disease classification using SVM, Naive Bayes, Random Forest, and a combined ensemble. Evaluated on 41 disease categories with confusion matrix analysis and balanced dataset distribution.",
    category: "Machine Learning",
    tech: ["Python", "scikit-learn", "SVM", "Random Forest", "Naive Bayes"],
    github: "https://github.com/Danyal-0276",
    highlight: "41-class classification",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    accent: "#edb33c",
    span: "col-span-2 lg:col-span-2",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "C",
      "C++",
      "SQL",
      "HTML/CSS",
      "XML",
      "Assembly",
    ],
  },
  {
    label: "Frontend",
    accent: "#5b9bd5",
    span: "col-span-2 lg:col-span-2",
    skills: ["React", "React Native", "Next.js", "Tailwind CSS", "Bootstrap", "Figma"],
  },
  {
    label: "Backend",
    accent: "#6bc4a6",
    span: "col-span-2 lg:col-span-2",
    skills: ["Node.js", "Express", "Django", "DRF", "REST APIs", "JWT", "Eel", "Resend"],
  },
  {
    label: "CS Fundamentals",
    accent: "#c4b5fd",
    span: "col-span-2 lg:col-span-2",
    skills: [
      "OOP",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Database Systems",
      "Software Engineering",
    ],
  },
  {
    label: "ML / AI",
    accent: "#9b7ed9",
    span: "col-span-2 lg:col-span-6",
    skills: [
      "PyTorch",
      "HuggingFace",
      "BERT",
      "RoBERTa",
      "DeBERTa",
      "DistilBERT",
      "XLNet",
      "ALBERT",
      "Gemini",
      "scikit-learn",
      "LightGBM",
      "PySpark",
      "NumPy",
      "pandas",
      "Matplotlib",
      "OpenCV",
      "NLP",
    ],
  },
  {
    label: "Databases",
    accent: "#f093fb",
    span: "col-span-2 lg:col-span-2",
    skills: ["MongoDB", "MySQL", "Firebase", "SQL", "NoSQL"],
  },
  {
    label: "DevOps & Cloud",
    accent: "#43e97b",
    span: "col-span-2 lg:col-span-2",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Vercel",
      "Netlify",
      "Render",
      "Contabo",
      "Linux",
    ],
  },
  {
    label: "Tools & IDEs",
    accent: "#fa709a",
    span: "col-span-2 lg:col-span-6",
    skills: [
      "VS Code",
      "Cursor",
      "Android Studio",
      "Jupyter",
      "Google Colab",
      "Kaggle",
      "Postman",
      "Swagger",
      "Playwright",
      "openpyxl",
      "GSAP",
      "Agile/Scrum",
    ],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Collage", href: "#collage" },
  { label: "Contact", href: "#contact" },
];

export interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  accent: string;
}

export const focusAreas: FocusArea[] = [
  {
    id: "fullstack",
    title: "Full-Stack Development",
    subtitle: "Web · API · Production",
    description:
      "End-to-end systems from React/Next.js frontends to Express and Django APIs, deployed as POS platforms used daily in restaurants.",
    services: [
      "Next.js & React SPAs",
      "REST APIs & JWT auth",
      "MongoDB data modeling",
      "Swagger docs & Agile delivery",
    ],
    accent: "#edb33c",
  },
  {
    id: "ml",
    title: "ML & NLP Research",
    subtitle: "Transformers · Benchmarks",
    description:
      "Fake news detection research benchmarking BERT-family models on 100K+ samples, with reproducible pipelines built in PyTorch and HuggingFace.",
    services: [
      "BERT / RoBERTa fine-tuning",
      "Dataset curation & EDA",
      "Model comparison workflows",
      "Jupyter & experiment tracking",
    ],
    accent: "#9b7ed9",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    subtitle: "iOS · Android · Cross-platform",
    description:
      "Native Android apps and React Native clients with Firebase auth, personalized feeds, and polished mobile UX patterns.",
    services: [
      "React Native apps",
      "Android (Java/Kotlin)",
      "Firebase & OAuth flows",
      "Offline-first patterns",
    ],
    accent: "#5b9bd5",
  },
  {
    id: "data",
    title: "Data Engineering",
    subtitle: "Spark · Scraping · Pipelines",
    description:
      "Distributed ML on PySpark, browser automation scrapers, and export pipelines that turn raw data into actionable insights.",
    services: [
      "PySpark MLlib pipelines",
      "Playwright web scrapers",
      "Excel/CSV export workflows",
      "Ensemble model evaluation",
    ],
    accent: "#6bc4a6",
  },
];

export const projectAccents: Record<string, string> = {
  trak: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  jarvis: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #a855f7 100%)",
  pos: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  bert: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  nids: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  scraper: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  duolingo: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "js-projects": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  sentiment: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
};

/** Public paths to project screenshots */
export const projectSnapshots: Record<string, string[]> = {
  trak: ["/projects/trak-1.png", "/projects/trak-2.png", "/projects/trak-3.png"],
  jarvis: ["/projects/jarvis-1.png"],
  pos: ["/projects/pos-1.jpeg", "/projects/pos-2.jpeg", "/projects/pos-3.jpeg"],
  bert: ["/projects/bert-1.png", "/projects/bert-2.png"],
  nids: ["/projects/nids-1.png", "/projects/nids-2.png"],
  scraper: ["/projects/scraper-1.png"],
  duolingo: ["/projects/duolingo-1.png", "/projects/duolingo-2.png"],
  "js-projects": ["/projects/js-projects-1.png"],
  sentiment: [
    "/projects/disease-distribution.png",
    "/projects/disease-combined.png",
    "/projects/disease-random-forest.png",
    "/projects/disease-svm.png",
    "/projects/disease-naive-bayes.png",
  ],
};

const MOBILE_SNAPSHOT_PROJECTS = new Set(["duolingo"]);
const CHART_SNAPSHOT_PROJECTS = new Set(["bert", "nids", "sentiment", "scraper"]);
const DARK_UI_SNAPSHOT_PROJECTS = new Set(["jarvis"]);

export function isMobileSnapshotProject(projectId: string) {
  return MOBILE_SNAPSHOT_PROJECTS.has(projectId);
}

export function isChartSnapshotProject(projectId: string) {
  return CHART_SNAPSHOT_PROJECTS.has(projectId);
}

export function isDarkUiSnapshotProject(projectId: string) {
  return DARK_UI_SNAPSHOT_PROJECTS.has(projectId);
}

export function getProjectSnapshotFit(projectId: string): "cover" | "contain" {
  if (CHART_SNAPSHOT_PROJECTS.has(projectId)) return "contain";
  if (DARK_UI_SNAPSHOT_PROJECTS.has(projectId)) return "contain";
  return "cover";
}

export function getProjectThumbnail(projectId: string): string | undefined {
  return projectSnapshots[projectId]?.[0];
}
