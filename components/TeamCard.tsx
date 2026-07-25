import Link from "next/link";
import { Team } from "@/lib/types";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className="flex h-24 items-center justify-center border-b-4 bg-slate-50"
        style={{ borderColor: team.primaryColor }}
      >
        <img
          src={`/images/teams/${team.slug}.png`}
          alt={`${team.name} logo`}
          className="h-16 w-auto object-contain"
          loading="lazy"
        />
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
