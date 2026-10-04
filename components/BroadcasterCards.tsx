import { BROADCASTERS } from "@/lib/broadcasters";

/** Official national broadcaster cards with direct outbound links.
 *  Shared by the /watch guide and every game page. */
export function BroadcasterCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {BROADCASTERS.map((b) => (
        <a
          key={b.name}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:border-nba-blue hover:shadow-lg"
        >
          <span className="rounded-full bg-nba-red/10 px-2 py-0.5 text-xs font-semibold text-nba-red">
            {b.tag}
          </span>
          <h3 className="mt-2 font-bold text-slate-900 group-hover:text-nba-blue">{b.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{b.note}</p>
          <span className="mt-2 inline-block text-sm font-semibold text-nba-blue">Watch on {b.name} →</span>
        </a>
      ))}
    </div>
  );
}
