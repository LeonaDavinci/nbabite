import Link from "next/link";
import { Game } from "@/lib/types";
import { getTeam, gameWinner } from "@/lib/data";
import { formatShortDateIn, formatTimeIn } from "@/lib/format";
import { TeamLogo } from "@/components/TeamLogo";

const ET = "America/New_York";

export function GameCard({ game }: { game: Game }) {
  const home = getTeam(game.homeTeamSlug);
  const away = getTeam(game.awayTeamSlug);
  if (!home || !away) return null;

  const isFinal = game.status === "final";
  const isLive = game.status === "live";
  const played = isFinal || isLive;
  const winner = gameWinner(game);
  const when = `${formatShortDateIn(game.date, ET)} · ${formatTimeIn(game.date, ET)} ET`;

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
        <Link href={`/games/${game.id}`} className="truncate hover:text-nba-blue">
          {when}
        </Link>
        {isLive ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-nba-red px-2 py-0.5 font-black uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            {game.statusText || "Live"}
          </span>
        ) : isFinal ? (
          <span className="rounded-full bg-slate-900 px-2 py-0.5 font-black uppercase tracking-wide text-white">
            {game.statusText || "Final"}
          </span>
        ) : (
          <span className="rounded-full bg-nba-blue/10 px-2 py-0.5 text-nba-blue">vs</span>
        )}
      </div>

      <div className="mt-3 space-y-1.5">
        <TeamRow
          slug={away.slug}
          shortName={away.shortName}
          city={away.city}
          record={game.awayRecord}
          score={played ? game.awayScore : null}
          won={winner === "away"}
          dimmed={winner === "home"}
        />
        <TeamRow
          slug={home.slug}
          shortName={home.shortName}
          city={home.city}
          record={game.homeRecord}
          score={played ? game.homeScore : null}
          won={winner === "home"}
          dimmed={winner === "away"}
        />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="truncate pr-2 text-slate-500">📺 {game.broadcast}</span>
        <Link href={`/games/${game.id}`} className="shrink-0 font-semibold text-nba-red hover:underline">
          {isFinal ? "Box score →" : isLive ? "Live now →" : "Game preview →"}
        </Link>
      </div>
    </div>
  );
}

function TeamRow({
  slug,
  shortName,
  city,
  record,
  score,
  won,
  dimmed,
}: {
  slug: string;
  shortName: string;
  city: string;
  record?: string;
  score?: number | null;
  won: boolean;
  dimmed: boolean;
}) {
  return (
    <Link href={`/teams/${slug}`} className="flex items-center gap-2 hover:text-nba-blue">
      <TeamLogo slug={slug} size={26} className="shrink-0" />
      <span className={`w-10 shrink-0 font-black ${dimmed ? "text-slate-400" : "text-slate-700"}`}>
        {shortName}
      </span>
      <span className="truncate text-sm text-slate-500">{city}</span>
      {record && <span className="hidden shrink-0 text-[11px] text-slate-400 sm:inline">{record}</span>}
      {score != null && (
        <span
          className={`ml-auto shrink-0 tabular-nums text-lg font-black ${
            won ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {score}
        </span>
      )}
    </Link>
  );
}
