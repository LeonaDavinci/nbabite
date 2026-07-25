import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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

const BROADCASTERS = [
  { name: "ABC / ESPN", note: "Marquee national games, primetime and the NBA Finals on ABC.", tag: "National TV" },
  { name: "NBC", note: "Returned to NBA coverage with a new Sunday night franchise package.", tag: "National TV" },
  { name: "TNT", note: "Tuesday and Thursday night games plus Inside the NBA.", tag: "National TV" },
  { name: "Amazon Prime Video", note: "New national streaming carrier for select games and playoffs.", tag: "Streaming" },
  { name: "NBA TV", note: "The league's 24/7 channel with live games and analysis.", tag: "League" },
];

const LIVE_TV = [
  { name: "NBA League Pass", note: "The league's official out-of-market streaming service for every game not subject to blackout.", id: "league-pass" },
  { name: "YouTube TV", note: "Live TV bundle carrying ABC, ESPN, TNT and more." },
  { name: "Hulu + Live TV", note: "Live TV bundle with Disney/ESPN networks included." },
  { name: "Sling TV", note: "Flexible, lower-cost live TV with sports add-ons." },
  { name: "FuboTV", note: "Sports-forward live TV bundle with ABC, ESPN and regional options." },
];

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

        {/* National broadcasters */}
        <h2 id="broadcasters" className="mt-10 scroll-mt-24 text-2xl font-black text-nba-blue">
          National Broadcasters
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BROADCASTERS.map((b) => (
            <div key={b.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
              <span className="rounded-full bg-nba-red/10 px-2 py-0.5 text-xs font-semibold text-nba-red">{b.tag}</span>
              <h3 className="mt-2 font-bold text-slate-900">{b.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{b.note}</p>
            </div>
          ))}
        </div>

        {/* Live TV bundles */}
        <h2 className="mt-10 text-2xl font-black text-nba-blue">Live TV Streaming Bundles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {LIVE_TV.map((s) => (
            <div key={s.name} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
              <h3 className="font-bold text-slate-900">{s.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.note}</p>
            </div>
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
