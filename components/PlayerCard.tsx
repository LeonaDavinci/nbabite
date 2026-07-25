import Link from "next/link";
import { Player } from "@/lib/types";
import { getTeam } from "@/lib/data";
import { TeamLogo } from "@/components/TeamLogo";

export function PlayerCard({ player }: { player: Player }) {
  const team = getTeam(player.teamSlug);
  return (
    <Link
      href={`/players/${player.slug}`}
      className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-black text-white"
          style={{ background: team?.primaryColor ?? "#1D428A" }}
        >
          {player.firstName[0]}
          {player.lastName[0]}
        </span>
        <div>
          <h3 className="font-bold leading-tight text-slate-900 group-hover:text-nba-blue">{player.name}</h3>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            {team && <TeamLogo slug={team.slug} size={18} className="shrink-0" />}
            {team?.name} · #{player.jersey}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <Stat label="PPG" value={player.ppg} />
        <Stat label="RPG" value={player.rpg} />
        <Stat label="APG" value={player.apg} />
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-slate-50 py-2">
      <div className="text-sm font-bold text-slate-900">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
