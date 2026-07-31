import { Link } from '@/i18n/navigation';

export type BreadcrumbItem = { name: string; href?: string };

// Visible breadcrumb trail — pairs with buildBreadcrumbSchema (JsonLd) on the
// page itself. Per the SEO spec, every internal page except the homepage
// should show one, e.g. "Головна → Аналітика → Звіти → ...".
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--ink3)]">
      {items.map((item, i) => (
        <span key={item.name} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[var(--ink3)]">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-[var(--ink)]">
              {item.name}
            </Link>
          ) : (
            <span className="text-[var(--ink2)]">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
