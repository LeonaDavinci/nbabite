import { Player } from "@/lib/types";
import { getTeam } from "@/lib/data";

export function PlayerAvatar({
  player,
  size = 24,
  className = "",
}: {
  player: Player;
  size?: number;
  className?: string;
}) {
  if (player.headshot) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={player.headshot}
        alt={`${player.name} headshot`}
        width={size}
        height={size}
        loading="lazy"
        className={`shrink-0 rounded-full object-cover ring-1 ring-slate-200 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  const team = getTeam(player.teamSlug);
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-black text-white"
      style={{
        width: size,
        height: size,
        background: team?.primaryColor ?? "#1D428A",
        fontSize: Math.round(size * 0.4),
      }}
    >
      {player.firstName[0]}
      {player.lastName[0]}
    </span>
  );
}
