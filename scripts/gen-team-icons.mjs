// Generates the 128x128 team icons used across the site.
//
// These are ORIGINAL badges drawn by this script (rounded-square, club colour
// gradient, geometric watermark, three-letter code). They are deliberately not
// reproductions or redraws of the NBA/club marks: the site was hit by a DMCA
// notice that specifically listed "all associated team logos", so nothing here
// may copy an official mark.
//
// Run: node scripts/gen-team-icons.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "C:/Users/star/WorkBuddy/2026-07-26-01-41-20/nbabite";
const OUT_DIR = path.join(ROOT, "public", "images", "teams");
const SIZE = 128;

const src = fs.readFileSync(path.join(ROOT, "lib", "data.ts"), "utf8");
const TEAMS = [
  ...src.matchAll(
    /\{ id: "([^"]+)", slug: "([^"]+)", name: "([^"]+)", shortName: "([^"]+)", city: "([^"]+)", state: "([^"]+)", conference: "[^"]+", division: "[^"]+", founded: \d+, arena: "[^"]*", championships: \d+, primaryColor: "([^"]+)", secondaryColor: "([^"]+)"/g,
  ),
].map((m) => ({ slug: m[2], name: m[3], code: m[4], primary: m[7], secondary: m[8] }));

if (TEAMS.length !== 30) {
  console.error(`Expected 30 teams, parsed ${TEAMS.length}`);
  process.exit(1);
}

/* ---------- colour helpers ---------- */
const hex = (h) => {
  const s = h.replace("#", "");
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
};
const rgb = (a) => "#" + a.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const lum = (a) => (0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]) / 255;

/* ---------- geometric watermarks (original, abstract) ---------- */
const MOTIFS = [
  // chevrons
  `<path d="M-10 96 L64 40 L138 96" fill="none" stroke="white" stroke-width="14"/>
   <path d="M-10 124 L64 68 L138 124" fill="none" stroke="white" stroke-width="14"/>`,
  // rings
  `<circle cx="64" cy="64" r="52" fill="none" stroke="white" stroke-width="9"/>
   <circle cx="64" cy="64" r="33" fill="none" stroke="white" stroke-width="9"/>`,
  // peaks
  `<path d="M-8 116 L30 58 L58 92 L86 40 L136 116 Z" fill="white"/>`,
  // bolt
  `<path d="M74 4 L30 70 L60 70 L48 124 L100 54 L68 54 Z" fill="white"/>`,
  // star
  `<path d="M64 2 L77 46 L124 46 L86 72 L101 118 L64 90 L27 118 L42 72 L4 46 L51 46 Z" fill="white"/>`,
  // hexagon
  `<path d="M64 14 L110 40 L110 90 L64 116 L18 90 L18 40 Z" fill="none" stroke="white" stroke-width="9"/>`,
  // waves
  `<path d="M-10 58 Q22 30 54 58 T118 58 T182 58" fill="none" stroke="white" stroke-width="11"/>
   <path d="M-10 92 Q22 64 54 92 T118 92 T182 92" fill="none" stroke="white" stroke-width="11"/>`,
  // diagonal grid
  `<g stroke="white" stroke-width="8">
     <path d="M-24 24 L24 -24"/><path d="M4 68 L68 4"/><path d="M32 116 L116 32"/><path d="M60 164 L164 60"/>
   </g>`,
  // diamond
  `<path d="M64 6 L122 64 L64 122 L6 64 Z" fill="none" stroke="white" stroke-width="10"/>
   <path d="M64 34 L94 64 L64 94 L34 64 Z" fill="white"/>`,
  // orbit
  `<g fill="none" stroke="white" stroke-width="9">
     <ellipse cx="64" cy="64" rx="58" ry="26"/>
     <ellipse cx="64" cy="64" rx="58" ry="26" transform="rotate(60 64 64)"/>
     <ellipse cx="64" cy="64" rx="58" ry="26" transform="rotate(120 64 64)"/>
   </g>`,
];

function badge(team, i) {
  const p = hex(team.primary);
  const s = hex(team.secondary);
  // Darken the primary for the gradient, but keep near-black primaries visible.
  const pDark = lum(p) < 0.08 ? mix(p, [255, 255, 255], 0.16) : mix(p, [0, 0, 0], 0.42);
  const accent = lum(s) > 0.5 ? s : mix(s, [255, 255, 255], 0.35);
  const text = lum(p) > 0.62 ? "#101827" : "#ffffff";
  const rot = (i * 23) % 360;
  const motif = MOTIFS[i % MOTIFS.length];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${rgb(p)}"/>
      <stop offset="1" stop-color="${rgb(pDark)}"/>
    </linearGradient>
    <clipPath id="clip"><rect x="3" y="3" width="122" height="122" rx="30"/></clipPath>
  </defs>
  <rect x="3" y="3" width="122" height="122" rx="30" fill="url(#bg)"/>
  <g clip-path="url(#clip)">
    <g opacity="0.17" transform="translate(64 64) rotate(${rot}) translate(-64 -64)">${motif}</g>
    <rect x="3" y="3" width="122" height="122" fill="none"/>
    <path d="M0 0 L128 0 L128 26 Q64 62 0 26 Z" fill="${rgb(accent)}" opacity="0.22"/>
  </g>
  <rect x="4" y="4" width="120" height="120" rx="29" fill="none" stroke="rgba(255,255,255,0.34)" stroke-width="2"/>
  <text x="64" y="80" text-anchor="middle"
        font-family="Segoe UI, Inter, Arial, Helvetica, sans-serif"
        font-size="${team.code.length > 3 ? 34 : 38}" font-weight="800" letter-spacing="0.5"
        fill="${text}" opacity="0.97">${team.code}</text>
</svg>`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (let i = 0; i < TEAMS.length; i++) {
  const t = TEAMS[i];
  const svg = badge(t, i);
  await sharp(Buffer.from(svg))
    .resize(SIZE, SIZE)
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(OUT_DIR, `${t.slug}.png`));
}
console.log(`wrote ${TEAMS.length} icons to ${OUT_DIR}`);

/* ---------- contact sheet for visual review ---------- */
const CELL = 96;
const COLS = 6;
const rows = Math.ceil(TEAMS.length / COLS);
const composites = await Promise.all(
  TEAMS.map(async (t, i) => ({
    input: await sharp(path.join(OUT_DIR, `${t.slug}.png`)).resize(CELL - 16, CELL - 16).toBuffer(),
    left: (i % COLS) * CELL + 8,
    top: Math.floor(i / COLS) * CELL + 8,
  })),
);
await sharp({
  create: {
    width: COLS * CELL,
    height: rows * CELL,
    channels: 3,
    background: { r: 248, g: 250, b: 252 },
  },
})
  .composite(composites)
  .png()
  .toFile(path.join(ROOT, ".team-icons-preview.png"));
console.log("preview: .team-icons-preview.png");
