import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
