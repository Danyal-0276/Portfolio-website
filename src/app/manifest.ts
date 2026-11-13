import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} Portfolio`,
    short_name: "Danyal",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f2",
    theme_color: "#0062ff",
    categories: ["portfolio", "technology", "development"],
    icons: [
      {
        src: "/images/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
