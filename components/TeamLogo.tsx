import { getTeam } from "@/lib/data";

export function TeamLogo({
  slug,
  size = 24,
  className = "",
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const team = getTeam(slug);
  if (!team) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/teams/${team.slug}.png`}
      alt={`${team.name} logo`}
      width={size}
      height={size}
      loading="lazy"
      className={`inline-block object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
