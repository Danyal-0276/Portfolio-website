export type WorkCategory = "Full stack" | "AI & ML" | "Mobile";

export interface Work {
  id: string;
  name: string;
  eyebrow: string;
  category: WorkCategory;
  year: string;
  description: string;
  image: string;
  imageType: "Screenshot" | "Generated UI mockup";
  color: string;
  stack: string[];
  outcome: string;
  details: string[];
  github: string;
  live?: string;
}

export const selectedWork: Work[] = [
  {
    id: "trak", name: "TRAK", eyebrow: "A little more truth in your feed.", category: "AI & ML", year: "2026",
    description: "A news credibility platform connecting transformer models with a personalized mobile experience.",
    image: "/projects/trak-2.png", imageType: "Screenshot", color: "#d9e0ed",
    stack: ["React Native", "Django / DRF", "PyTorch", "MongoDB"],
    outcome: "220K+ labeled samples · 3 credibility classes",
    details: ["Fine-tuned RoBERTa and DeBERTa for real, fake, and suspicious news classification.", "Built a pipeline from news scraping and NLP preprocessing to inference and personalized feeds.", "Integrated JWT authentication, role-based access, summarization, and text-to-speech."],
    github: "https://github.com/Danyal-0276/TRAK", live: "https://trak-fyp.netlify.app/",
  },
  {
    id: "feastly", name: "Feastly", eyebrow: "From the kitchen to your doorstep.", category: "Full stack", year: "2026",
    description: "Four connected portals. One food delivery experience, from discovery to the rider’s last mile.",
    image: "/projects/feastly-ui.png", imageType: "Generated UI mockup", color: "#eed6c3",
    stack: ["Next.js", "Django / DRF", "MongoDB", "Stripe", "Leaflet"],
    outcome: "4 user roles · Live rider tracking",
    details: ["Built customer, restaurant, rider, and platform admin experiences on a shared API.", "Designed actor-gated order transitions, JWT access/refresh authentication, and restaurant discovery by location.", "Integrated Stripe test checkout, cash-on-delivery, webhooks, and GPS updates on Leaflet maps."],
    github: "https://github.com/Danyal-0276/feastly",
  },
  {
    id: "archive", name: "Throne of Glass Archive", eyebrow: "A conversation with a whole world.", category: "AI & ML", year: "2026",
    description: "A fantasy archive with a from-scratch RAG chatbot, streaming answers, and spoiler-aware retrieval.",
    image: "/projects/archive-ui.png", imageType: "Generated UI mockup", color: "#263e34",
    stack: ["FastAPI", "pgvector", "BGE embeddings", "Groq", "Next.js"],
    outcome: "Dense RAG · Source-grounded responses",
    details: ["Implemented sentence-aware PDF chunking, BGE embeddings, and PostgreSQL / pgvector similarity search.", "Built SSE streaming with FastAPI and Groq, with source cards in a Next.js interface.", "Added book-based spoiler filtering and character alias expansion. Unofficial educational fan project."],
    github: "https://github.com/Danyal-0276/throne-of-glass-rag",
  },
  {
    id: "pos", name: "Restaurant OS", eyebrow: "Built for the real dinner rush.", category: "Full stack", year: "2025",
    description: "A multi-tenant POS ecosystem built during my internship and deployed for two restaurant clients.",
    image: "/projects/pos-1.jpeg", imageType: "Screenshot", color: "#d9dccb",
    stack: ["Next.js", "Node.js / Express", "MongoDB", "Redis"],
    outcome: "4 services · 2 live restaurant clients",
    details: ["Connected Platform Admin, Restaurant Console, and Cashier Terminal to one shared Express API.", "Implemented tenant-scoped data, JWT and PIN authentication, and middleware for five staff roles.", "Delivered orders, tables, inventory, menu management, and analytics for CAP Cafe and Extraction, with PM2 deployments."],
    github: "https://github.com/Danyal-0276/POS-backend",
  },
  {
    id: "shopora", name: "Shopora", eyebrow: "The entire journey to checkout.", category: "Full stack", year: "2026",
    description: "A complete commerce storefront with persistent carts, authenticated orders, and webhook-confirmed checkout.",
    image: "/projects/shopora-ui.png", imageType: "Generated UI mockup", color: "#d3ddeb",
    stack: ["Next.js", "TypeScript", "Django / DRF", "Stripe"],
    outcome: "End-to-end commerce · Stripe test mode",
    details: ["Built category discovery, search, product pages, persistent cart, and order history.", "Implemented JWT authentication and a MongoDB-backed Django REST API.", "Integrated Stripe Checkout in test mode with webhook-confirmed order fulfillment."],
    github: "https://github.com/Danyal-0276/shopora",
  },
  {
    id: "orbit", name: "Orbit", eyebrow: "Your library. Your little universe.", category: "Mobile", year: "2026",
    description: "An offline-first Android music player with a local library, background audio, and a personal feel.",
    image: "/projects/orbit-ui.png", imageType: "Generated UI mockup", color: "#242724",
    stack: ["React Native", "Expo", "SQLite", "Zustand"],
    outcome: "Offline-first · Background playback",
    details: ["Scans on-device audio and caches metadata locally in SQLite.", "Supports notification and lock-screen playback controls, playlists, favorites, and library search.", "Built light, dark, and system themes with configurable accents. Requires an Android development build."],
    github: "https://github.com/Danyal-0276/Music-Player-app",
  },
];

export const experiments = [
  { name: "Multiplayer browser games", type: "Real-time / 2026", description: "Socket.io rooms, server-authoritative state, and a minimax opponent.", github: "https://github.com/Danyal-0276/tic-tac-toe", image: "/projects/games-ui.png", generated: true },
  { name: "J.A.R.V.I.S.", type: "AI assistant", description: "Voice, chat, document search, and a Gemini-powered assistant.", github: "https://github.com/Danyal-0276/Jarvis", image: "/projects/jarvis-1.png", generated: false },
  { name: "Network intrusion detection", type: "Distributed ML", description: "PySpark classifiers and ensemble voting on CIC-IDS2017.", github: "https://github.com/Danyal-0276/PDC-Project-Intrusion-Detection-System-", image: "/projects/nids-1.png", generated: false },
  { name: "Marketplace data scraper", type: "Data engineering", description: "Browser automation and normalized exports across three marketplaces.", github: "https://github.com/Danyal-0276/Ecommerce-website-scappers", image: "/projects/scraper-1.png", generated: false },
  { name: "Language learning app", type: "Native Android", description: "Gamified learning with Java, Firebase, and social sign-in.", github: "https://github.com/Danyal-0276/Doulingo-Clone", image: "/projects/duolingo-1.png", generated: false },
];

export const capabilities = [
  {
    id: "fullstack", label: "Full-stack", number: "01", title: "From the first click to the database.",
    description: "I connect thoughtful interfaces to the systems behind them: APIs, authentication, data models, and the details that make a product work.",
    stages: [{ name: "Interface", tools: "React · Next.js · TypeScript", detail: "Responsive views, reusable components, and clear interaction states." }, { name: "API", tools: "Django · FastAPI · Express", detail: "REST contracts, validation, JWT authentication, and role-based access." }, { name: "Data", tools: "PostgreSQL · MongoDB · Redis", detail: "Relational schemas, tenant isolation, aggregation, and caching." }, { name: "Delivery", tools: "Git · PM2 · CI/CD", detail: "Version control, API documentation, debugging, and production rollouts." }],
    project: "In practice: Restaurant OS & Feastly", href: "#work",
  },
  {
    id: "ai", label: "AI & machine learning", number: "02", title: "Models are only the beginning.",
    description: "I build the path around a model: preparing data, measuring what matters, retrieving useful context, and delivering predictions through a real product.",
    stages: [{ name: "Prepare", tools: "Python · Pandas · NumPy", detail: "Data cleaning, reproducible splits, and NLP preprocessing." }, { name: "Train", tools: "PyTorch · Hugging Face", detail: "Transformer fine-tuning with RoBERTa, DeBERTa, BERT, and ELECTRA." }, { name: "Retrieve", tools: "BGE · pgvector · RAG", detail: "Chunking, embeddings, dense similarity search, and source-aware retrieval." }, { name: "Evaluate", tools: "scikit-learn · Gradio", detail: "Accuracy, F1, MCC, AUC, ablations, and interactive inference." }],
    project: "In practice: TRAK & Throne of Glass Archive", href: "#work",
  },
  {
    id: "mobile", label: "Mobile & real-time", number: "03", title: "Built to move with people.",
    description: "From offline music to live multiplayer rooms, I enjoy the engineering behind experiences that stay responsive and keep their state in sync.",
    stages: [{ name: "Build", tools: "React Native · Expo · Java", detail: "Cross-platform interfaces and native Android applications." }, { name: "Persist", tools: "SQLite · Firebase · Zustand", detail: "Local libraries, cached metadata, persistent state, and cloud-backed data." }, { name: "Connect", tools: "Socket.io · REST · JWT", detail: "Shared rooms, server-authoritative game state, and authenticated APIs." }, { name: "Refine", tools: "Reanimated · Android SDK", detail: "Background playback, native controls, and responsive mobile interactions." }],
    project: "In practice: Orbit & multiplayer games", href: "#playground",
  },
];
