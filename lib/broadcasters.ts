// Official NBA broadcast partners — shared by the /watch guide and every game page.
// `href` must always point at an official, legal destination.
export interface Broadcaster {
  name: string;
  note: string;
  tag: string;
  href: string;
}

export const BROADCASTERS: Broadcaster[] = [
  {
    name: "ABC / ESPN",
    note: "Marquee national games, primetime and the NBA Finals on ABC.",
    tag: "National TV",
    href: "https://www.espn.com/nba/",
  },
  {
    name: "NBC",
    note: "Returned to NBA coverage with a new Sunday night franchise package.",
    tag: "National TV",
    href: "https://www.nbcsports.com/nba",
  },
  {
    name: "TNT",
    note: "Tuesday and Thursday night games plus Inside the NBA.",
    tag: "National TV",
    href: "https://www.tntdrama.com/",
  },
  {
    name: "Amazon Prime Video",
    note: "New national streaming carrier for select games and playoffs.",
    tag: "Streaming",
    href: "https://www.primevideo.com/",
  },
  {
    name: "NBA TV",
    note: "The league's 24/7 channel with live games and analysis.",
    tag: "League",
    href: "https://www.nba.com/watch/nba-tv",
  },
];

export interface StreamingOption {
  name: string;
  note: string;
  href: string;
}

export const LIVE_TV: StreamingOption[] = [
  {
    name: "NBA League Pass",
    note: "The league's official out-of-market streaming service for every game not subject to blackout.",
    href: "https://www.nba.com/leaguepass",
  },
  {
    name: "YouTube TV",
    note: "Live TV bundle carrying ABC, ESPN, TNT and more.",
    href: "https://tv.youtube.com/",
  },
  {
    name: "Hulu + Live TV",
    note: "Live TV bundle with Disney/ESPN networks included.",
    href: "https://www.hulu.com/live-tv",
  },
  {
    name: "Sling TV",
    note: "Flexible, lower-cost live TV with sports add-ons.",
    href: "https://www.sling.com/",
  },
  {
    name: "FuboTV",
    note: "Sports-forward live TV bundle with ABC, ESPN and regional options.",
    href: "https://www.fubo.tv/",
  },
];
