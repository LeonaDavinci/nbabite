import type { MetadataRoute } from "next";
import { SITE, TEAMS, PLAYERS, ARTICLES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.domain;
  const now = new Date();

  const staticRoutes = [
    { url: `${base}/`, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${base}/schedule`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${base}/teams`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/players`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/news`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${base}/watch`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about`, priority: 0.4, changeFrequency: "yearly" as const },
  ].map((r) => ({ ...r, lastModified: now }));

  const teamRoutes = TEAMS.map((t) => ({
    url: `${base}/teams/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const playerRoutes = PLAYERS.map((p) => ({
    url: `${base}/players/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.isStar ? 0.8 : 0.6,
  }));

  const newsRoutes = ARTICLES.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...teamRoutes, ...playerRoutes, ...newsRoutes];
}
