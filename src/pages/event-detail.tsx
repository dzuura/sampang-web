import { useParams } from '@tanstack/react-router'

import { PageHero } from '@/components/page-hero'
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api/client'
import { ErrorPage } from '@/components/error-page'
import type { Event, EventAgendaItem } from '@/types/index'

interface EventDetailResponse {
  data: Event & {
    agenda: EventAgendaItem[]
    related_dances: Array<{ id: number; slug: string; name: string; thumbnail_url: string }>
  }
}

function EventDetailPage() {
  const { slug } = useParams({ from: '/events/$slug' })

  const { data, isLoading, error } = useQuery<EventDetailResponse>({
    queryKey: ['event', slug],
    queryFn: () => apiClient.get(`/events/${slug}`).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  })

  if (error) {
    return (
      <ErrorPage
        title="Event Not Found"
        description="The event you are looking for could not be found."
        statusCode={404}
      />
    )
  }

  if (isLoading) {
    return (
      <>
        <PageHero eyebrow="Loading..." title="Event Details" description="" />
        <div className="container-page py-20">
          <div className="space-y-4">
            <div className="h-96 bg-muted rounded-lg animate-pulse" />
            <div className="h-8 bg-muted rounded animate-pulse" />
            <div className="h-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </>
    )
  }

  const event = data?.data
  if (!event) return <ErrorPage />

  const eventDate = new Date(event.date_start).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <PageHero eyebrow={event.category} title={event.title} description={event.short_description} />

      <div className="container-page py-20">
        {event.image_url && (
          <div className="mb-12 rounded-lg overflow-hidden aspect-video bg-muted">
            <img src={event.image_url} alt={event.image_alt || event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <div 
                className="text-muted-foreground prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: event.description || '' }} 
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">DATE</p>
              <p className="text-lg font-semibold">{eventDate}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">LOCATION</p>
              <p className="text-lg font-semibold">{event.location}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">CATEGORY</p>
              <p className="text-lg font-semibold">{event.category}</p>
            </div>
          </div>
        </div>

        {event.agenda && event.agenda.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Event Schedule</h2>
            <div className="space-y-4">
              {event.agenda.map((item: EventAgendaItem) => (
                <div key={item.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl font-bold text-primary min-w-fit">{item.time}</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      {item.description && <p className="text-muted-foreground">{item.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {event.related_dances && event.related_dances.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Featured Dances</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.related_dances.map((dance: any) => (
                <a key={dance.id} href={`/dances/${dance.slug}`} className="group">
                  <div className="rounded-lg overflow-hidden mb-4 bg-muted aspect-square">
                    {dance.thumbnail_url && (
                      <img
                        src={dance.thumbnail_url}
                        alt={dance.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{dance.name}</h3>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export { EventDetailPage }
