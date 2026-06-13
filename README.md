# Danyal Tanveer — Portfolio Website

Production-ready portfolio built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **GSAP** (ScrollSmoother + ScrollTrigger).

## Features

- Cream & gold aesthetic inspired by design mockups
- GSAP smooth scrolling and scroll-triggered section reveals
- 8 featured projects with GitHub links
- Contact form with Resend email integration
- SEO metadata, sitemap, and robots.txt
- Responsive layout with reduced-motion support

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local` from `.env.example`:

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Your email for form submissions |
| `CONTACT_FROM_EMAIL` | Sender address (use `onboarding@resend.dev` for testing) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for metadata |

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Next.js

### Resend Setup

1. Create a free account at [resend.com](https://resend.com)
2. Copy your API key to `RESEND_API_KEY`
3. For production, verify your domain and update `CONTACT_FROM_EMAIL`

## Project Structure

```
src/
├── app/              # Next.js App Router pages & API
├── components/
│   ├── layout/       # Navbar, SmoothScrollProvider
│   ├── sections/     # Hero, About, Experience, Projects, Skills, Contact
│   └── ui/           # Button, ProjectCard, SkillBadge
├── data/
│   └── portfolio.ts  # All site content (single source of truth)
└── lib/              # GSAP helpers, email, utils
public/
├── images/profile.png
└── resume.pdf
```

## GSAP Animation Stack

- **ScrollSmoother** — momentum-style smooth scrolling
- **ScrollTrigger** — batch reveal animations on scroll
- **ScrollToPlugin** — smooth navigation between sections
- **`prefers-reduced-motion`** — animations disabled for accessibility

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Author

**Danyal Tanveer** — [GitHub](https://github.com/Danyal-0276) · [LinkedIn](https://linkedin.com/in/danyal-tanveer-30b887320)
