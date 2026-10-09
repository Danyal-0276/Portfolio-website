# Danyal Tanveer — Portfolio

A personal portfolio for a software and AI engineer, built with Next.js 15, React 19, TypeScript, GSAP, and Tailwind CSS 4.

## Experience

The 2026 redesign uses warm paper, dark ink, and vermilion accents, oversized editorial typography, and the supplied transparent portrait. The page flows through selected work, an interactive engineering toolkit, background and experience, research, smaller experiments, and contact.

- Six featured projects with category filters and accessible native detail dialogs.
- Three interactive engineering workflows with selectable stages.
- GSAP entrance animations, scroll reveals, portrait tracking, and progress indicator.
- Responsive navigation, keyboard controls, reduced-motion support, and a motion toggle.
- Updated graduate, internship, research, certification, and résumé content.
- Validated contact API using Resend, with rate limiting and escaped email HTML.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For another port, run `npm run dev -- --port 3010`.

```sh
npm run build
npm run start
npx eslint .
npx tsc --noEmit
```

Copy `.env.example` to `.env.local` and configure Resend for contact delivery. Set `NEXT_PUBLIC_SITE_URL` to the deployed canonical URL. The direct email link remains available if delivery is unavailable.

## Edit content

- `src/components/portfolio/Portfolio.tsx`: page sections and motion.
- `src/components/portfolio/ProjectGallery.tsx`: filters and project details.
- `src/components/portfolio/StackLab.tsx`: interactive toolkit.
- `src/data/selected-work.ts`: featured projects, experiments, and skills.
- `src/data/portfolio.ts`: shared identity, links, and site metadata.
- `src/app/globals.css`: design and responsive layouts.
- `public/resume.pdf` and `public/resumes/`: supplied résumé downloads.

Project descriptions were checked against the supplied résumés and public repositories at https://github.com/Danyal-0276. Research is identified as a submitted preprint with publication pending.

## Project visuals

`public/projects/feastly-ui.png`, `archive-ui.png`, `shopora-ui.png`, `orbit-ui.png`, and `games-ui.png` are generated interface mockups based on documented project features. They are explicitly labeled in the portfolio and are not presented as screenshots of deployed products. TRAK, Restaurant OS, and the other existing project visuals use supplied assets.

The portrait is the user's supplied transparent PNG. Original project assets and legacy components are retained for reference.
