// Generator: NBA official schedule JSON -> lib/games.generated.ts
// Run:  node scripts/gen-games.cjs [--days-ahead=N]
//
// Sources (both official NBA CDN, browser UA required):
//   - staticData/scheduleLeagueV2_1.json          -> full 2026-27 schedule + gameStatus/scores
//   - liveData/scoreboard/todaysScoreboard_00.json -> live scores for games in progress
//
// The schedule file's score for an in-progress game lags (often 0-0), so live
// entries are overlaid with the scoreboard feed.
const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/star/WorkBuddy/2026-07-26-01-41-20/nbabite";
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

// Season opener is fixed; the window always starts there so recent results stay on the site.
const FROM = Date.parse("2026-10-20T00:00:00Z");
const daysAheadArg = process.argv.find((a) => a.startsWith("--days-ahead="));
const DAYS_AHEAD = daysAheadArg ? Number(daysAheadArg.split("=")[1]) : 41; // through Nov 30
const TO = Date.now() + DAYS_AHEAD * 24 * 3600 * 1000;

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}
const clean = (s) => String(s || "").replace(/\s+/g, " ").trim();

function statusOf(g) {
  const n = Number(g.gameStatus);
  if (n === 3) return "final";
  if (n === 2) return "live";
  return "scheduled";
}

async function getJson(url) {
  const r = await fetch(url, { headers: H });
  if (!r.ok) throw new Error(`${url} -> HTTP ${r.status}`);
  return JSON.parse(await r.text());
}

(async () => {
  const sched = await getJson("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json");

  // Live overlay (today's games only). Non-fatal if it fails.
  let live = {};
  try {
    const sb = await getJson("https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json");
    for (const g of sb.scoreboard?.games || []) live[String(g.gameId)] = g;
    console.log("scoreboard games=" + Object.keys(live).length);
  } catch (e) {
    console.log("scoreboard unavailable (" + e.message + ") — live scores from schedule file only");
  }

  const all = [];
  for (const d of sched.leagueSchedule.gameDates) for (const g of d.games) all.push(g);

  const games = [];
  const skipped = [];
  for (const g of all) {
    if (!String(g.gameId).startsWith("002")) continue; // regular season only (skip preseason/playoffs)
    const t = Date.parse(g.gameDateTimeUTC);
    if (t < FROM || t > TO) continue;

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

    const status = statusOf(g);
    const sb = live[String(g.gameId)];

    // Prefer the live scoreboard feed for in-progress games (schedule JSON lags at 0-0).
    const useSb = sb && (status === "live" || status === "final");
    const homeScore = useSb ? sb.homeTeam?.score ?? g.homeTeam.score : g.homeTeam.score;
    const awayScore = useSb ? sb.awayTeam?.score ?? g.awayTeam.score : g.awayTeam.score;
    const statusText =
      status === "scheduled"
        ? ""
        : clean(useSb ? sb.gameStatusText : g.gameStatusText) || (status === "final" ? "Final" : "Live");

    const leaders = (g.pointsLeaders || []).slice(0, 3).map((p) => ({
      name: `${p.firstName} ${p.lastName}`.trim(),
      teamTricode: p.teamTricode,
      points: Number(p.points) || 0,
    }));

    const dateOnly = g.gameDateTimeUTC.slice(0, 10);
    const label = clean(g.gameLabel);
    const sub = clean(g.gameSubLabel);

    games.push({
      id: `${away}-at-${home}-${dateOnly}`,
      gameId: String(g.gameId),
      gameCode: String(g.gameCode),
      homeTeamSlug: home,
      awayTeamSlug: away,
      date: g.gameDateTimeUTC,
      status,
      statusText,
      homeScore: status === "scheduled" ? null : Number(homeScore) || 0,
      awayScore: status === "scheduled" ? null : Number(awayScore) || 0,
      pointsLeaders: leaders.length ? leaders : null,
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
      week: clean(g.weekName),
    });
  }

  games.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

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
        `    status: ${jstr(g.status)},`,
      ];
      if (g.statusText) lines.push(`    statusText: ${jstr(g.statusText)},`);
      if (g.homeScore !== null) lines.push(`    homeScore: ${g.homeScore},`);
      if (g.awayScore !== null) lines.push(`    awayScore: ${g.awayScore},`);
      if (g.pointsLeaders) lines.push(`    pointsLeaders: ${jstr(g.pointsLeaders)},`);
      lines.push(
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
      );
      return "  {\n" + lines.join("\n") + "\n  },";
    })
    .join("\n");

  const first = games[0]?.date?.slice(0, 10) || "?";
  const last = games[games.length - 1]?.date?.slice(0, 10) || "?";
  const out = `// AUTO-GENERATED — do not edit by hand.
// Source: NBA.com official schedule (cdn.nba.com scheduleLeagueV2) + live scoreboard overlay.
// Regenerate with: node scripts/gen-games.cjs [--days-ahead=N]
// Generated: ${stamp}
// Range: ${first} .. ${last} (${games.length} regular-season games; ${games.filter((g) => g.status === "final").length} final, ${games.filter((g) => g.status === "live").length} live)
import { Game } from "./types";

export const GAMES: Game[] = [
${body}
];
`;
  fs.writeFileSync(OUT, out);
  console.log("wrote " + OUT);
  console.log(
    "games=" + games.length +
    " final=" + games.filter((g) => g.status === "final").length +
    " live=" + games.filter((g) => g.status === "live").length +
    " skipped(no slug)=" + skipped.length +
    " range=" + first + ".." + last,
  );
  console.log("national-tv games=" + games.filter((g) => g.nationalTv.length).length);
})();
