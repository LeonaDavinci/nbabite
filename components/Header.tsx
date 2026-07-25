import Link from "next/link";

const NAV = [
  { href: "/schedule", label: "Schedule" },
  { href: "/teams", label: "Teams" },
  { href: "/players", label: "Players" },
  { href: "/news", label: "News" },
  { href: "/watch", label: "Where to Watch" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="NBABite home">
          <span className="flex h-9 items-center rounded-md border border-slate-200 bg-white px-2">
            <img src="/logo.webp" alt="NBABite" className="h-6 w-auto" />
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-nba-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/watch"
          className="rounded-md bg-nba-blue px-3 py-2 text-sm font-bold text-white transition hover:bg-nba-red"
        >
          Watch NBA
        </Link>
      </div>
      {/* Mobile nav */}
      <nav aria-label="Mobile" className="flex flex-wrap gap-1 border-t border-slate-100 px-3 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
