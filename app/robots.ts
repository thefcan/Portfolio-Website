import type { MetadataRoute } from "next"

const SITE_URL = "https://furkankarafil.me"

// Served at /robots.txt by the App Router convention.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
