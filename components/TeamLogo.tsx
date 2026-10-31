import { getTeam } from "@/lib/data";

/**
 * Team mark rendered as a pure CSS/text monogram.
 *
 * Deliberately NOT an image: the previous implementation shipped NBA club
 * logos in /public/images/teams, which are third-party trademarks/copyrighted
 * artwork. Text monograms in the club's own colour scheme identify the team
 * without reproducing any protected logo asset.
 */
const TRICODE: Record<string, string> = {
  hawks: "ATL",
  celtics: "BOS",
  nets: "BKN",
  hornets: "CHA",
  bulls: "CHI",
  cavaliers: "CLE",
  mavericks: "DAL",
  nuggets: "DEN",
  pistons: "DET",
  warriors: "GSW",
  rockets: "HOU",
  pacers: "IND",
  clippers: "LAC",
  lakers: "LAL",
  grizzlies: "MEM",
  heat: "MIA",
  bucks: "MIL",
  timberwolves: "MIN",
  pelicans: "NOP",
  knicks: "NYK",
  thunder: "OKC",
  magic: "ORL",
  "76ers": "PHI",
  suns: "PHX",
  blazers: "POR",
  kings: "SAC",
  spurs: "SAS",
  raptors: "TOR",
  jazz: "UTA",
  wizards: "WAS",
};

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
  const code = TRICODE[team.slug] ?? team.shortName.slice(0, 3).toUpperCase();
  const fontSize = Math.round(size * (code.length > 2 ? 0.33 : 0.4));
  return (
    <span
      aria-hidden="true"
      title={`${team.name} (${code})`}
      className={`inline-grid shrink-0 select-none place-items-center rounded-[22%] font-black leading-none tracking-tight text-white ring-1 ring-black/10 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize,
        background: `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`,
      }}
    >
      {code}
    </span>
  );
}
