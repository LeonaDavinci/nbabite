import type { Metadata } from "next";
import { GAMES, getTeam } from "@/lib/data";
import { GameCard } from "@/components/GameCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { gameJsonLd } from "@/lib/seo";

// Server-rendered on every request (SSR) so "current" games are always fresh.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NBA Schedule & Upcoming Games",
  description:
    "The latest NBA schedule: upcoming 2026-27 matchups, tip-off times, arenas and where each game is broadcast legally.",
  alternates: { canonical: "/schedule" },
  openGraph: {
    title: "NBA Schedule & Upcoming Games | NBABite",
    description: "Upcoming NBA matchups, tip-off times, arenas and legal broadcast info.",
    url: "/schedule",
    type: "website",
  },
};

export default function SchedulePage() {
  const games = [...GAMES].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Schedule" }]} />
      <section className="mx-auto max-w-content px-4 pb-12">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">NBA Schedule</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Upcoming games across the league. Each matchup links to the home team's page, and every game notes its
          legal broadcaster so you know exactly where to watch.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => {
            const home = getTeam(g.homeTeamSlug);
            const away = getTeam(g.awayTeamSlug);
            return (
              <div key={g.id}>
                <GameCard game={g} />
                {home && away && <JsonLd data={gameJsonLd(g, home, away)} />}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
