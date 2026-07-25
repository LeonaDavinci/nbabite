import type { Metadata } from "next";
import { ARTICLES } from "@/lib/data";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "NBA News, Analysis & Previews",
  description:
    "The latest NBA news, player spotlights and season previews from NBABite — covering LeBron James, Victor Wembanyama, the Warriors dynasty and the title race.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "NBA News, Analysis & Previews | NBABite",
    description: "Player spotlights, team features and league previews.",
    url: "/news",
    type: "website",
  },
};

export default function NewsPage() {
  const articles = [...ARTICLES].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
      <section className="mx-auto max-w-content px-4 pb-12">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">NBA News & Analysis</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Player spotlights, team features and season previews written for fans who want context, not noise.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
