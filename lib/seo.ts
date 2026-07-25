import { SITE } from "./data";
import { Team, Player, Article, Game } from "./types";

export const SITE_URL = SITE.domain;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Build a Next.js Metadata object for a generic page. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  images?: { url: string; alt: string }[];
}) {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: opts.type ?? "website",
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
      images: opts.images ?? [{ url: "/opengraph-image.svg", alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

// ---------- JSON-LD structured data ----------
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE.description,
  };
}

export function teamJsonLd(team: Team) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: team.name,
    sport: "Basketball",
    url: absoluteUrl(`/teams/${team.slug}`),
    logo: `${SITE_URL}/icon.svg`,
    foundingDate: String(team.founded),
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: team.city,
        addressRegion: team.state,
        addressCountry: team.state === "Ontario" ? "CA" : "US",
      },
    },
    arena: team.arena,
    memberOf: { "@type": "SportsLeague", name: "National Basketball Association" },
  };
}

export function playerJsonLd(player: Player, teamName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.name,
    url: absoluteUrl(`/players/${player.slug}`),
    image: `${SITE_URL}/icon.svg`,
    jobTitle: `Basketball Player (${player.position})`,
    affiliation: { "@type": "SportsTeam", name: teamName },
    birthDate: player.born,
    birthPlace: player.birthplace,
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: absoluteUrl(`/news/${article.slug}`),
  };
}

export function gameJsonLd(game: Game, home: Team, away: Team) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${away.name} at ${home.name}`,
    startDate: game.date,
    eventStatus: "https://schema.org/EventScheduled",
    sport: "Basketball",
    homeTeam: {
      "@type": "SportsTeam",
      name: home.name,
      url: absoluteUrl(`/teams/${home.slug}`),
    },
    awayTeam: {
      "@type": "SportsTeam",
      name: away.name,
      url: absoluteUrl(`/teams/${away.slug}`),
    },
    location: { "@type": "Place", name: game.arena },
  };
}
