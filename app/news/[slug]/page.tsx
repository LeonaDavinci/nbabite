import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle, teamForTag } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { TeamLogo } from "@/components/TeamLogo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "Article not found" };
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
  }) as Metadata;
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-12">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-nba-red/10 px-2 py-0.5 font-semibold text-nba-red">{article.category}</span>
          <span className="text-slate-400">
            {formatDate(article.publishedAt)} · {article.author}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-4xl">{article.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{article.excerpt}</p>

        <div className="prose-nba mt-6">
          {article.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {article.tags.map((t) => {
            const team = teamForTag(t);
            return (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {team && <TeamLogo slug={team.slug} size={18} />}
                #{t}
              </span>
            );
          })}
        </div>

        <div className="mt-8">
          <Link href="/news" className="text-sm font-bold text-nba-blue hover:underline">
            ← Back to all news
          </Link>
        </div>
      </article>
    </>
  );
}
