import type { Metadata } from "next";
import Link from "next/link";
import { getTeam, getUpcomingGames, getFinishedGames } from "@/lib/data";
import { GameCard } from "@/components/GameCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { gameJsonLd } from "@/lib/seo";
import { formatDateIn, dateKeyIn } from "@/lib/format";

const ET = "America/New_York";

// Server-rendered on every request (SSR) so scores and "upcoming" are always fresh.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NBA Schedule 2026-27 — Live Scores, Results & Upcoming Games",
  description:
    "The 2026-27 NBA schedule with live scores, final results and every upcoming game: dates, tip-off times, arenas and where to watch on TV or streaming.",
  alternates: { canonical: "/schedule" },
  openGraph: {
    title: "NBA Schedule 2026-27 — Scores, Results & Upcoming Games | NBABite",
    description:
      "Live scores, final results and every upcoming 2026-27 NBA game with dates, tip-off times, arenas and legal broadcast info.",
    url: "/schedule",
    type: "website",
  },
};

export default function SchedulePage() {
  const upcoming = getUpcomingGames();
  const results = getFinishedGames();
  const live = upcoming.filter((g) => g.status === "live");

  // Group upcoming games by calendar day in Eastern time (how US fans think about game nights).
  const byDay = upcoming.reduce<Record<string, typeof upcoming>>((acc, g) => {
    const key = dateKeyIn(g.date, ET);
    (acc[key] ||= []).push(g);
    return acc;
  }, {});
  const days = Object.keys(byDay).sort();

  const nationalGames = upcoming.filter((g) => !/league pass/i.test(g.broadcast)).length;

  // Rich results: the next 40 games plus the most recent finals (keeps the payload sane).
  const jsonLdItems = [...results.slice(0, 10).reverse(), ...upcoming.slice(0, 40)];
  const scheduleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "2026-27 NBA Schedule — Results & Upcoming Games",
    itemListElement: jsonLdItems.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: gameJsonLd(g, getTeam(g.homeTeamSlug)!, getTeam(g.awayTeamSlug)!),
    })),
  };

  return (
    <>
      <JsonLd data={scheduleJsonLd} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Schedule" }]} />

      <section className="mx-auto max-w-content px-4 pb-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-nba-blue">2026-27 Regular Season</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
          NBA Schedule, Scores &amp; Upcoming Games
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          The 2026-27 season is underway. Below are the <strong>latest results</strong> with final scores and the{" "}
          <strong>upcoming games</strong> — every matchup with tip-off times, arenas and where to watch. National
          windows air on <strong>NBC/Peacock</strong>, <strong>ESPN</strong> and <strong>Prime Video</strong>; the
          rest of the slate streams on <strong>NBA League Pass</strong>.
        </p>

        <dl className="mt-6 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat value={String(results.length)} label="Finals played" />
          <Stat value={String(live.length)} label="Live now" />
          <Stat value={String(upcoming.length)} label="Upcoming games" />
          <Stat value={String(nationalGames)} label="National TV" />
        </dl>

        <p className="mt-5 text-sm text-slate-500">
          Scores update each time this page loads. See{" "}
          <Link href="/teams" className="font-semibold text-nba-red hover:underline">
            every team
          </Link>{" "}
          or{" "}
          <Link href="/watch" className="font-semibold text-nba-red hover:underline">
            where to watch
          </Link>
          .
        </p>
      </section>

      {/* RECENT RESULTS */}
      {results.length > 0 && (
        <section className="mx-auto max-w-content px-4 pb-4">
          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 border-b-2 border-slate-200 pb-2">
            <h2 className="text-xl font-black text-slate-900">Latest results</h2>
            <span className="ml-auto text-xs font-semibold uppercase tracking-wide text-slate-400">
              {results.length} final{results.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}

      {/* UPCOMING BY DATE */}
      <section className="mx-auto max-w-content px-4 pb-12">
        {days.map((day, dayIdx) => (
          <div key={day} className="mt-8">
            <div className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-slate-200 pb-2">
              <h2 className="text-xl font-black text-slate-900">{formatDateIn(`${day}T16:00:00Z`, ET)}</h2>
              {dayIdx === 0 && byDay[day].some((g) => g.status === "live") && (
                <span className="rounded-full bg-nba-red px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white">
                  Live now
                </span>
              )}
              <span className="ml-auto text-xs font-semibold uppercase tracking-wide text-slate-400">
                {byDay[day].length} {byDay[day].length === 1 ? "game" : "games"}
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {byDay[day].map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </div>
        ))}
        {days.length === 0 && (
          <p className="mt-8 text-slate-600">
            No upcoming games are loaded right now — check back soon, or browse the{" "}
            <Link href="/teams" className="font-semibold text-nba-red hover:underline">
              team pages
            </Link>
            .
          </p>
        )}
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-card">
      <dt className="text-2xl font-black text-nba-blue">{value}</dt>
      <dd className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dd>
    </div>
  );
}
