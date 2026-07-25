import Link from "next/link";
import { Team } from "@/lib/types";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className="flex h-20 items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})` }}
      >
        <span className="text-2xl font-black tracking-widest text-white drop-shadow">
          {team.shortName}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 group-hover:text-nba-blue">{team.name}</h3>
        <p className="mt-1 text-xs text-slate-500">
          {team.city} · {team.conference} · {team.division}
        </p>
        <p className="mt-2 text-xs font-semibold text-slate-600">
          🏆 {team.championships} title{team.championships === 1 ? "" : "s"}
        </p>
      </div>
    </Link>
  );
}
