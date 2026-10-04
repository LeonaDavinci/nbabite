// Generator: NBA official schedule JSON -> lib/games.generated.ts
// Run:  node scripts/gen-games.cjs
const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/star/WorkBuddy/2026-07-26-01-41-20/nbabite";
const CACHE = path.join(ROOT, ".tmp-schedule.json");
const OUT = path.join(ROOT, "lib", "games.generated.ts");
const H = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.nba.com/",
};

const TRICODE_TO_SLUG = {
  ATL: "hawks", BOS: "celtics", BKN: "nets", CHA: "hornets", CHI: "bulls",
  CLE: "cavaliers", DAL: "mavericks", DEN: "nuggets", DET: "pistons", GSW: "warriors",
  HOU: "rockets", IND: "pacers", LAC: "clippers", LAL: "lakers", MEM: "grizzlies",
  MIA: "heat", MIL: "bucks", MIN: "timberwolves", NOP: "pelicans", NYK: "knicks",
  OKC: "thunder", ORL: "magic", PHI: "76ers", PHX: "suns", POR: "blazers",
  SAC: "kings", SAS: "spurs", TOR: "raptors", UTA: "jazz", WAS: "wizards",
};

const FROM = Date.parse("2026-10-20T00:00:00Z");
const TO = Date.parse("2026-11-02T00:00:00Z"); // through Nov 1 (end of Week 2)

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

async function load() {
  if (fs.existsSync(CACHE)) return JSON.parse(fs.readFileSync(CACHE, "utf8"));
  const r = await fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json", { headers: H });
  const t = await r.text();
  fs.writeFileSync(CACHE, t);
  return JSON.parse(t);
}

(async () => {
  const j = await load();
  const all = [];
  for (const d of j.leagueSchedule.gameDates) for (const g of d.games) all.push(g);

  const picked = all
    .filter((g) => String(g.gameId).startsWith("002"))
    .filter((g) => {
      const t = Date.parse(g.gameDateTimeUTC);
      return t >= FROM && t < TO;
    })
    .sort((a, b) => Date.parse(a.gameDateTimeUTC) - Date.parse(b.gameDateTimeUTC));

  const games = [];
  const skipped = [];
  for (const g of picked) {
    const home = TRICODE_TO_SLUG[g.homeTeam.teamTricode];
    const away = TRICODE_TO_SLUG[g.awayTeam.teamTricode];
    if (!home || !away) { skipped.push(g.gameCode); continue; }

    const b = g.broadcasters || {};
    const nationalTv = uniq((b.nationalTvBroadcasters || []).map((x) => x.broadcasterDisplay));
    const nationalOtt = uniq((b.nationalOttBroadcasters || []).map((x) => x.broadcasterDisplay));
    const homeTv = uniq((b.homeTvBroadcasters || []).map((x) => x.broadcasterDisplay));
    const awayTv = uniq((b.awayTvBroadcasters || []).map((x) => x.broadcasterDisplay));
    const radio = uniq((b.nationalRadioBroadcasters || []).map((x) => x.broadcasterDisplay));

    const broadcast = nationalTv.length
      ? nationalTv.join(" / ")
      : nationalOtt.length
        ? nationalOtt.join(" / ")
        : "NBA League Pass";

    const dateOnly = g.gameDateTimeUTC.slice(0, 10);
    const label = g.gameLabel ? String(g.gameLabel).trim() : "";
    const sub = g.gameSubLabel ? String(g.gameSubLabel).trim() : "";

    games.push({
      id: `${away}-at-${home}-${dateOnly}`,
      gameId: String(g.gameId),
      gameCode: String(g.gameCode),
      homeTeamSlug: home,
      awayTeamSlug: away,
      date: g.gameDateTimeUTC,
      status: "scheduled",
      arena: g.arenaName,
      arenaCity: g.arenaCity || "",
      arenaState: g.arenaState || "",
      broadcast,
      nationalTv,
      nationalOtt,
      homeTv,
      awayTv,
      radio,
      homeRecord: `${g.homeTeam.wins}-${g.homeTeam.losses}`,
      awayRecord: `${g.awayTeam.wins}-${g.awayTeam.losses}`,
      label: [label, sub].filter(Boolean).join(" — "),
      week: g.weekName || "",
    });
  }

  const stamp = new Date().toISOString();
  const jstr = JSON.stringify;
  const body = games
    .map((g) => {
      const lines = [
        `    id: ${jstr(g.id)},`,
        `    gameId: ${jstr(g.gameId)},`,
        `    gameCode: ${jstr(g.gameCode)},`,
        `    homeTeamSlug: ${jstr(g.homeTeamSlug)},`,
        `    awayTeamSlug: ${jstr(g.awayTeamSlug)},`,
        `    date: ${jstr(g.date)},`,
        `    status: "scheduled",`,
        `    arena: ${jstr(g.arena)},`,
        `    arenaCity: ${jstr(g.arenaCity)},`,
        `    arenaState: ${jstr(g.arenaState)},`,
        `    broadcast: ${jstr(g.broadcast)},`,
        `    nationalTv: ${jstr(g.nationalTv)},`,
        `    nationalOtt: ${jstr(g.nationalOtt)},`,
        `    homeTv: ${jstr(g.homeTv)},`,
        `    awayTv: ${jstr(g.awayTv)},`,
        `    radio: ${jstr(g.radio)},`,
        `    homeRecord: ${jstr(g.homeRecord)},`,
        `    awayRecord: ${jstr(g.awayRecord)},`,
        `    label: ${jstr(g.label)},`,
        `    week: ${jstr(g.week)},`,
      ];
      return "  {\n" + lines.join("\n") + "\n  },";
    })
    .join("\n");

  const out = `// AUTO-GENERATED — do not edit by hand.
// Source: NBA.com official schedule (cdn.nba.com scheduleLeagueV2, season 2026-27).
// Regenerate with: node scripts/gen-games.cjs
// Generated: ${stamp}
// Range: 2026-10-20 .. 2026-11-01 (Weeks 1-2 of the 2026-27 regular season)
import { Game } from "./types";

export const GAMES: Game[] = [
${body}
];
`;
  fs.writeFileSync(OUT, out);
  console.log("wrote " + OUT);
  console.log("games=" + games.length + " skipped(no slug)=" + skipped.length + " " + JSON.stringify(skipped.slice(0, 10)));
  console.log("national-tv games=" + games.filter((g) => g.nationalTv.length).length);
})();
