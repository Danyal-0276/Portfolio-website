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
  metrics?: { value: string; label: string }[];
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
  title: "Danyal Tanveer | Full-Stack Developer & AI/ML Engineer",
  description:
    "Computer Science graduate and full-stack developer building production web systems with React, Next.js, and Node.js, plus end-to-end ML and NLP pipelines with PyTorch and Hugging Face.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-website-git-main-danyal-tanveer-s-projects.vercel.app",
  ogImage: "/images/portrait-2026.png",
  logoPath: "/images/logo.png",
  faviconPath: "/images/favicon-512.png",
  faviconVersion: "5",
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
  roles: ["Full-Stack Developer", "AI & ML Engineer"],
  tagline: "Full Stack Developer, AI & ML Engineer",
  motto: "Navigating the unknown, line by line",
  headline: "Full-Stack Developer & AI/ML Engineer",
  subtext:
    "I'm a full-stack developer and AI/ML engineer shipping production systems.",
  availability: "Open to junior software & AI engineering roles",
  intro:
    "CS graduate who builds production web systems and end-to-end ML pipelines — from REST APIs and MongoDB schemas to transformer fine-tuning in PyTorch.",
  roleLineLeft: "FULL STACK",
  roleLineRight: "DEVELOPER",
  roleOutline: "Full Stack Developer",
  roleLineSecondary: "AI & ML ENGINEER",
  roleBadge: "FULL STACK DEVELOPER, LAHORE, PK",
  dragHint: "DRAG TO MOVE",
  portraitSrc: "/images/profile-hero.png",
};

export const statsBand = [
  { value: "9+", label: "Projects shipped" },
  { value: "3.60", label: "CGPA at UCP" },
  { value: "220K+", label: "Labeled ML samples" },
  { value: "2", label: "Restaurants deployed" },
];

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
    issuer: "Google, Coursera",
    date: "Apr 2026",
    description:
      "Google AI Fundamentals via Coursera (rated 4.8/5, 981,700+ learners). Covers core AI concepts, machine learning workflows, and practical applications for modern software development.",
    image: "/certifications/google-ai-fundamentals.png",
    verifyUrl: "https://coursera.org/verify/7C403PQ3QE0D",
  },
  {
    id: "huggingface-agents",
    title: "Fundamentals of Agents: Unit 1",
    issuer: "Hugging Face",
    date: "May 2026",
    description:
      "Foundations of Agents in the Hugging Face AI Agents Course — building and understanding AI agent architectures.",
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
    "I'm a Computer Science graduate from the University of Central Punjab (CGPA 3.60/4.00) with hands-on experience in full-stack engineering, back-end development, and applied machine learning. I care about software that ships to real users and models built on solid engineering fundamentals.",
    "On the engineering side, I design and maintain scalable applications with React, Next.js, Node.js/Express, and Django — including REST APIs, JWT authentication, database schema design, debugging, and production deployments. During my internship at Tri Tech, I delivered a complete POS platform now used daily by CAP Cafe and Extraction in Lahore.",
    "On the AI/ML side, I work across the full ML lifecycle: data preprocessing, transformer fine-tuning (RoBERTa, BERT, DeBERTa, DistilBERT) in PyTorch and Hugging Face, evaluation, and integration into live backend systems — including TRAK, my capstone news credibility platform.",
    "I'm most at home where product work and model work meet: clean APIs, thoughtful UIs, and reproducible ML pipelines I can iterate on with confidence.",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Central Punjab (UCP)",
    period: "Sep 2022 to Jul 2026",
    cgpa: "3.60 / 4.00",
    focus: "Full-stack software engineering, machine learning, and NLP",
    coursework: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Database Systems",
      "Software Engineering",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
      "NLP",
    ],
  },
  highlights: [
    { label: "CGPA", value: "3.60" },
    { label: "Projects", value: "9+" },
    { label: "Internship", value: "Tri Tech" },
    { label: "ML data", value: "220K+ samples" },
  ],
};

export const experience: Experience[] = [
  {
    id: "tri-tech",
    company: "Tri Tech Technology LLC",
    role: "Full-Stack Developer Intern",
    period: "Jul 2025 to Dec 2025",
    location: "Lahore, Pakistan (On-site)",
    description: [
      "Applied OOP and modular design to architect a scalable POS ecosystem with two connected frontends (POS + Admin Panel) using Next.js, React, and TypeScript.",
      "Designed and implemented a Node.js/Express backend with MongoDB, writing optimized NoSQL queries for order management, analytics, and client data.",
      "Built RESTful APIs with JWT authentication, middleware architecture, and structured error handling following Agile development practices.",
      "Debugged, tested, and deployed the system for two live restaurant clients (CAP Cafe and Extraction), ensuring quality, performance, and reliability.",
      "Used Git and GitHub for version control, participated in code reviews, and contributed to continuous process improvements.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
  },
];

export const projects: Project[] = [
  {
    id: "trak",
    title: "TRAK: AI News Credibility Platform",
    description:
      "Capstone full-stack mobile app for news credibility. Fine-tuned RoBERTa and DeBERTa on 220K+ labeled samples for three-class classification (real, fake, suspicious), with an automated pipeline covering scraping, NLP preprocessing, inference via Django/DRF, JWT auth, summarization, and text-to-speech.",
    category: "Full Stack",
    tech: [
      "React Native",
      "Django",
      "DRF",
      "MongoDB",
      "Python",
      "PyTorch",
      "HuggingFace",
      "JWT",
    ],
    github: "https://github.com/Danyal-0276/TRAK.git",
    highlight: "220K+ samples, RoBERTa/DeBERTa",
    metrics: [
      { value: "220K+", label: "Labeled samples" },
      { value: "3", label: "Credibility classes" },
    ],
  },
  {
    id: "pos",
    title: "POS Ecosystem",
    description:
      "Industry project at Tri Tech: complete POS and Admin Panel system deployed across two live restaurant clients. Scalable MongoDB schema and REST APIs for order management, menu/recipe handling, and analytics, with Agile debugging and code-review cycles before each rollout.",
    category: "Full Stack",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    github: "https://github.com/Danyal-0276/POS-client.git",
    highlight: "Deployed for 2 restaurants",
    metrics: [
      { value: "2", label: "Live restaurants" },
      { value: "2", label: "Connected apps" },
    ],
  },
  {
    id: "duolingo",
    title: "Language Learning App",
    description:
      "Gamified Android language-learning app built with Java OOP class hierarchies, ViewBinding, and RecyclerView. Integrated Firebase Authentication, Realtime Database, Storage, and Analytics with Google and Facebook social login.",
    category: "Mobile",
    tech: ["Java", "Android SDK", "Firebase", "ViewBinding", "RecyclerView", "OOP"],
    github: "https://github.com/Danyal-0276/Doulingo-Clone.git",
    highlight: "Firebase + social login",
  },
  {
    id: "jarvis",
    title: "J.A.R.V.I.S, Personal AI Assistant",
    description:
      "Iron Man-inspired voice and chat assistant with a cinematic UI: 3D particle sphere, SiriWave visualizer, Google Gemini brain, voice commands, secure document search, and Gmail integration. Runs locally on localhost.",
    category: "Full Stack",
    tech: ["Python", "Eel", "Gemini", "JavaScript", "Bootstrap", "Canvas"],
    github: "https://github.com/Danyal-0276/Jarvis.git",
    highlight: "Voice + AI desktop assistant",
  },
  {
    id: "bert",
    title: "Fake News Detection: BERT-Family Benchmark",
    description:
      "Research project (co-lead) benchmarking BERT, RoBERTa, DistilBERT, XLNet, and ALBERT on a standardized 10K fake-news dataset. Reproducible train/val/test splits with MCC, AUC-ROC, and confusion-matrix reports; preprocessing optimized for 100K+ samples.",
    category: "Machine Learning",
    tech: ["Python", "PyTorch", "HuggingFace", "Scikit-learn", "pandas", "NumPy"],
    github: "https://github.com/Danyal-0276/Bert-Based-models-evaluation.git",
    highlight: "5 transformers, MCC & AUC-ROC",
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

export const featuredProject = projects.find((p) => p.id === "pos")!;

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    accent: "#2dd4bf",
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
    accent: "#22d3ee",
    span: "col-span-2 lg:col-span-2",
    skills: ["React", "React Native", "Next.js", "Tailwind CSS", "Bootstrap", "Figma"],
  },
  {
    label: "Backend",
    accent: "#14b8a6",
    span: "col-span-2 lg:col-span-2",
    skills: ["Node.js", "Express", "Django", "DRF", "REST APIs", "JWT", "Eel", "Resend"],
  },
  {
    label: "CS Fundamentals",
    accent: "#64748b",
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
    accent: "#5eead4",
    span: "col-span-2 lg:col-span-6",
    skills: [
      "PyTorch",
      "HuggingFace Transformers",
      "TensorFlow",
      "BERT",
      "RoBERTa",
      "DeBERTa",
      "DistilBERT",
      "XLNet",
      "ALBERT",
      "AI Agents",
      "NLP pipelines",
      "Gemini",
      "scikit-learn",
      "LightGBM",
      "PySpark",
      "NumPy",
      "pandas",
      "Matplotlib",
      "OpenCV",
    ],
  },
  {
    label: "Databases",
    accent: "#0ea5e9",
    span: "col-span-2 lg:col-span-2",
    skills: ["MongoDB", "MySQL", "Firebase", "SQL", "NoSQL"],
  },
  {
    label: "DevOps & Cloud",
    accent: "#34d399",
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
    accent: "#67e8f9",
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
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Collage", href: "#collage" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
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
    subtitle: "Web, API, Production",
    description:
      "End-to-end systems from React/Next.js frontends to Express and Django APIs, deployed as POS platforms used daily in restaurants.",
    services: [
      "Next.js & React SPAs",
      "REST APIs & JWT auth",
      "MongoDB data modeling",
      "Swagger docs & Agile delivery",
    ],
    accent: "#2dd4bf",
  },
  {
    id: "ml",
    title: "ML & NLP Engineering",
    subtitle: "Transformers, Pipelines",
    description:
      "End-to-end NLP pipelines: fine-tuning RoBERTa and DeBERTa on 220K+ samples, BERT-family benchmarks with MCC/AUC-ROC reports, and REST API inference for live predictions.",
    services: [
      "Transformer fine-tuning",
      "NLP preprocessing pipelines",
      "Model evaluation & selection",
      "API-integrated inference",
    ],
    accent: "#5eead4",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    subtitle: "iOS, Android, Cross-platform",
    description:
      "Native Android apps and React Native clients with Firebase auth, personalized feeds, and polished mobile UX patterns.",
    services: [
      "React Native apps",
      "Android (Java/Kotlin)",
      "Firebase & OAuth flows",
      "Offline-first patterns",
    ],
    accent: "#22d3ee",
  },
  {
    id: "data",
    title: "Data Engineering",
    subtitle: "Spark, Scraping, Pipelines",
    description:
      "Distributed ML on PySpark, browser automation scrapers, and export pipelines that turn raw data into actionable insights.",
    services: [
      "PySpark MLlib pipelines",
      "Playwright web scrapers",
      "Excel/CSV export workflows",
      "Ensemble model evaluation",
    ],
    accent: "#14b8a6",
  },
];

export const projectAccents: Record<string, string> = {
  trak: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  jarvis: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #a855f7 100%)",
  pos: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  bert: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  nids: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  scraper: "linear-gradient(135deg, #fa709a 0%, #ff8533 100%)",
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

export function getProjectSnapshotFit(projectId?: string): "cover" | "contain" {
  void projectId;
  return "contain";
}

export function getProjectThumbnail(projectId: string): string | undefined {
  return projectSnapshots[projectId]?.[0];
}
