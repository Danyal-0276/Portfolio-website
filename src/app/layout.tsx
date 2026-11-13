import type { Metadata, Viewport } from "next";
import { JsonLd } from "./_components/seo/JsonLd";
import { siteConfig } from "@/data/portfolio";
import "./_styles/base.css";
import "./_styles/theme.css";
import "./_styles/typography.css";
import "./_sections/playground/playground.css";
import "./_sections/hero/hero.css";
import "./_sections/playground/certificates.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  referrer: "strict-origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Full-Stack Developer and AI/ML Engineer`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
  icons: {
    icon: [
      {
        url: `/images/favicon-32.png?v=${siteConfig.faviconVersion}`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `/images/favicon-192.png?v=${siteConfig.faviconVersion}`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `/images/favicon-512.png?v=${siteConfig.faviconVersion}`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: `/images/favicon-192.png?v=${siteConfig.faviconVersion}`,
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: `/images/favicon-32.png?v=${siteConfig.faviconVersion}`,
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#0062ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Browser extensions can inject attributes on the root before hydration.
    // Keep this escape hatch on html only so component mismatches remain visible.
    <html lang="en" suppressHydrationWarning>
      <body>
        <JsonLd />
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
