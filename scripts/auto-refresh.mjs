// Daily data refresh for nbabite.org — run by the 00:00 automation (and manually if needed).
//
//   node scripts/auto-refresh.mjs
//
// Steps:
//   1. Regenerate lib/games.generated.ts from the NBA feeds (schedule snapshot +
//      live scoreboard + boxscore backfill for anything the snapshot lags on).
//   2. If the data file actually changed: commit and push (triggers the Vercel deploy).
//   3. Ping IndexNow so Bing re-crawls quickly.
//
// The GitHub token lives in scripts/.github-token (untracked) so it never
// lands in the repo or in the automation definition.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = "C:/Users/star/WorkBuddy/2026-07-26-01-41-20/nbabite";
const PROXY = { http_proxy: "http://127.0.0.1:17890", https_proxy: "http://127.0.0.1:17890" };

function run(cmd, extraEnv = {}) {
  return execSync(cmd, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ...extraEnv },
  }).trim();
}

try {
  const now = new Date().toISOString().slice(0, 10);

  // 1. Regenerate
  const genOut = run("node scripts/gen-games.cjs");
  console.log("[gen]\n" + genOut);

  // Fail loudly if the backfill left past games without a result.
  if (/WARNING \d+ past game/i.test(genOut)) {
    console.error("[gen] boxscore backfill left stale games — investigate before pushing");
    process.exit(2);
  }

  // 2. Commit + push only when something changed
  const changed = run("git status --porcelain lib/games.generated.ts");
  if (!changed) {
    console.log("[git] no data changes — nothing to publish");
    process.exit(0);
  }
  run("git add lib/games.generated.ts");
  run(`git commit -m "Daily game data refresh (${now})"`);
  const token = fs.readFileSync(path.join(ROOT, "scripts", ".github-token"), "utf8").trim();
  run(
    `git -c http.sslVerify=false push https://${token}@github.com/LeonaDavinci/nbabite.git master:main`,
    PROXY,
  );
  console.log("[git] pushed — Vercel deploy triggered");

  // 3. IndexNow
  try {
    const idx = run("node scripts/indexnow.mjs");
    console.log("[indexnow]\n" + idx.split("\n").slice(-2).join("\n"));
  } catch (e) {
    console.log("[indexnow] failed (non-fatal): " + String(e.stderr || e.message).slice(0, 200));
  }
} catch (e) {
  console.error("[auto-refresh] FAILED: " + String(e.stderr || e.stdout || e.message).slice(0, 800));
  process.exit(1);
}
