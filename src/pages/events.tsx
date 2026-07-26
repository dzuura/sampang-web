import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { EventCard } from '@/components/event-card'
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api/client'
import type { Event, EventCategory } from '@/types/index'
import { EVENTS } from '@/lib/events-data'

interface EventsResponse {
  data: Event[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

const CATEGORIES: (EventCategory | 'All')[] = ['All', 'Festival', 'Workshop', 'Competition', 'Performance', 'Training']

function EventsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('All')

  // Fetch dynamic events
  const { data: dynamicEventsData, isLoading } = useQuery<EventsResponse>({
    queryKey: ['events', { status: 'published' }],
    queryFn: () =>
      apiClient
        .get('/events', {
          params: { status: 'published', per_page: 20 },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  })

  const apiEvents = dynamicEventsData?.data || []

  // Map API events or fall back to mock events
  const allEvents = useMemo(() => {
    if (apiEvents.length > 0) {
      return apiEvents.map((e) => ({
        slug: e.slug,
        title: e.title,
        category: e.category,
        date: new Date(e.date_start).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        location: e.location,
        image: e.image_url || '',
        excerpt: e.short_description,
      }))
    }
    return EVENTS
  }, [apiEvents])

  // Filter events based on search query and category
  const filtered = useMemo(() => {
    return allEvents.filter(
      (e) =>
        (cat === 'All' || e.category === cat) &&
        (e.title.toLowerCase().includes(q.toLowerCase()) || e.location.toLowerCase().includes(q.toLowerCase()))
    )
  }, [allEvents, q, cat])

  return (
    <>
      <PageHero
        eyebrow="Programme"
        title="Every performance, workshop & festival."
        description="Browse the full season of Sanggar Pelem — from intimate workshops to the flagship village festival."
      />

      <section className="bg-background py-16">
        <div className="container-page">
          <div className="flex flex-col gap-6 rounded-3xl border border-primary/10 bg-cream p-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex flex-1 items-center gap-3 rounded-full bg-background px-5 py-3 shadow-sm border border-primary/5">
              <Search className="h-4 w-4 text-primary/60" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or place…"
                className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={
                    'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition cursor-pointer ' +
                    (cat === c
                      ? 'bg-primary text-primary-foreground font-bold'
                      : 'border border-primary/15 bg-background text-primary/70 hover:border-gold hover:text-primary')
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {isLoading && apiEvents.length === 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-muted rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full py-24 text-center text-muted-foreground">No events match your search.</p>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={
                  'h-10 w-10 rounded-full text-sm font-medium transition cursor-pointer ' +
                  (n === 1
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-primary/15 text-primary hover:border-gold')
                }
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export { EventsPage }
export default EventsPage
