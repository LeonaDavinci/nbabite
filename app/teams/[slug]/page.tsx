import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TEAMS, getTeam, getPlayersByTeam } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlayerCard } from "@/components/PlayerCard";
import { JsonLd } from "@/components/JsonLd";
import { teamJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return TEAMS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const team = getTeam(params.slug);
  if (!team) return { title: "Team not found" };
  return pageMetadata({
    title: `${team.name} — Schedule, Roster & History`,
    description: `Everything about the ${team.name}: founded ${team.founded}, home at ${team.arena}, ${team.championships} championship(s), and current roster. ${team.description}`,
    path: `/teams/${team.slug}`,
  }) as Metadata;
}

export default function TeamPage({ params }: { params: { slug: string } }) {
  const team = getTeam(params.slug);
  if (!team) notFound();
  const roster = getPlayersByTeam(team.slug);

  return (
    <>
      <JsonLd data={teamJsonLd(team)} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Teams", href: "/teams" },
          { label: team.name },
        ]}
      />
      <section className="mx-auto max-w-content px-4 pb-12">
        {/* Banner */}
        <div
          className="overflow-hidden rounded-2xl text-white shadow-card"
          style={{ background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})` }}
        >
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                {team.conference} Conference · {team.division}
              </p>
              <h1 className="mt-1 text-3xl font-black md:text-5xl">{team.name}</h1>
              <p className="mt-2 max-w-xl text-white/90">{team.description}</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black drop-shadow">{team.shortName}</div>
            </div>
          </div>
        </div>

        {/* Facts */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Fact label="Founded" value={String(team.founded)} />
          <Fact label="Championships" value={String(team.championships)} />
          <Fact label="Arena" value={team.arena} />
          <Fact label="Location" value={`${team.city}, ${team.state}`} />
        </div>

        {/* Roster */}
        <h2 className="mt-10 text-2xl font-black text-slate-900">Roster & Stars</h2>
        {roster.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roster.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-slate-600">
            Roster details are updated each season. Visit the official team site for the latest lineup.
          </p>
        )}

        <div className="mt-8">
          <Link href="/teams" className="text-sm font-bold text-nba-blue hover:underline">
            ← Back to all teams
          </Link>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-bold text-slate-900">{value}</div>
    </div>
  );
}
