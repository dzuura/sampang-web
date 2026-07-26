import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootLayout } from '@/components/root-layout'
import { EventCard } from '@/components/event-card'
import { PageHero } from '@/components/page-hero'

const queryClient = new QueryClient()

// Sample event data for demonstration
const sampleEvents = [
  {
    slug: 'pelem-festival',
    title: 'Pelem Festival 2025',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=450&fit=crop',
    category: 'Festival' as const,
    date: 'August 15, 2025',
    location: 'Yogyakarta',
    excerpt: 'Join us for an extraordinary celebration of traditional Indonesian dance and cultural heritage.',
  },
  {
    slug: 'dance-workshop',
    title: 'Classical Dance Workshop',
    image: 'https://images.unsplash.com/photo-1535016120754-fd58615ccadd?w=600&h=450&fit=crop',
    category: 'Workshop' as const,
    date: 'August 22, 2025',
    location: 'Sanggar Studio',
    excerpt: 'Learn the fundamentals of classical Indonesian dance from our experienced instructors.',
  },
  {
    slug: 'performance',
    title: 'Evening Performance',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=450&fit=crop',
    category: 'Performance' as const,
    date: 'August 29, 2025',
    location: 'Cultural Center',
    excerpt: 'Experience the grace and beauty of traditional Javanese and Balinese dance performances.',
  },
]

function HomePage() {
  return (
    <RootLayout>
      <PageHero
        eyebrow="Welcome"
        title="Preserving Indonesian Culture Through Dance"
        description="Sanggar Tari Pelem is a traditional Indonesian dance studio dedicated to teaching, performing, and celebrating the living heritage of our village."
      />

      <div className="container-page py-20">
        <div className="mb-12">
          <p className="eyebrow">Featured Events</p>
          <h2 className="mt-4 font-display text-4xl text-primary">Upcoming celebrations and workshops</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>

      <div className="bg-cream py-20">
        <div className="container-page">
          <div className="mb-8">
            <p className="eyebrow">About Us</p>
            <h2 className="mt-4 font-display text-4xl text-primary">A studio rooted in tradition</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-lg text-muted-foreground mb-4">
              Since 2003, Sanggar Tari Pelem has been devoted to preserving and celebrating Indonesian classical and folk
              dance traditions. Our studio is a vibrant cultural space where dancers of all ages learn, perform, and connect
              with our heritage.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe that dance is not just movement—it's a living conversation with our ancestors, a celebration of
              our identity, and a gift to future generations.
            </p>
          </div>
        </div>
      </div>
    </RootLayout>
  )
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  )
}
