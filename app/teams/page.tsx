import type { Metadata } from "next";
import { TEAMS } from "@/lib/data";
import { TeamCard } from "@/components/TeamCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "All 30 NBA Teams",
  description:
    "Every NBA franchise at a glance: the Boston Celtics, Los Angeles Lakers, Golden State Warriors, San Antonio Spurs and all 30 teams across the Eastern and Western Conferences.",
  alternates: { canonical: "/teams" },
  openGraph: {
    title: "All 30 NBA Teams | NBABite",
    description: "Browse every NBA franchise by conference and division.",
    url: "/teams",
    type: "website",
  },
};

export default function TeamsPage() {
  const east = TEAMS.filter((t) => t.conference === "Eastern");
  const west = TEAMS.filter((t) => t.conference === "Western");

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Teams" }]} />
      <section className="mx-auto max-w-content px-4 pb-12">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">All 30 NBA Teams</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          From the Atlantic to the Pacific, every franchise in the league. Click a team for its history, arena,
          championships and roster.
        </p>

        <ConferenceGroup title="Eastern Conference" teams={east} />
        <ConferenceGroup title="Western Conference" teams={west} />
      </section>
    </>
  );
}

function ConferenceGroup({ title, teams }: { title: string; teams: typeof TEAMS }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-black text-nba-blue">{title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teams.map((t) => (
          <TeamCard key={t.id} team={t} />
        ))}
      </div>
    </div>
  );
}
