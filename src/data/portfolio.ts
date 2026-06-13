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
}

export const siteConfig = {
  name: "Danyal Tanveer",
  title: "Danyal Tanveer | Full-Stack & ML Developer",
  description:
    "Computer Science student at UCP specializing in full-stack development, NLP research, and fake news detection. Building production systems with React, Next.js, Django, and PyTorch.",
  url: "https://portfolio-website-danyal.vercel.app",
  ogImage: "/images/profile.png",
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
  headline: "CS Student @ UCP | Full-Stack & ML Developer | NLP Research",
  subtext:
    "I build production-grade web systems and research AI models for misinformation detection — from POS ecosystems deployed in restaurants to BERT-family benchmarks on 100K+ news samples.",
  availability: "Open to internships & collaborations",
};

export const about = {
  bio: [
    "I'm a Computer Science student at the University of Central Punjab with a passion for building software that works in the real world and research that pushes the boundaries of NLP.",
    "My work spans full-stack development — Next.js POS systems used by restaurants in Lahore — and academic research on multimodal fake news detection, where I benchmark BERT-family transformers on large-scale datasets under Dr. Nauman Irshad.",
    "I thrive at the intersection of engineering and research: shipping clean APIs, polished UIs, and reproducible ML pipelines.",
  ],
  education: {
    degree: "BSc Computer Science",
    institution: "University of Central Punjab (UCP)",
    period: "Sep 2022 – Jul 2026",
    cgpa: "3.59 / 4.00",
    focus: "Multimodal fake news detection & BERT-family benchmarking",
  },
  highlights: [
    { label: "CGPA", value: "3.59" },
    { label: "Projects", value: "8+" },
    { label: "Internship", value: "Tri Tech" },
    { label: "Research", value: "100K+ samples" },
  ],
};

export const experience: Experience[] = [
  {
    id: "tri-tech",
    company: "Tri Tech Technology LLC",
    role: "Full-Stack Developer Intern",
    period: "Jul 2025 – Dec 2025",
    location: "Lahore, Pakistan",
    description: [
      "Built and deployed a complete POS ecosystem for CAP Cafe and Extraction restaurants — covering in-store operations, admin dashboards, and backend APIs.",
      "Developed the client frontend with Next.js 15 and React 19, integrated with Express + MongoDB backend featuring JWT auth, Swagger docs, and role-based access.",
      "Collaborated in an Agile workflow, delivering production features used daily by restaurant staff.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "JWT"],
  },
];

export const projects: Project[] = [
  {
    id: "trak",
    title: "TRAK — AI News Credibility Platform",
    description:
      "Mobile-first news intelligence app combining personalized topic tracking with backend AI credibility analysis. JWT auth, role-based navigation, and HuggingFace-powered misinformation scoring.",
    category: "Full Stack",
    tech: ["React Native", "Django", "DRF", "MongoDB", "HuggingFace", "JWT"],
    github: "https://github.com/Danyal-0276/TRAK.git",
    highlight: "Full-stack mobile + API",
  },
  {
    id: "pos",
    title: "POS Ecosystem",
    description:
      "Production point-of-sale system deployed for CAP Cafe and Extraction — three connected apps: in-store POS, admin panel, and centralized Express API with Swagger documentation.",
    category: "Full Stack",
    tech: ["Next.js 15", "React 19", "TypeScript", "Express", "MongoDB"],
    github: "https://github.com/Danyal-0276/POS-client.git",
    highlight: "Deployed in production",
  },
  {
    id: "bert",
    title: "BERT Fake News Benchmark",
    description:
      "Evaluation workflow for 10+ BERT-family models on a curated fake-news classification benchmark. Includes dataset splits, model comparison tables, and reproducible Jupyter notebooks.",
    category: "Machine Learning",
    tech: ["Python", "PyTorch", "HuggingFace", "pandas", "Jupyter"],
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
      "Browser-based scraper for Amazon, Daraz.pk, and eBay across configurable categories. Exports normalized product data to multi-sheet Excel workbooks — no API keys required.",
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
    tech: ["Java", "Android SDK", "Firebase", "Material Components"],
    github: "https://github.com/Danyal-0276/Doulingo-Clone.git",
    highlight: "Firebase + OAuth",
  },
  {
    id: "js-projects",
    title: "JavaScript Basic Projects",
    description:
      "Collection of 18 beginner-friendly web apps built with vanilla HTML, CSS, and JavaScript — covering DOM manipulation, browser APIs, local storage, and external API integration.",
    category: "Frontend",
    tech: ["HTML", "CSS", "JavaScript", "Browser APIs"],
    github: "https://github.com/Danyal-0276/Javascript-basic-projects.git",
    highlight: "18 standalone apps",
  },
  {
    id: "sentiment",
    title: "Sentiment Analysis & Disease Detection",
    description:
      "ML research projects including tweet sentiment classification with LightGBM (99.5% accuracy) and multi-class disease detection using SVM, Naive Bayes, and Random Forest.",
    category: "Machine Learning",
    tech: ["Python", "LightGBM", "scikit-learn", "SVM", "Random Forest"],
    github: "https://github.com/Danyal-0276",
    highlight: "99.5% classification accuracy",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "SQL", "HTML/CSS"],
  },
  {
    label: "Frontend",
    skills: ["React", "React Native", "Next.js", "Tailwind CSS", "Figma"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "Django", "DRF", "REST APIs", "JWT"],
  },
  {
    label: "ML / AI",
    skills: ["PyTorch", "HuggingFace", "BERT", "RoBERTa", "scikit-learn", "LightGBM", "PySpark"],
  },
  {
    label: "Databases",
    skills: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    label: "Tools",
    skills: ["Git", "Postman", "Jupyter", "Android Studio", "Agile/Scrum", "Swagger"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
