import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-nba-red/10 px-2 py-0.5 font-semibold text-nba-red">
          {article.category}
        </span>
        <span className="text-slate-400">{formatDate(article.publishedAt)}</span>
      </div>
      <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-nba-blue">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
    </Link>
  );
}
