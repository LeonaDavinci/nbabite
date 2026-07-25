import Link from "next/link";

const COLS = [
  {
    title: "Explore",
    links: [
      { href: "/schedule", label: "NBA Schedule" },
      { href: "/teams", label: "All 30 Teams" },
      { href: "/players", label: "Players & Stars" },
      { href: "/news", label: "Latest News" },
    ],
  },
  {
    title: "Watch",
    links: [
      { href: "/watch", label: "Where to Watch" },
      { href: "/watch#league-pass", label: "NBA League Pass" },
      { href: "/watch#broadcasters", label: "TV Broadcasters" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About NBABite" },
      { href: "/about#disclaimer", label: "Disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 items-center rounded-md bg-nba-red px-2">
              <img src="/logo.webp" alt="NBABite" className="h-5 w-auto" />
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-600">
            An independent NBA fan hub for schedules, teams, players and the legal ways to watch basketball.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-700 hover:text-nba-blue hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} NBABite. Not affiliated with the National Basketball Association. All trademarks are property of their respective owners.
      </div>
    </footer>
  );
}
