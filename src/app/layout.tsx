import type { Metadata } from "next";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";
import "./bold.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1254, height: 1254, alt: siteConfig.name }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
