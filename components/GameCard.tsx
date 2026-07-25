import Link from "next/link";
import { Game } from "@/lib/types";
import { getTeam } from "@/lib/data";
import { formatDateTime } from "@/lib/format";

export function GameCard({ game }: { game: Game }) {
  const home = getTeam(game.homeTeamSlug);
  const away = getTeam(game.awayTeamSlug);
  if (!home || !away) return null;
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>{formatDateTime(game.date)}</span>
        <span className="rounded-full bg-nba-blue/10 px-2 py-0.5 text-nba-blue">vs</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link href={`/teams/${away.slug}`} className="flex items-center gap-2 hover:text-nba-blue">
          <span className="font-black text-slate-400">{away.shortName}</span>
          <span className="text-sm font-semibold">{away.city}</span>
        </Link>
        <span className="text-xs text-slate-400">@</span>
        <Link href={`/teams/${home.slug}`} className="flex items-center gap-2 hover:text-nba-blue">
          <span className="text-sm font-semibold">{home.city}</span>
          <span className="font-black text-slate-400">{home.shortName}</span>
        </Link>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-500">📺 {game.broadcast}</span>
        <Link href="/watch" className="font-semibold text-nba-red hover:underline">
          How to watch →
        </Link>
      </div>
    </div>
  );
}
