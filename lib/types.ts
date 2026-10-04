export type Conference = "Eastern" | "Western";

export interface Team {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  conference: Conference;
  division: string;
  founded: number;
  arena: string;
  championships: number;
  primaryColor: string;
  secondaryColor: string;
  description: string;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  teamSlug: string;
  position: string;
  jersey: number;
  height: string;
  weight: string;
  born: string;
  birthplace: string;
  draftYear: number;
  ppg: number;
  rpg: number;
  apg: number;
  bio: string;
  isStar?: boolean;
  headshot?: string;
}

export interface Game {
  id: string;
  /** Official NBA game id (e.g. "0022600001"), scraped from NBA.com. */
  gameId?: string;
  /** Official NBA game code (e.g. "20261020/BOSDET"). */
  gameCode?: string;
  homeTeamSlug: string;
  awayTeamSlug: string;
  /** Tip-off in UTC (ISO 8601). */
  date: string;
  status: "scheduled";
  arena: string;
  arenaCity?: string;
  arenaState?: string;
  /** Primary broadcast string shown on cards. */
  broadcast: string;
  nationalTv?: string[];
  nationalOtt?: string[];
  homeTv?: string[];
  awayTv?: string[];
  radio?: string[];
  homeRecord?: string;
  awayRecord?: string;
  /** Competition label, e.g. "Emirates NBA Cup — East Group C". */
  label?: string;
  week?: string;
  note?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  body: string[];
  tags: string[];
  breaking?: boolean;
}
