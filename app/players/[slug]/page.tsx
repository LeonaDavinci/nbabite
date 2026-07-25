import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PLAYERS, getPlayer, getTeam } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { playerJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { TeamLogo } from "@/components/TeamLogo";

export function generateStaticParams() {
  return PLAYERS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const player = getPlayer(params.slug);
  if (!player) return { title: "Player not found" };
  const team = getTeam(player.teamSlug);
  return pageMetadata({
    title: `${player.name} — Stats, Bio & Highlights`,
    description: `${player.name} of the ${team?.name}: ${player.position}, #${player.jersey}. Career averages ${player.ppg} PPG, ${player.rpg} RPG, ${player.apg} APG. ${player.bio}`,
    path: `/players/${player.slug}`,
  }) as Metadata;
}

export default function PlayerPage({ params }: { params: { slug: string } }) {
  const player = getPlayer(params.slug);
  if (!player) notFound();
  const team = getTeam(player.teamSlug);

  return (
    <>
      <JsonLd data={playerJsonLd(player, team?.name ?? "")} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Players", href: "/players" },
          { label: player.name },
        ]}
      />
      <section className="mx-auto max-w-content px-4 pb-12">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Identity */}
          <div className="md:w-1/3">
            <div
              className="grid h-40 place-items-center rounded-2xl text-white shadow-card"
              style={{ background: team?.primaryColor ?? "#1D428A" }}
            >
              <span className="text-6xl font-black">
                {player.firstName[0]}
                {player.lastName[0]}
              </span>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <h1 className="text-2xl font-black text-slate-900">{player.name}</h1>
              <p className="flex items-center gap-1.5 text-sm text-slate-500">
                {team && <TeamLogo slug={team.slug} size={20} className="shrink-0" />}
                {team?.name} · #{player.jersey} · {player.position}
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Height" value={player.height} />
                <Row label="Weight" value={player.weight} />
                <Row label="Born" value={`${formatDate(player.born)} (${player.birthplace})`} />
                <Row label="Drafted" value={String(player.draftYear)} />
              </dl>
              {team && (
                <Link href={`/teams/${team.slug}`} className="mt-4 inline-block text-sm font-bold text-nba-blue hover:underline">
                  View {team.name} →
                </Link>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-black text-slate-900">Season Averages</h2>
            <div className="mt-3 grid grid-cols-3 gap-4">
              <StatBox label="Points" value={player.ppg} />
              <StatBox label="Rebounds" value={player.rpg} />
              <StatBox label="Assists" value={player.apg} />
            </div>

            <h2 className="mt-8 text-xl font-black text-slate-900">Bio</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{player.bio}</p>

            <div className="mt-8">
              <Link href="/players" className="text-sm font-bold text-nba-blue hover:underline">
                ← Back to all players
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value}</dd>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-card">
      <div className="text-3xl font-black text-nba-red">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
