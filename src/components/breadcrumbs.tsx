import { ChevronRight } from 'lucide-react'

export type BreadcrumbItem = {
  name: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href ?? undefined,
    })),
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={
        'flex items-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground ' +
        (className ?? '')
      }
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-primary/70 transition hover:text-primary"
                >
                  {item.name}
                </a>
              ) : (
                <span
                  className={isLast ? 'text-primary' : 'text-primary/70'}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="h-3 w-3 text-primary/40"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}
