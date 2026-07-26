import { ChevronRight } from 'lucide-react'

export function PageHero({
  eyebrow,
  title,
  description,
  pathname = '/',
}: {
  eyebrow: string
  title: string
  description?: string
  pathname?: string
}) {
  const crumbs = pathname.split('/').filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 10%, var(--gold) 0 2px, transparent 3px), radial-gradient(circle at 80% 90%, var(--terracotta) 0 2px, transparent 3px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />
      <div className="container-page relative">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <a href="/" className="hover:text-primary">
            Home
          </a>
          {crumbs.map((c, i) => (
            <span key={c + i} className="flex items-center gap-2 capitalize">
              <ChevronRight className="h-3 w-3 text-gold" />
              <span className={i === crumbs.length - 1 ? 'text-primary' : ''}>
                {decodeURIComponent(c).replace(/-/g, ' ')}
              </span>
            </span>
          ))}
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] text-primary sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  )
}
