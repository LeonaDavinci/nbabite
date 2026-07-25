import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About NBABite",
  description:
    "NBABite is an independent NBA fan hub built for search: schedules, teams, players and the legal ways to watch. Not affiliated with the NBA.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">About NBABite</h1>
        <p className="mt-4 text-slate-700">
          NBABite is an independent NBA fan destination. We built it to make the league easy to follow: a clean
          schedule, every team, the players people search for most, and a clear guide to watching games legally.
        </p>
        <h2 className="mt-8 text-2xl font-black text-slate-900">What you'll find here</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>An up-to-date <Link href="/schedule" className="font-semibold text-nba-blue hover:underline">NBA schedule</Link> with tip-off times and broadcasters.</li>
          <li>Profiles for <Link href="/teams" className="font-semibold text-nba-blue hover:underline">all 30 teams</Link>, including history, arenas and titles.</li>
          <li>Stats and bios for the biggest <Link href="/players" className="font-semibold text-nba-blue hover:underline">stars</Link> — LeBron James, Stephen Curry, Victor Wembanyama and more.</li>
          <li><Link href="/news" className="font-semibold text-nba-blue hover:underline">News and analysis</Link> written for fans.</li>
          <li>A <Link href="/watch" className="font-semibold text-nba-blue hover:underline">where-to-watch guide</Link> covering every legal option.</li>
        </ul>

        <h2 id="disclaimer" className="mt-10 scroll-mt-24 text-2xl font-black text-slate-900">Disclaimer</h2>
        <p className="mt-3 text-slate-700">
          NBABite is not affiliated with the National Basketball Association, any team, or any broadcaster. All
          team names, logos and player references are trademarks of their respective owners and are used here
          for informational and editorial purposes only. This site does not host, embed or link to unauthorized
          streams. For official broadcasts, please use the licensed providers listed on our watch page.
        </p>
      </section>
    </>
  );
}
