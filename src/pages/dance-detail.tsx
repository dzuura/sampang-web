import { useParams, Link } from '@tanstack/react-router'

import { PageHero } from '@/components/page-hero'
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api/client'
import { ErrorPage } from '@/components/error-page'
import type { Dance } from '@/types/index'

interface DanceDetailResponse {
  data: Dance
}

function DanceDetailPage() {
  const { slug } = useParams({ from: '/dances/$slug' })

  const { data, isLoading, error } = useQuery<DanceDetailResponse>({
    queryKey: ['dance', slug],
    queryFn: () => apiClient.get(`/dances/${slug}`).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  })

  if (error) {
    return (
      <ErrorPage
        title="Dance Not Found"
        description="The dance you are looking for could not be found."
        statusCode={404}
      />
    )
  }

  if (isLoading) {
    return (
      <>
        <PageHero eyebrow="Loading..." title="Dance Details" description="" />
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

  const dance = data?.data
  if (!dance) return <ErrorPage />

  return (
    <>
      <PageHero eyebrow="Our Repository" title={dance.name} description={dance.origin} />

      <div className="container-page py-20">
        {dance.thumbnail_url && (
          <div className="mb-12 rounded-lg overflow-hidden aspect-video bg-muted">
            <img src={dance.thumbnail_url} alt={dance.name} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-8">
            {dance.description && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-lg text-muted-foreground whitespace-pre-wrap">{dance.description}</p>
              </div>
            )}

            {dance.history && (
              <div>
                <h2 className="text-2xl font-bold mb-4">History</h2>
                <p className="text-lg text-muted-foreground whitespace-pre-wrap">{dance.history}</p>
              </div>
            )}

            {dance.philosophy && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Philosophy & Meaning</h2>
                <p className="text-lg text-muted-foreground whitespace-pre-wrap">{dance.philosophy}</p>
              </div>
            )}

            {dance.costume_description && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Costume & Appearance</h2>
                <p className="text-lg text-muted-foreground whitespace-pre-wrap">{dance.costume_description}</p>
              </div>
            )}


            {/* Videos */}
            {(() => {
              const videos = (Array.isArray(dance.videos) 
                ? dance.videos 
                : Object.values(dance.videos || {})
              ).filter((vid: any) => {
                if (!vid) return false;
                const url = typeof vid === 'string' ? vid : vid?.url;
                return url && url.trim() !== '';
              });

              if (videos.length === 0) return null;

              return (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Videos</h2>
                  <div className="space-y-4">
                    {videos.map((video: any, idx: number) => {
                      const videoUrl = typeof video === 'string' ? video : video?.url;
                      const videoTitle = typeof video === 'string' ? `Video ${idx + 1}` : (video?.title || `Video ${idx + 1}`);
                      return (
                        <div key={idx}>
                          <p className="font-semibold mb-2">{videoTitle}</p>
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Watch on YouTube →
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="space-y-6">
            {dance.difficulty && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">DIFFICULTY</p>
                <p className="text-lg font-semibold capitalize">{dance.difficulty}</p>
              </div>
            )}

            {dance.duration_minutes && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">DURATION</p>
                <p className="text-lg font-semibold">{dance.duration_minutes} minutes</p>
              </div>
            )}

            {dance.number_of_dancers && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">DANCERS</p>
                <p className="text-lg font-semibold">{dance.number_of_dancers}</p>
              </div>
            )}



            {/* Related Events */}
            {dance.related_events && dance.related_events.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">FEATURED IN EVENTS</p>
                <div className="space-y-2">
                  {dance.related_events.map((event) => (
                    <Link
                      key={event.id}
                      to="/events/$slug"
                      params={{ slug: event.slug }}
                      className="block text-sm font-semibold text-primary hover:underline"
                    >
                      {event.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export { DanceDetailPage }
