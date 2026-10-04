import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  GAMES,
  getGame,
  getTeam,
  getPlayersByTeam,
  getGamesOnSameDay,
  getGamesByTeam,
} from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TeamLogo } from "@/components/TeamLogo";
import { PlayerCard } from "@/components/PlayerCard";
import { GameCard } from "@/components/GameCard";
import { gameJsonLd, breadcrumbJsonLd, metaDescription, absoluteUrl } from "@/lib/seo";
import { formatTimeIn, formatDateIn, formatShortDateIn, formatTime } from "@/lib/format";

const ET = "America/New_York";

export function generateStaticParams() {
  return GAMES.map((g) => ({ id: g.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const game = getGame(params.id);
  if (!game) return { title: "Game not found" };
  const home = getTeam(game.homeTeamSlug);
  const away = getTeam(game.awayTeamSlug);
  if (!home || !away) return { title: "Game not found" };

  const dateShort = formatShortDateIn(game.date, ET);
  const tip = formatTimeIn(game.date, ET);
  const title = `${away.shortName} vs ${home.shortName} — ${dateShort}`;
  const description = metaDescription(
    `${away.name} at ${home.name} on ${dateShort}, ${tip} ET at ${game.arena}. Preview, key players, records and where to watch (${game.broadcast}).`,
  );
  const url = absoluteUrl(`/games/${game.id}`);
  return {
    title,
    description,
    alternates: { canonical: `/games/${game.id}` },
    openGraph: { title: `${title} | NBABite`, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${title} | NBABite`, description },
  };
}

export default function GamePage({ params }: { params: { id: string } }) {
  const game = getGame(params.id);
  if (!game) notFound();
  const home = getTeam(game.homeTeamSlug);
  const away = getTeam(game.awayTeamSlug);
  if (!home || !away) notFound();

  const homePlayers = getPlayersByTeam(home.slug);
  const awayPlayers = getPlayersByTeam(away.slug);
  const sameDay = getGamesOnSameDay(game);
  const homeNext = getGamesByTeam(home.slug).filter((g) => g.id !== game.id).slice(0, 3);
  const awayNext = getGamesByTeam(away.slug).filter((g) => g.id !== game.id).slice(0, 3);

  const dateLong = formatDateIn(game.date, ET);
  const tipEt = formatTimeIn(game.date, ET);
  const tipUtc = formatTime(game.date);
  const sameDivision = home.division === away.division;
  const sameConference = home.conference === away.conference;

  return (
    <>
      <JsonLd data={gameJsonLd(game, home, away)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Schedule", path: "/schedule" },
          { name: `${away.shortName} at ${home.shortName}`, path: `/games/${game.id}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Schedule", href: "/schedule" },
          { label: `${away.shortName} at ${home.shortName}` },
        ]}
      />

      {/* MATCHUP HEADER */}
      <section className="mx-auto max-w-content px-4 pb-6">
        {game.label && (
          <span className="inline-flex items-center rounded-full bg-nba-blue/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-nba-blue">
            {game.label}
          </span>
        )}
        <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-nba-red">
          {game.week ? `${game.week} · ` : ""}
          {dateLong}
        </p>
        <h1 className="mt-1 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
          {away.name} vs {home.name}
        </h1>
        <p className="mt-2 text-slate-600">
          Tip-off <strong>{tipEt} ET</strong> ({tipUtc}) at {game.arena}, {game.arenaCity}
          {game.arenaState ? `, ${game.arenaState}` : ""}.
        </p>

        <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <TeamSide team={away} label="Away" record={game.awayRecord} />
          <div className="text-center text-sm font-black uppercase tracking-widest text-slate-400">at</div>
          <TeamSide team={home} label="Home" record={game.homeRecord} align="right" />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/watch" className="rounded-lg bg-nba-red px-5 py-3 font-bold text-white shadow-card transition hover:bg-nba-blue">
            Where to watch
          </Link>
          <Link href="/schedule" className="rounded-lg border border-nba-blue px-5 py-3 font-bold text-nba-blue transition hover:bg-nba-blue hover:text-white">
            Full NBA schedule
          </Link>
        </div>
      </section>

      {/* GAME INFO */}
      <section className="mx-auto max-w-content px-4 py-6">
        <h2 className="border-b border-slate-200 pb-2 text-2xl font-black text-slate-900">Game information</h2>
        <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <Info label="Date">{formatDateIn(game.date, ET)}</Info>
          <Info label="Tip-off">
            {tipEt} ET · {tipUtc}
          </Info>
          <Info label="Arena">
            {game.arena}
            {game.arenaCity ? `, ${game.arenaCity}` : ""}
            {game.arenaState ? `, ${game.arenaState}` : ""}
          </Info>
          <Info label="TV broadcast">{game.broadcast}</Info>
          {game.radio && game.radio.length > 0 && <Info label="Radio">{game.radio.join(", ")}</Info>}
          <Info label="Competition">
            {[game.label, game.week].filter(Boolean).join(" · ") || "2026-27 NBA regular season"}
          </Info>
          {game.gameId && (
            <Info label="Official game ID">
              {game.gameId}
              {game.gameCode ? ` (${game.gameCode})` : ""}
            </Info>
          )}
          <Info label="Records">
            {away.shortName} {game.awayRecord} · {home.shortName} {game.homeRecord}
          </Info>
        </dl>
      </section>

      {/* PREVIEW */}
      <section className="mx-auto max-w-content px-4 py-6">
        <h2 className="border-b border-slate-200 pb-2 text-2xl font-black text-slate-900">
          {away.name} vs {home.name} preview
        </h2>
        <div className="mt-4 space-y-3 text-slate-600">
          <p>
            The <strong>{away.name}</strong> ({game.awayRecord}) visit the <strong>{home.name}</strong> (
            {game.homeRecord}) at <strong>{game.arena}</strong> in {game.arenaCity || home.city} on {dateLong},
            tipping off at {tipEt} ET. It&apos;s a {game.week ? `${game.week} ` : ""}game of the 2026-27 NBA
            regular season
            {game.label ? `, part of the ${game.label}` : ""}.
          </p>
          <p>
            {sameDivision ? (
              <>
                This is a <strong>{home.division} Division</strong> matchup, so bragging rights and early
                standings position are on the line between two teams that know each other well.
              </>
            ) : sameConference ? (
              <>
                Both clubs play in the <strong>{home.conference} Conference</strong>, making this an early-season
                measuring stick in the race for playoff seeding.
              </>
            ) : (
              <>
                It is a <strong>cross-conference</strong> meeting — {away.name} out of the {away.conference} against{" "}
                {home.name} of the {home.conference} — one of only two chances these teams get each season.
              </>
            )}{" "}
            {home.championships > 0 || away.championships > 0
              ? `${home.name} have ${home.championships} title${home.championships === 1 ? "" : "s"} and ${away.name} have ${away.championships}.`
              : `${home.name} and ${away.name} are both still chasing a first championship.`}
          </p>
          <p>
            The game is carried on <strong>{game.broadcast}</strong>
            {game.radio && game.radio.length > 0 ? `, with radio coverage on ${game.radio.join(", ")}` : ""}. Fans
            outside the local markets can stream it through NBA League Pass, subject to blackout rules — see our{" "}
            <Link href="/watch" className="font-semibold text-nba-red hover:underline">
              guide to watching the NBA legally
            </Link>
            .
          </p>
        </div>

        <h3 className="mt-6 text-lg font-black text-slate-900">Keys to the game</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          <KeyItem>
            Home court: {home.name} host at {game.arena}, where crowd energy and familiarity with the rims and
            floor can swing close games.
          </KeyItem>
          <KeyItem>
            {away.shortName} on the road: {away.name}'s first test away from home in {game.week || "the new season"}.
          </KeyItem>
          <KeyItem>
            Broadcast: {game.broadcast}
            {game.nationalTv && game.nationalTv.length > 0 ? " — a nationally televised window" : ""}.
          </KeyItem>
          <KeyItem>
            Early-season stakes: records reset to {game.awayRecord} and {game.homeRecord}, so every result matters
            for seeding.
          </KeyItem>
        </ul>
      </section>

      {/* PLAYERS TO WATCH */}
      {(awayPlayers.length > 0 || homePlayers.length > 0) && (
        <section className="mx-auto max-w-content px-4 py-6">
          <h2 className="border-b border-slate-200 pb-2 text-2xl font-black text-slate-900">Players to watch</h2>
          <div className="mt-4 space-y-6">
            {[
              { team: away, players: awayPlayers },
              { team: home, players: homePlayers },
            ]
              .filter((x) => x.players.length > 0)
              .map(({ team, players }) => (
                <div key={team.slug}>
                  <div className="flex items-center gap-2">
                    <TeamLogo slug={team.slug} size={24} className="shrink-0" />
                    <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">{team.name}</h3>
                  </div>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {players.map((p) => (
                      <PlayerCard key={p.id} player={p} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* TEAM COMPARISON */}
      <section className="mx-auto max-w-content px-4 py-6">
        <h2 className="border-b border-slate-200 pb-2 text-2xl font-black text-slate-900">Team comparison</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3"> </th>
                <th className="px-4 py-3">{away.shortName}</th>
                <th className="px-4 py-3">{home.shortName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                ["Record", game.awayRecord, game.homeRecord],
                ["Conference", away.conference, home.conference],
                ["Division", away.division, home.division],
                ["Arena", away.arena, home.arena],
                ["Championships", String(away.championships), String(home.championships)],
                ["Founded", String(away.founded), String(home.founded)],
              ].map(([k, a, h]) => (
                <tr key={k}>
                  <td className="px-4 py-3 font-semibold text-slate-500">{k}</td>
                  <td className="px-4 py-3 text-slate-900">{a}</td>
                  <td className="px-4 py-3 text-slate-900">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HOW TO WATCH */}
      <section className="mx-auto max-w-content px-4 py-6">
        <h2 className="border-b border-slate-200 pb-2 text-2xl font-black text-slate-900">How to watch</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <WatchBox title="National TV" items={game.nationalTv ?? []} fallback="No national TV for this game" />
          <WatchBox title="National streaming" items={game.nationalOtt ?? []} fallback="See NBA League Pass" />
          <WatchBox title={`${home.shortName} local TV`} items={game.homeTv ?? []} fallback="Local RSN / League Pass" />
          <WatchBox title={`${away.shortName} local TV`} items={game.awayTv ?? []} fallback="Local RSN / League Pass" />
        </div>
        <Link href="/watch" className="mt-5 inline-block rounded-lg bg-nba-blue px-5 py-3 font-bold text-white transition hover:bg-nba-red">
          Complete legal streaming guide
        </Link>
      </section>

      {/* SAME-DAY GAMES */}
      {sameDay.length > 0 && (
        <section className="mx-auto max-w-content px-4 py-6">
          <h2 className="border-b border-slate-200 pb-2 text-2xl font-black text-slate-900">
            Other games on {formatShortDateIn(game.date, ET)}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sameDay.slice(0, 6).map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}

      {/* UPCOMING */}
      <section className="mx-auto max-w-content px-4 py-6">
        <h2 className="border-b border-slate-200 pb-2 text-2xl font-black text-slate-900">Also coming up</h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          {[
            { team: away, games: awayNext },
            { team: home, games: homeNext },
          ]
            .filter((x) => x.games.length > 0)
            .map(({ team, games }) => (
              <div key={team.slug}>
                <div className="flex items-center gap-2">
                  <TeamLogo slug={team.slug} size={24} className="shrink-0" />
                  <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">
                    {team.name} — next games
                  </h3>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {games.map((g) => (
                    <GameCard key={g.id} game={g} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

function TeamSide({
  team,
  label,
  record,
  align = "left",
}: {
  team: { slug: string; name: string; shortName: string; city: string };
  label: string;
  record?: string;
  align?: "left" | "right";
}) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className={`flex items-center gap-3 hover:text-nba-blue ${align === "right" ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      <TeamLogo slug={team.slug} size={56} className="shrink-0" />
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
        <span className="block text-lg font-black text-slate-900">{team.name}</span>
        {record && <span className="block text-sm text-slate-500">{record} record</span>}
      </span>
    </Link>
  );
}

function Info({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-slate-100 pb-2 sm:border-0 sm:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-slate-900">{children}</dd>
    </div>
  );
}

function KeyItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-card">
      <span aria-hidden="true" className="text-nba-red">
        ▪
      </span>
      <span>{children}</span>
    </li>
  );
}

function WatchBox({
  title,
  items,
  fallback,
}: {
  title: string;
  items: string[];
  fallback: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <h3 className="text-xs font-black uppercase tracking-wide text-nba-blue">{title}</h3>
      {items.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {items.map((i) => (
            <li key={i} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-500">{fallback}</p>
      )}
    </div>
  );
}
