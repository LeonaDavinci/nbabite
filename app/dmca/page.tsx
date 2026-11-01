import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Copyright & DMCA Policy",
  description:
    "NBABite hosts no game footage or audio. Our copyright policy, takedown requirements and counter-notification process for rights holders.",
  alternates: { canonical: "/dmca" },
};

export default function DmcaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Copyright & DMCA" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h1 className="text-3xl font-black text-slate-900 md:text-4xl">Copyright &amp; DMCA Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: 31 October 2026</p>

        <p className="mt-5 text-slate-700">
          NBABite respects the intellectual property rights of the NBA, its teams and its broadcast partners. This
          page explains exactly what this site does and does not publish, and how rights holders can reach us.
        </p>

        <h2 className="mt-8 text-2xl font-black text-slate-900">1. What this site is</h2>
        <p className="mt-3 text-slate-700">
          NBABite is a text-based reference and fan-information site. We publish:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>Factual schedule data: dates, tip-off times, venues, team records and the name of the network carrying each game.</li>
          <li>Original editorial: previews, results summaries and a guide to the licensed ways to watch NBA basketball.</li>
          <li>Outbound links to official broadcasters and to NBA League Pass, the league&apos;s own streaming product.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-black text-slate-900">2. What this site does not publish</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>
            <strong>No game footage of any kind.</strong> We do not host, upload, embed, mirror, proxy or stream live
            or recorded broadcasts, condensed games, highlights, NBA TV programming or any audio play-by-play.
          </li>
          <li>
            <strong>No links to unauthorized streams.</strong> Every outbound link points to a broadcaster&apos;s own
            website, the league&apos;s official properties, or a licensed pay-TV service.
          </li>
          <li>
            <strong>No third-party logos or photographs.</strong> Team identity is shown with original geometric
            badges drawn for this site — a colour field, an abstract shape and a three-letter code. We host no club
            logos, league marks, broadcast graphics or player headshots, and nothing on the site is a redraw of an
            official mark.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          Team and player names, scores and fixture details are factual information. They appear for identification
          and commentary only, and NBABite is not affiliated with, endorsed by or sponsored by the NBA or any club.
        </p>

        <h2 className="mt-8 text-2xl font-black text-slate-900">3. Sending a takedown notice</h2>
        <p className="mt-3 text-slate-700">
          Notices reach the site operator through the public WHOIS contact record for <strong>nbabite.org</strong>
          {" "}(the registrar forwards messages sent to the privacy-protected address), or through the search engine or
          platform on which the page was found — those notices are passed on to us. To be actionable under 17 U.S.C.
          § 512(c)(3), a notice should include:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
          <li>A physical or electronic signature of the copyright owner or an authorized agent.</li>
          <li>Identification of the copyrighted work you say is infringed.</li>
          <li>
            The exact URL(s) on this site and enough detail for us to locate the material — please note that a page
            describing a fixture is not the same thing as a recording of it.
          </li>
          <li>Your name, address, telephone number and email address.</li>
          <li>
            A statement that you have a good-faith belief the use is not authorized by the copyright owner, its agent
            or the law.
          </li>
          <li>
            A statement, under penalty of perjury, that the information in the notice is accurate and that you are the
            owner or are authorized to act on the owner&apos;s behalf.
          </li>
        </ol>
        <p className="mt-3 text-slate-700">
          We review every complete notice and remove or disable access to material that we confirm is infringing,
          normally within two business days. Incomplete or bulk notices that do not identify specific protected works
          may be returned for clarification.
        </p>

        <h2 className="mt-8 text-2xl font-black text-slate-900">4. Counter-notification</h2>
        <p className="mt-3 text-slate-700">
          If your material was removed and you believe that was a mistake or misidentification, you may send a
          counter-notice through the same contact channel. It must include your signature, identification of the removed material
          and its prior location, a statement under penalty of perjury that you have a good-faith belief the material
          was removed by mistake, your name, address and phone number, and consent to the jurisdiction of the federal
          district court for your address (or, if outside the United States, any judicial district in which we may be
          found). We will forward a valid counter-notice to the complainant and may restore the material after ten
          business days unless we receive notice of a court action.
        </p>

        <h2 className="mt-8 text-2xl font-black text-slate-900">5. Repeat infringers</h2>
        <p className="mt-3 text-slate-700">
          Accounts and contributors who repeatedly upload infringing material are blocked. Because NBABite does not
          accept user-uploaded media, this policy applies mainly to editorial submissions.
        </p>

        <h2 className="mt-8 text-2xl font-black text-slate-900">6. More information</h2>
        <p className="mt-3 text-slate-700">
          See our <Link href="/about#disclaimer" className="font-semibold text-nba-blue hover:underline">disclaimer</Link>{" "}
          and the <Link href="/watch" className="font-semibold text-nba-blue hover:underline">licensed where-to-watch guide</Link>.
          Nothing on this page is legal advice.
        </p>
      </section>
    </>
  );
}
