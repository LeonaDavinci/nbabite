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
}

export interface Game {
  id: string;
  homeTeamSlug: string;
  awayTeamSlug: string;
  date: string;
  status: "scheduled";
  arena: string;
  broadcast: string;
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
}
