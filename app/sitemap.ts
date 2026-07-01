import type { MetadataRoute } from "next"

const SITE_URL = "https://furkankarafil.me"

// Served at /sitemap.xml by the App Router convention. This is a single-page
// site — the section links are in-page anchors, not separate URLs — so the
// sitemap holds just the canonical homepage.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
