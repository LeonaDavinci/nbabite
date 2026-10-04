// Scan built .next/server/app/**/*.html for <meta name="description"> lengths.
// Flags anything outside Bing/Google's 25-160 char window.
const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/star/WorkBuddy/2026-07-26-01-41-20/nbabite/.next/server/app";
const re = /<meta name="description" content="([^"]*)"/g;

let bad = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!e.name.endsWith(".html")) continue;
    const html = fs.readFileSync(p, "utf8");
    let m;
    while ((m = re.exec(html)) !== null) {
      // Decode HTML entities first — the attribute source may be escaped
      // (e.g. ' -> &#x27;) which inflates the raw length.
      const text = m[1]
        .replace(/&#x27;|&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
      const len = text.length;
      const ok = len >= 25 && len <= 160;
      const rel = path.relative(ROOT, p).replace(/\\/g, "/");
      if (!ok) bad++;
      console.log((ok ? "OK  " : "BAD ") + "[" + String(len).padStart(3) + "] " + rel);
    }
  }
}
if (!fs.existsSync(ROOT)) { console.log("NO BUILD OUTPUT at " + ROOT); process.exit(1); }
walk(ROOT);
console.log(bad === 0 ? "\nALL DESCRIPTIONS WITHIN 25-160" : "\n" + bad + " OUT OF RANGE");
