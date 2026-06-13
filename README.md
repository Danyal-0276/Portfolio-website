<div align="center">

# Danyal Tanveer — Portfolio Website

**Full-Stack Web Developer & AI/ML Researcher** · Personal portfolio with GSAP animations, project showcase, and contact form.

[![Live Site](https://img.shields.io/badge/Live_Site-Vercel-EDB33C?style=for-the-badge&logo=vercel&logoColor=black)](https://portfolio-website-git-main-danyal-tanveer-s-projects.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Danyal--0276-181717?style=for-the-badge&logo=github)](https://github.com/Danyal-0276)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/danyal-tanveer-30b887320)

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-000000?style=flat-square&logo=resend&logoColor=white)](https://resend.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## About

Production-ready portfolio for **Danyal Tanveer**, a Computer Science student at UCP (CGPA 3.59) specializing in full-stack development and NLP research. The site highlights **9 projects**, internships, certifications, and **70+ skills** — from POS systems deployed in restaurants to BERT-family fake news benchmarks.

Built with a dark **James Lux–inspired hero**, cream & gold aesthetic, and scroll-driven GSAP interactions throughout.

---

## Highlights

| | |
|---|---|
| **Projects** | TRAK, J.A.R.V.I.S, POS Ecosystem, BERT Benchmark, NIDS, Scraper, Duolingo Clone, JS Projects, Disease Detection |
| **Certifications** | Google AI Fundamentals (Coursera) · Hugging Face Agents Course |
| **Experience** | Full-Stack Developer Intern @ Tri Tech Technology LLC |
| **Contact** | Resend-powered form with validation (Zod) |

---

## Features

- Dark hero with merged portrait, ambient glow, and custom **DT logo**
- **ScrollSmoother** + **ScrollTrigger** reveals and smooth section navigation
- **Focus Turntable** — draggable dial for 4 expertise areas
- **Project Showcase** — horizontal scroll on desktop, vertical on mobile
- **Project Collage** — draggable snapshot cards on an interactive board
- **Skills bento grid** — compact dark layout with 8 categorized skill groups
- **Certifications** gallery with verify links
- SEO metadata, Open Graph, sitemap, and `robots.txt`
- Fully responsive with `prefers-reduced-motion` support

---

## Page Sections

```
Hero → Tech Marquee → Focus Turntable → About → Experience
  → Certifications → Project Showcase → Project Collage → Skills → Contact
```

---

## Tech Stack

**Frontend** · Next.js 15 · React 19 · TypeScript · Tailwind CSS 4  

**Animation** · GSAP · ScrollSmoother · ScrollTrigger · Draggable · InertiaPlugin  

**Backend / API** · Next.js Route Handlers · Resend · Zod  

**Deploy** · Vercel · Render · Contabo · Netlify *(project backends)*  

**Content** · Single source of truth in `src/data/portfolio.ts`

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run locally

```bash
git clone https://github.com/Danyal-0276/Portfolio-website.git
cd Portfolio-website
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Email that receives form submissions |
| `CONTACT_FROM_EMAIL` | Sender address (`onboarding@resend.dev` for testing) |
| `NEXT_PUBLIC_SITE_URL` | Production URL (`https://portfolio-website-git-main-danyal-tanveer-s-projects.vercel.app`) |

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add the environment variables above in **Project → Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js

### Resend setup

1. Create a free account at [resend.com](https://resend.com)
2. Add your API key as `RESEND_API_KEY`
3. For production, verify your domain and update `CONTACT_FROM_EMAIL`

---

## Project structure

```
src/
├── app/                    # App Router, API routes, globals.css
├── components/
│   ├── layout/             # Navbar, Footer, SmoothScrollProvider
│   ├── sections/           # Hero, About, Projects, Skills, Contact, …
│   └── ui/                 # Button, SectionHeading, ProjectSnapshotStack
├── data/
│   └── portfolio.ts        # All site content
└── lib/                    # GSAP, email, utils
public/
├── images/                 # profile-hero.png, logo.png, favicons
├── certifications/
├── projects/
└── resume.pdf
```

### Updating content

Edit **`src/data/portfolio.ts`** for bio, projects, skills, certifications, and nav links.  
Replace assets under **`public/`** for new screenshots or photos.

---

## Scripts

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Suggested GitHub topics

Add these under **Repository → About → Topics** so the repo surfaces in searches:

`portfolio` `nextjs` `react` `typescript` `tailwindcss` `gsap` `full-stack` `machine-learning` `vercel` `resend` `personal-website` `developer-portfolio`

---

<div align="center">

**Danyal Tanveer**

[Lahore, Pakistan](https://portfolio-website-git-main-danyal-tanveer-s-projects.vercel.app) · [GitHub](https://github.com/Danyal-0276) · [LinkedIn](https://linkedin.com/in/danyal-tanveer-30b887320) · [Email](mailto:donibutt2112@gmail.com)

</div>
