import { PageHero } from '@/components/page-hero'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import apiClient from '@/lib/api/client'
import type { Dance } from '@/types/index'

interface DancesResponse {
  data: Dance[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

function DancesPage() {
  const { data, isLoading } = useQuery<DancesResponse>({
    queryKey: ['dances', { status: 'published' }],
    queryFn: () =>
      apiClient
        .get('/dances', {
          params: { status: 'published', per_page: 20 },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  })

  const dances = data?.data || []

  return (
    <>
      <PageHero
        eyebrow="Our Repository"
        title="Classical & Folk Dances"
        description="Explore our collection of traditional Indonesian dances with detailed descriptions, choreography, and cultural significance."
      />

      <div className="container-page py-20">
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-64 bg-muted rounded-lg animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : dances.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dances.map((dance) => (
              <Link key={dance.slug} to="/dances/$slug" params={{ slug: dance.slug }} className="group">
                <div className="rounded-lg overflow-hidden mb-4 bg-muted aspect-square">
                  {dance.thumbnail_url && (
                    <img
                      src={dance.thumbnail_url}
                      alt={dance.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{dance.name}</h3>
                <p className="text-sm text-muted-foreground">{dance.origin}</p>
                <div className="mt-3 text-xs font-semibold text-primary">{dance.difficulty}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No dances available at this time.</p>
          </div>
        )}
      </div>
    </>
  )
}

export { DancesPage }
