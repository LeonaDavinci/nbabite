import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BroadcasterCards } from "@/components/BroadcasterCards";
import { LIVE_TV } from "@/lib/broadcasters";

export const metadata: Metadata = {
  title: "Where to Watch the NBA Legally",
  description:
    "The complete legal guide to watching NBA basketball: NBA League Pass, ESPN, ABC, TNT, NBC, Amazon Prime Video, YouTube TV, Hulu + Live TV, Sling and FuboTV.",
  alternates: { canonical: "/watch" },
  openGraph: {
    title: "Where to Watch the NBA Legally | NBABite",
    description: "Every official way to stream and watch NBA games.",
    url: "/watch",
    type: "website",
  },
};

export default function WatchPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Where to Watch" }]} />
      <section className="mx-auto max-w-content px-4 pb-12">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Where to Watch the NBA</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          NBABite does not host or stream games. Below is the complete guide to the official, legal ways to
          watch NBA basketball and support the league.
        </p>

        {/* League Pass */}
        <h2 id="league-pass" className="mt-10 scroll-mt-24 text-2xl font-black text-nba-blue">
          NBA League Pass
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          The league's official streaming product is the simplest way to follow every team. League Pass delivers
          all out-of-market games on demand and live, with multi-game viewing and condensed replays. Local
          blackouts may apply for in-market games.
        </p>
        <a
          href="https://www.nba.com/leaguepass"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-nba-red px-5 py-3 font-bold text-white transition hover:bg-nba-blue"
        >
          Get NBA League Pass →
        </a>

        {/* National broadcasters */}
        <h2 id="broadcasters" className="mt-10 scroll-mt-24 text-2xl font-black text-nba-blue">
          National Broadcasters
        </h2>
        <div className="mt-4">
          <BroadcasterCards />
        </div>

        {/* Live TV bundles */}
        <h2 className="mt-10 text-2xl font-black text-nba-blue">Live TV Streaming Bundles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {LIVE_TV.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:border-nba-blue hover:shadow-lg"
            >
              <h3 className="font-bold text-slate-900 group-hover:text-nba-blue">{s.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.note}</p>
              <span className="mt-2 inline-block text-sm font-semibold text-nba-blue">Go to {s.name} →</span>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">
          <p>
            <strong className="text-slate-900">Tip:</strong> Most fans combine League Pass with one live-TV
            service that carries ABC and ESPN to cover nationally televised and locally blacked-out games. Always
            use official providers for the best quality and to support the teams and players you love.
          </p>
          <p className="mt-3">
            <Link href="/schedule" className="font-bold text-nba-blue hover:underline">
              See the schedule to find which games are on which network →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
