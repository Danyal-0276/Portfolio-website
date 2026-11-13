const defaultSiteUrl = "https://danyal.portfilio.live";

function getSiteUrl(value: string | undefined) {
  if (!value) return defaultSiteUrl;

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.hostname === "localhost"
      ? url.origin
      : defaultSiteUrl;
  } catch {
    return defaultSiteUrl;
  }
}

const siteUrl = getSiteUrl(process.env.SITE_URL);

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export const siteConfig = {
  name: "Danyal Tanveer",
  title: "Danyal Tanveer | Full-Stack Developer & AI/ML Engineer",
  description:
    "Computer Science graduate and full-stack developer building production web systems with React, Next.js, and Node.js, plus end-to-end ML and NLP pipelines with PyTorch and Hugging Face.",
  url: siteUrl,
  ogImage: "/opengraph-image",
  profileImage: "/images/portrait-2026.png",
  logoPath: "/images/danyal-wordmark.png",
  faviconPath: "/images/favicon-512.png",
  faviconVersion: "5",
  lastModified: "2026-11-13",
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
  email: "donibutt2112@gmail.com",
  phone: "+92 370 7076164",
  location: "Lahore, Punjab, Pakistan",
  github: "https://github.com/Danyal-0276",
  linkedin: "https://linkedin.com/in/danyal-tanveer-30b887320",
  resumePath: "/resume.pdf",
};
