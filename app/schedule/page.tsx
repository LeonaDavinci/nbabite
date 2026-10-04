import type { Metadata } from "next";
import Link from "next/link";
import { GAMES, getTeam } from "@/lib/data";
import { GameCard } from "@/components/GameCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { gameJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/format";

// Server-rendered on every request (SSR) so "current" games are always fresh.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NBA Schedule 2026-27 — Opening Week Games & Tip-Off Times",
  description:
    "The full 2026-27 NBA schedule for opening week: every matchup from Oct 20 onwards with dates, tip-off times, arenas and where each game airs legally (ESPN, NBC/Peacock, Prime Video, NBA League Pass).",
  alternates: { canonical: "/schedule" },
  openGraph: {
    title: "NBA Schedule 2026-27 — Opening Week Games | NBABite",
    description:
      "2026-27 NBA opening-week matchups from Oct 20: dates, tip-off times, arenas and legal broadcast info.",
    url: "/schedule",
    type: "website",
  },
};

// One SportsEvent per game, kept in a single ItemList for rich results.
const scheduleJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "2026-27 NBA Schedule — Opening Week",
  itemListElement: [...GAMES]
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: gameJsonLd(g, getTeam(g.homeTeamSlug)!, getTeam(g.awayTeamSlug)!),
    })),
};

export default function SchedulePage() {
  const games = [...GAMES].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  // Group games by calendar day (UTC) so the page reads like a real schedule.
  const byDay = games.reduce<Record<string, typeof games>>((acc, g) => {
    const key = new Date(g.date).toISOString().slice(0, 10);
    (acc[key] ||= []).push(g);
    return acc;
  }, {});
  const days = Object.keys(byDay).sort();

  const nationalGames = games.filter((g) => !/league pass/i.test(g.broadcast)).length;

  return (
    <>
      <JsonLd data={scheduleJsonLd} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Schedule" }]} />

      <section className="mx-auto max-w-content px-4 pb-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-nba-blue">2026-27 Regular Season</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">NBA Schedule &amp; Upcoming Games</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          The 2026-27 NBA season tips off on <strong>Tuesday, October 20, 2026</strong> on NBC and Peacock, with
          marquee national games throughout opening week on <strong>ESPN</strong>, <strong>NBC/Peacock</strong> and{" "}
          <strong>Prime Video</strong>, plus the rest of the slate on <strong>NBA League Pass</strong>. Below is every
          matchup from opening night, listed by date with tip-off times, arenas and where to watch legally.
        </p>

        <dl className="mt-6 grid max-w-2xl grid-cols-3 gap-4">
          <Stat value={String(games.length)} label="Games listed" />
          <Stat value={String(days.length)} label="Game days" />
          <Stat value={String(nationalGames)} label="National TV" />
        </dl>

        <p className="mt-5 text-sm text-slate-500">
          Looking for the full 82-game slate or live scores? See{" "}
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

      <section className="mx-auto max-w-content px-4 pb-12">
        {days.map((day, dayIdx) => (
          <div key={day} className="mt-8">
            <div className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-slate-200 pb-2">
              <h2 className="text-xl font-black text-slate-900">{formatDate(`${day}T12:00:00Z`)}</h2>
              {dayIdx === 0 && (
                <span className="rounded-full bg-nba-red px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white">
                  Opening Night
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
