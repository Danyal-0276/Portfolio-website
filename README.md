<div align="center">

# Danyal Tanveer · Portfolio

**Full-stack development. Applied AI. Interfaces with personality.**

An interactive portfolio connecting the person, the projects, and the engineering behind them.

![Next.js](https://img.shields.io/badge/Next.js-15-111217?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-0062FF?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=111217)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Hosting-Vercel-111217?style=for-the-badge&logo=vercel)

[Visit the portfolio](https://danyal.portfilio.live/) · [GitHub](https://github.com/Danyal-0276) · [LinkedIn](https://linkedin.com/in/danyal-tanveer-30b887320) · [Get in touch](mailto:donibutt2112@gmail.com)

</div>

---

## Overview

This is my personal portfolio as a computer science graduate, full-stack developer, and AI/ML engineer based in Lahore, Pakistan. It brings together my projects, internship experience, research, skills, and certifications in one responsive experience.

The visual direction combines electric blue, yellow, bold typography, and an editorial layout. Motion is part of the interaction: visitors can drag an engineer pass, explore project details, open experiment folders, and follow engineering workflows from interface to delivery.

**Explore:** [Features](#features) · [Featured projects](#featured-projects) · [Technology](#technology) · [Local setup](#local-setup) · [Deployment](#deployment) · [Customization](#customization)

## Features

### An interactive first impression

- Draggable hanging engineer pass with a flexible strap, momentum, and spring return.
- Two-dimensional movement, pointer capture, and keyboard controls.
- Animated ticker, scroll progress indicator, and section-aware navigation.
- Responsive layouts for desktop, tablet, and mobile.

### Work with context

- Ten featured projects across full-stack development, AI/ML, mobile, and client work.
- Category filters and native dialogs with project descriptions, technologies, outcomes, and repository links.
- A Playground of five smaller builds, presented as colorful folders with animated opening transitions.
- Clear labels distinguishing original screenshots, generated interface mockups, and edited product-video previews.

### More than a project gallery

- About section followed by full-width education and internship stories.
- Searchable skills organized across eight disciplines.
- Three interactive toolkit workflows: full-stack, AI/ML, and mobile/real-time.
- Research overview with a submitted preprint clearly marked as publication pending.
- Google, Hugging Face, and HackerRank certificate previews with enlarged viewing.
- Separate full-stack and AI/ML résumé downloads.

### Motion and accessibility

- GSAP scroll entrances, staggered reveals, and responsive animation cleanup.
- Certificate hover lift, shine, and animated viewer opening.
- Site-wide motion toggle and support for `prefers-reduced-motion`.
- Skip-to-content link, visible focus states, labeled controls, and keyboard-operable dialogs.

### Contact and discoverability

- Contact form backed by a Next.js API route, Zod validation, and Resend email delivery.
- Escaped email HTML and basic in-memory request limiting.
- Direct email and social links alongside the form.
- Open Graph metadata, Twitter cards, sitemap, robots configuration, and favicons.
- Canonical URLs, ProfilePage/Person/project JSON-LD, a generated social card, and a web manifest.

## Featured projects

- **[TRAK](https://github.com/Danyal-0276/TRAK)** — News credibility platform combining transformer models, a Django REST API, and a React Native experience.
- **[Feastly](https://github.com/Danyal-0276/feastly)** — Food delivery system with customer, restaurant, rider, and administrator portals.
- **[Throne of Glass Archive](https://throne-of-glass-rag.vercel.app/)** — An unofficial educational fan project with a streaming RAG assistant and spoiler-aware retrieval.
- **[Restaurant OS](https://github.com/Danyal-0276/POS-backend)** — Multi-tenant restaurant POS ecosystem built during my internship and deployed for two restaurant clients.
- **[Shopora](https://github.com/Danyal-0276/shopora)** — Commerce storefront with persistent carts, authenticated orders, and Stripe test checkout.
- **[Orbit](https://github.com/Danyal-0276/Music-Player-app)** — Offline-first Android music player with a local library and background playback.
- **[SmishGuard](https://github.com/Danyal-0276/Smish-Gaurd)** — Explainable Android SMS-phishing system with native inbox integration, encrypted local processing, a protected Django API, and trained-model reports.
- **[THRIFT for GNZ](https://thrift-for-gnz.vercel.app/)** — Client sneaker storefront and role-governed seller platform with atomic reservation checkout.
- **[Huzaifa Portfolio](https://huzaifa-portfolio-silk.vercel.app/)** — Business-development portfolio focused on B2B positioning, outreach process, and direct inquiry paths.
- **[Maham Portfolio](https://maham-tanveer-portfolio.vercel.app/)** — Editorial digital biography spanning education, leadership, certificates, and a visual archive.

The Playground also includes multiplayer browser games, J.A.R.V.I.S., network intrusion detection, marketplace scraping, and a native Android language-learning app.

## Technology

- **Application:** Next.js 15 App Router, React 19, TypeScript 5.
- **Styling:** Tailwind CSS 4 and custom responsive CSS.
- **Animation:** GSAP 3, ScrollTrigger, and `@gsap/react`; a custom spring simulation drives the hanging card.
- **Forms and email:** Zod and Resend through a Next.js route handler.
- **Quality checks:** ESLint and TypeScript.
- **Hosting:** Vercel, with GitHub as the source repository.

## Local setup

### 1. Clone and install

Use Node.js compatible with Next.js 15 and npm. The locked Next.js package accepts Node.js `^18.18.0 || ^19.8.0 || >=20.0.0`.

```sh
git clone https://github.com/Danyal-0276/Portfolio-website.git
cd Portfolio-website
npm ci
```

`npm ci` installs the versions recorded in `package-lock.json` for a reproducible setup.

### 2. Configure environment variables

Copy [`.env.example`](.env.example) to `.env.local`.

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS / Linux:

```sh
cp .env.example .env.local
```

Configure these values:

- **`RESEND_API_KEY`** — Resend API key used by the server to send contact messages.
- **`CONTACT_TO_EMAIL`** — Inbox that receives contact submissions.
- **`CONTACT_FROM_EMAIL`** — Sender address; use a verified sender domain for production delivery.
- **`SITE_URL`** — Server-only canonical production URL used for metadata, the sitemap, and robots rules.
- **`GOOGLE_SITE_VERIFICATION`** — Optional token from the Google Search Console HTML-tag verification method.

The portfolio can render without email credentials, but the contact form needs a configured email service to send messages. Direct email links remain available. Keep `.env.local` and API keys out of Git.

### 3. Start development

```sh
npm run dev
```

Open [localhost:3000](http://localhost:3000). To use another port:

```sh
npm run dev -- --port 3010
```

### Available checks and commands

```sh
# Check code with ESLint
npm run lint

# Check TypeScript types
npx tsc --noEmit

# Create a production build
npm run build

# Serve the production build locally
npm run start

# Verify canonical metadata and SEO endpoints (server must be running)
npm run check:seo -- http://localhost:3000
```

## Deployment

1. Import this GitHub repository into Vercel and select the **Next.js** framework preset.
2. Use the repository root as the project directory and `npm run build` as the build command.
3. Add the environment variables above to the appropriate Vercel environment.
4. Set `SITE_URL` to `https://danyal.portfilio.live`, then deploy the latest complete commit from `main`.
5. Verify the project previews, résumé downloads, certificate viewer, navigation, and contact delivery after deployment.
6. Run `npm run check:seo` against the deployed URL, then submit `/sitemap.xml` in Google Search Console.

Commit new components, imported stylesheets, and public assets together. A deployment builds only committed files; locally present but untracked files will not be available to Vercel.

The contact route currently uses an **in-memory rate limiter**. Its state is not shared across serverless instances and may reset when an instance restarts. A shared store would be needed for persistent limits across deployments and instances.

## Project structure

```text
src/
├── app/
│   ├── api/contact/route.ts       # Contact endpoint and validation
│   ├── layout.tsx                 # Metadata and global style imports
│   ├── manifest.ts               # Web app manifest
│   ├── opengraph-image.tsx       # 1200×630 generated social preview
│   ├── robots.ts                 # Crawler access and sitemap discovery
│   ├── sitemap.ts                # Canonical XML sitemap
│   ├── page.tsx                  # Portfolio entry point
│   ├── globals.css               # Base styles and responsive layouts
│   ├── bold.css                  # Visual direction and component styling
│   ├── typography.css            # Readable typography and layout refinements
│   ├── branding.css              # Wordmark and hanging card styles
│   ├── playground.css            # Experiment folders and transitions
│   └── certificates.css          # Certificate gallery and viewer
├── components/portfolio/         # Sections and interactive components
├── components/seo/               # Structured data
├── data/                         # Identity, projects, workflows, and skills
└── lib/email.ts                  # Resend delivery and email formatting
public/
├── images/                       # Portraits, wordmark, campus, and favicons
├── projects/                     # Project screenshots and supporting visuals
├── certifications/               # Certificate images
└── resumes/                      # Downloadable résumés
```

## Customization

- **Identity, social links, and metadata:** [`src/data/portfolio.ts`](src/data/portfolio.ts).
- **Featured projects, experiments, and toolkit workflows:** [`src/data/selected-work.ts`](src/data/selected-work.ts).
- **Skill groups and search content:** [`src/data/resume-skills.ts`](src/data/resume-skills.ts).
- **Section order, About, education, internship, and navigation:** [`Portfolio.tsx`](src/components/portfolio/Portfolio.tsx).
- **Hero composition:** [`HeroScene.tsx`](src/components/portfolio/HeroScene.tsx).
- **Card physics and drag behavior:** [`HangingCard.tsx`](src/components/portfolio/HangingCard.tsx).
- **Project filters and detail dialogs:** [`ProjectGallery.tsx`](src/components/portfolio/ProjectGallery.tsx).
- **Experiment folders:** [`Playground.tsx`](src/components/portfolio/Playground.tsx).
- **Certificates and verification links:** [`CertificateGallery.tsx`](src/components/portfolio/CertificateGallery.tsx).
- **Contact delivery:** [`src/lib/email.ts`](src/lib/email.ts) and [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts).

When adding animation, preserve keyboard interaction, the global motion toggle, and reduced-motion behavior. Keep project images and résumé links aligned with the corresponding content.

## Assets and project visuals

Project descriptions draw on my résumés and repositories. Research is presented as a submitted preprint, with publication pending.

The Feastly, Shopora, Orbit, and multiplayer-game images are generated visuals based on documented features; the Throne of Glass Archive now uses screenshots from its live deployment. Other project visuals use supplied screenshots and assets. Certificate previews are based on the supplied credentials.

Original materials are retained in `Images`, `Resumes`, `Snapshots of projects`, `Readme of my projects`, and `Website ideas` for future content updates.

<details>
<summary><strong>About generated folders</strong></summary>

- `.next/` contains generated Next.js development and production output. It is ignored by Git and recreated by the development or build command.
- `node_modules/` contains installed dependencies and is recreated with `npm ci`.
- `.next-*` directories are ignored temporary preview outputs; they are not application source.
- `.agents/` contains local project tooling instructions.

</details>

---

<div align="center">

**Designed and built by Danyal Tanveer**

[Portfolio](https://danyal.portfilio.live/) · [GitHub](https://github.com/Danyal-0276) · [LinkedIn](https://linkedin.com/in/danyal-tanveer-30b887320)

</div>
