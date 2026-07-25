import type { Metadata } from "next";
import { PLAYERS } from "@/lib/data";
import { PlayerCard } from "@/components/PlayerCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "NBA Players & Superstars",
  description:
    "Profiles and stats for the NBA's biggest names — LeBron James, Stephen Curry, Victor Wembanyama, Nikola Jokic, Giannis Antetokounmpo, Luka Doncic and more.",
  alternates: { canonical: "/players" },
  openGraph: {
    title: "NBA Players & Superstars | NBABite",
    description: "Stats and profiles for the league's top stars.",
    url: "/players",
    type: "website",
  },
};

export default function PlayersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Players" }]} />
      <section className="mx-auto max-w-content px-4 pb-12">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">NBA Players & Superstars</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Career averages and bios for the league's most watched players. We track the veterans rewriting the
          record books and the young stars building the future.
        </p>

        <h2 className="mt-10 text-xl font-black text-nba-red">Featured Superstars</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PLAYERS.filter((p) => p.isStar).map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </section>
    </>
  );
}
