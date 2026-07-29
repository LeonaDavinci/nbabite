import type { Metadata } from "next";
import Link from "next/link";
import { TEAMS, GAMES, ARTICLES, starPlayers, teamForTag } from "@/lib/data";
import { GameCard } from "@/components/GameCard";
import { PlayerCard } from "@/components/PlayerCard";
import { TeamCard } from "@/components/TeamCard";
import { ArticleCard } from "@/components/ArticleCard";
import { TeamLogo } from "@/components/TeamLogo";

export const metadata: Metadata = {
  title: "NBABite - Lebron to 76er | NBA Streams",
};

export default function HomePage() {
  const stars = starPlayers().slice(0, 8);
  const featuredGames = GAMES.slice(0, 6);
  const latestNews = ARTICLES.slice(0, 3);
  const breaking = ARTICLES.find((a) => a.breaking);

  return (
    <>
      {/* HERO */}
      <section className="court-gradient">
        <div className="mx-auto max-w-content px-4 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-nba-blue">Independent NBA fan hub</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-900 md:text-6xl">
            <span className="text-nba-red">nbabite</span> - your nba streams home website
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Schedules, scores, every team, the biggest stars — LeBron James, Stephen Curry, Victor Wembanyama —
            and the legal ways to watch NBA basketball, all in one place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/schedule" className="rounded-lg bg-nba-red px-5 py-3 font-bold text-white shadow-card transition hover:bg-nba-blue">
              View NBA Schedule
            </Link>
            <Link href="/watch" className="rounded-lg border border-nba-blue px-5 py-3 font-bold text-nba-blue transition hover:bg-nba-blue hover:text-white">
              Where to Watch
            </Link>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            <HeroStat value="30" label="NBA Teams" />
            <HeroStat value="82" label="Games / Team" />
            <HeroStat value="16" label="Star Players" />
          </dl>
        </div>
      </section>

      {/* BREAKING NEWS */}
      {breaking && (
        <section className="mx-auto max-w-content px-4 pt-8">
          <Link
            href={`/news/${breaking.slug}`}
            className="block overflow-hidden rounded-2xl border-2 border-nba-red bg-white shadow-card transition hover:shadow-lg"
          >
            <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center">
              {(() => {
                const team = breaking.tags.map(teamForTag).find(Boolean);
                return team ? (
                  <TeamLogo slug={team.slug} size={48} className="shrink-0" />
                ) : null;
              })()}
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-nba-red px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
                🔥 Breaking
              </span>
              <div>
                <h2 className="text-lg font-black text-slate-900 md:text-2xl">{breaking.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{breaking.excerpt}</p>
              </div>
              <span className="md:ml-auto text-sm font-bold text-nba-red hover:underline">Read more →</span>
            </div>
          </Link>
        </section>
      )}

      {/* UPCOMING GAMES */}
      <section className="mx-auto max-w-content px-4 py-12">
        <SectionHeader title="Upcoming NBA Games" subtitle="Featured matchups from the current slate" href="/schedule" cta="Full schedule" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGames.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      {/* STAR PLAYERS */}
      <section className="mx-auto max-w-content px-4 py-12">
        <SectionHeader title="NBA Superstars" subtitle="The faces defining today's league" href="/players" cta="All players" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stars.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </section>

      {/* ALL TEAMS */}
      <section className="mx-auto max-w-content px-4 py-12">
        <SectionHeader title="All 30 Teams" subtitle="Every franchise, conference and division" href="/teams" cta="Browse teams" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TEAMS.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="mx-auto max-w-content px-4 py-12">
        <SectionHeader title="Latest NBA News" subtitle="Analysis, previews and player spotlights" href="/news" cta="All news" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {latestNews.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* REDDIT HERITAGE */}
      <section className="mx-auto max-w-content px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">👽</span>
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl">From Reddit to NBABite</h2>
          </div>
          <p className="mt-4 text-slate-600">
            NBABite grew out of the <strong>Reddit</strong> community <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">r/nbastreams</code>,
            the place where NBA fans gathered to share where to watch every game. In 2019, Reddit banned
            r/nbastreams (along with other stream-sharing subreddits) over copyright concerns, and the community
            had to find a new home.
          </p>
          <p className="mt-3 text-slate-600">
            That migration is exactly what gave rise to independent hubs like <strong>NBABite</strong>. Born from the
            spirit of r/nbastreams, NBABite carries the community forward — but today it points fans to the
            <strong> legal</strong> ways to watch: NBA League Pass, ESPN, NBC, Amazon Prime Video and more. Same
            love for the game, the right way to support it.
          </p>
          <Link
            href="/watch"
            className="mt-5 inline-block rounded-lg bg-nba-blue px-5 py-3 font-bold text-white transition hover:bg-nba-red"
          >
            See the legal ways to watch
          </Link>
        </div>
      </section>

      {/* WATCH CTA */}
      <section className="mx-auto max-w-content px-4 py-12">
        <div className="rounded-2xl bg-nba-blue p-8 text-center text-white shadow-card">
          <h2 className="text-2xl font-black md:text-3xl">Watch the NBA the right way</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            From NBA League Pass to ESPN, NBC and Amazon Prime Video — see every legal way to stream and
            support the game you love.
          </p>
          <Link href="/watch" className="mt-5 inline-block rounded-lg bg-white px-5 py-3 font-bold text-nba-blue transition hover:bg-nba-red hover:text-white">
            See where to watch
          </Link>
        </div>
      </section>
    </>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/70 p-4 text-center">
      <dt className="text-2xl font-black text-nba-blue">{value}</dt>
      <dd className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dd>
    </div>
  );
}

function SectionHeader({ title, subtitle, href, cta }: { title: string; subtitle: string; href: string; cta: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
      <div>
        <h2 className="text-2xl font-black text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <Link href={href} className="text-sm font-bold text-nba-red hover:underline">
        {cta} →
      </Link>
    </div>
  );
}
