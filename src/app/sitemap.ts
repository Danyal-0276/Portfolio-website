import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(`${siteConfig.lastModified}T00:00:00.000Z`),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
