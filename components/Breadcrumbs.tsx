import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-content px-4 py-3 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.href && i !== items.length - 1 ? (
              <Link href={item.href} className="hover:text-nba-blue hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-700" aria-current={i === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {i !== items.length - 1 && <span className="text-slate-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
