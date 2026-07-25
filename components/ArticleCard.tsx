import Link from "next/link";
import { Article } from "@/lib/types";
import { teamForTag } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { TeamLogo } from "@/components/TeamLogo";

export function ArticleCard({ article }: { article: Article }) {
  const teamTags = article.tags
    .map((t) => ({ tag: t, team: teamForTag(t) }))
    .filter((x) => x.team);
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
      {teamTags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {teamTags.map(({ tag, team }) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
            >
              <TeamLogo slug={team!.slug} size={18} />
              {team!.shortName}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
