# App Architecture

Next.js route files stay at the root of this folder. Private folders begin with `_`, so they organize implementation code without creating routes.

- `_components/` — page composition, shared layout elements, and SEO output.
- `_hooks/` — page-level client behavior such as motion preferences, section tracking, and shared GSAP entrances.
- `_sections/` — one folder per homepage section. Section-specific components and specialized styles are colocated here.
- `_styles/` — cross-section foundations, the shared visual theme, and typography rules.
- `api/` — server route handlers.
- `layout.tsx` and `page.tsx` — the App Router shell and homepage entry point.

Data that drives multiple sections remains in `src/data/`; server utilities remain in `src/lib/`.
