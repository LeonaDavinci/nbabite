import { Player } from "@/lib/types";
import { getTeam } from "@/lib/data";

/**
 * Initials-only avatar. Player headshots are third-party photographs
 * (NBA Entertainment / Getty), so we never render them — the previous
 * version shipped two of them in /public/images/players.
 */
export function PlayerAvatar({
  player,
  size = 24,
  className = "",
}: {
  player: Player;
  size?: number;
  className?: string;
}) {
  const team = getTeam(player.teamSlug);
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-black text-white ring-1 ring-black/10 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${team?.primaryColor ?? "#1D428A"}, ${
          team?.secondaryColor ?? "#C8102E"
        })`,
        fontSize: Math.round(size * 0.4),
      }}
    >
      {player.firstName[0]}
      {player.lastName[0]}
    </span>
  );
}
