import { ArrowUpRight, MapPin, Calendar } from 'lucide-react'

export interface EventItem {
  slug: string
  title: string
  image: string
  category: 'Festival' | 'Workshop' | 'Competition' | 'Performance' | 'Training'
  date: string
  location: string
  excerpt: string
}

export function EventCard({ event }: { event: EventItem }) {
  return (
    <a
      href={`/events/${event.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-[0_1px_0_rgba(93,64,55,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-terracotta backdrop-blur">
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gold" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            {event.location}
          </span>
        </div>
        <h3 className="font-display text-2xl leading-snug text-primary">{event.title}</h3>
        <p className="text-sm text-muted-foreground">{event.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-primary">Read more</span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/15 text-primary transition group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  )
}
