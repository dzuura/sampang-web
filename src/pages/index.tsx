import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, MapPin, Calendar, Play, ChevronDown, Sparkles, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api/client'
import type { Event, News, Dance } from '@/types/index'

import heroImg from '@/assets/hero-dance.jpg'
import aboutImg from '@/assets/about-studio.jpg'
import gallery1 from '@/assets/gallery-1.jpg'
import gallery2 from '@/assets/gallery-2.jpg'
import gallery3 from '@/assets/gallery-3.jpg'
import gallery4 from '@/assets/gallery-4.jpg'
import eventWorkshop from '@/assets/event-workshop.jpg'
import eventCompetition from '@/assets/event-competition.jpg'
import eventPerformance from '@/assets/event-performance.jpg'
import testimonial1 from '@/assets/testimonial-1.jpg'

import { EVENTS } from '@/lib/events-data'
import { EventCard } from '@/components/event-card'
import { Countdown } from '@/components/countdown'

interface EventsResponse {
  data: Event[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

interface NewsResponse {
  data: News[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

interface DancesResponse {
  data: Dance[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

function HomePage() {
  // Fetch dynamic events
  const { data: dynamicEventsData } = useQuery<EventsResponse>({
    queryKey: ['events', { status: 'published' }],
    queryFn: () =>
      apiClient
        .get('/events', {
          params: { status: 'published', per_page: 10 },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  })

  // Fetch dynamic news
  const { data: dynamicNewsData } = useQuery<NewsResponse>({
    queryKey: ['news', { status: 'published' }],
    queryFn: () =>
      apiClient
        .get('/news', {
          params: { status: 'published', per_page: 3 },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  })

  // Fetch dynamic dances
  const { data: dynamicDancesData } = useQuery<DancesResponse>({
    queryKey: ['dances', { status: 'published' }],
    queryFn: () =>
      apiClient
        .get('/dances', {
          params: { status: 'published', per_page: 3 },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  })

  const apiEvents = dynamicEventsData?.data || []
  const apiNews = dynamicNewsData?.data || []
  const apiDances = dynamicDancesData?.data || []

  // Combine or fall back
  const featured = apiEvents.find((e) => e.featured) || apiEvents[0] || null
  const displayEvents = apiEvents.length > 0
    ? apiEvents.slice(0, 3).map((e) => ({
        slug: e.slug,
        title: e.title,
        category: e.category,
        date: new Date(e.date_start).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        location: e.location,
        image: e.image_url,
        excerpt: e.short_description,
      }))
    : EVENTS.slice(0, 3)

  const displayNews = apiNews.length > 0
    ? apiNews.slice(0, 3).map((n) => ({
        img: n.featured_image_url || gallery2,
        category: 'News',
        date: new Date(n.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        title: n.title,
        excerpt: n.excerpt,
      }))
    : [
        {
          img: gallery2,
          category: 'Announcement',
          date: 'Jun 24, 2026',
          title: 'Sanggar Pelem opens registration for the 2026/27 dance year',
          excerpt: 'New cohorts for ages 6+ begin in August. Scholarships available for village families.',
        },
        {
          img: gallery3,
          category: 'Press',
          date: 'Jun 12, 2026',
          title: 'Gamelan ensemble featured on national heritage broadcast',
          excerpt: "Our resident musicians recorded a suite for the 'Warisan Nusantara' TV special.",
        },
        {
          img: eventCompetition,
          category: 'Achievement',
          date: 'May 30, 2026',
          title: 'Two students take top honors at Nusantara Youth Cup',
          excerpt: 'Congratulations to Alika and Radit for gold in the Bedhaya and Legong categories.',
        },
      ]

  return (
    <>
      <Hero />
      <UpcomingEvent featured={featured} />
      <AboutSection />
      <DanceRepositorySection displayDances={apiDances} />
      <FeaturedEvents displayEvents={displayEvents} />
      <GalleryPreview />
      <LatestNews displayNews={displayNews} />
      <Testimonials />
      <Sponsors />
    </>
  )
}

/* ---------------- SECTION 1 · HERO ---------------- */
function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Indonesian classical dancer performing under warm stage light"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-ink/25" />

      <div className="container-page relative flex min-h-[100dvh] flex-col justify-end pb-20 pt-40 text-cream sm:pb-28">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Est. 2003 · Yogyakarta
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl lg:text-[88px] text-cream">
            Preserving Indonesian Culture <em className="text-gold-soft font-serif italic font-normal">Through Dance</em> and Festivals
          </h1>
          <p className="mt-6 max-w-xl text-base text-cream/85 sm:text-lg">
            Experience inspiring performances, cultural festivals, workshops and community
            traditions organized by our village dance studio.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/events"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-gold-soft"
            >
              Explore Events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 rounded-full border border-cream/40 bg-cream/5 px-7 py-3.5 text-sm font-medium text-cream backdrop-blur transition hover:bg-cream/15"
            >
              <Play className="h-4 w-4 fill-cream" />
              About Us
            </Link>
          </div>
        </div>

        {/* Side info panel */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-6 text-right text-xs uppercase tracking-[0.3em] text-cream/70 xl:flex">
          <div className="[writing-mode:vertical-rl] rotate-180">Bedhaya · Legong · Reog · Saman</div>
        </div>

        {/* Bottom meta strip */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-cream/20 pt-8 sm:grid-cols-4">
          {[
            ['20+', 'Years'],
            ['300+', 'Students'],
            ['50+', 'Awards'],
            ['100+', 'Performances'],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-3xl text-gold-soft sm:text-4xl">{n}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/60">{l}</p>
            </div>
          ))}
        </div>

        <a
          href="#upcoming"
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/70 sm:flex"
        >
          Scroll
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

/* ---------------- SECTION 2 · UPCOMING EVENT ---------------- */
function UpcomingEvent({ featured }: { featured: Event | null }) {
  const defaultEvent = {
    slug: 'pelem-festival',
    title: 'Pelem Festival 2026',
    category: 'Festival',
    date: 'August 17 – 19, 2026',
    isoDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Desa Pelem, Yogyakarta',
    image: gallery2,
    excerpt: 'Three evenings of classical Javanese dance, gamelan, culinary traditions, and lantern-lit village processions.',
  }

  const e = featured
    ? {
        slug: featured.slug,
        title: featured.title,
        category: featured.category,
        date: new Date(featured.date_start).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        isoDate: featured.date_start,
        location: featured.location,
        image: featured.image_url || gallery2,
        excerpt: featured.short_description,
      }
    : defaultEvent

  return (
    <section id="upcoming" className="relative bg-cream py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Now Approaching</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-primary sm:text-5xl">
              The signature festival of our year
            </h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 text-sm font-medium text-primary gold-underline">
            View all events <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[32px] border border-primary/10 bg-card shadow-[var(--shadow-elegant)] lg:grid-cols-[1.15fr_1fr]">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-cream shadow-lg">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" /> Upcoming
            </span>
          </div>
          <div className="flex flex-col justify-between gap-8 p-8 sm:p-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">{e.category}</p>
              <h3 className="mt-4 font-display text-3xl leading-tight text-primary sm:text-4xl">{e.title}</h3>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" />{e.date}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{e.location}</span>
              </div>
              <p className="mt-6 text-muted-foreground">{e.excerpt}</p>
            </div>

            <div className="space-y-6">
              <Countdown iso={e.isoDate} />
              <Link
                to="/events/$slug"
                params={{ slug: e.slug }}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-ink sm:w-auto"
              >
                View Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SECTION 3 · ABOUT ---------------- */
function AboutSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[32px]">
            <img src={aboutImg} alt="Young dancers rehearsing inside the studio pendopo" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden max-w-xs rounded-2xl border border-primary/10 bg-cream p-5 shadow-[var(--shadow-card)] sm:block">
            <p className="font-display italic text-primary">"Dance is a prayer set into motion."</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">Ibu Sri Wahyuni · Founder</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">About the Studio</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-primary sm:text-5xl">
            A village pendopo where tradition is taught, danced, and lived.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Founded in a modest bamboo hall on the western edge of Desa Pelem, our sanggar has
            grown into a home for classical Javanese, Balinese and folk dance — training the next
            generation while producing festivals, temple performances and community rituals.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 bg-cream p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-terracotta">Our Vision</p>
              <p className="mt-3 text-sm text-primary/90">To keep Indonesian dance a living language — passed hand to hand, generation to generation.</p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-cream p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-terracotta">Our Mission</p>
              <p className="mt-3 text-sm text-primary/90">Train dancers, host festivals, and open our pendopo to villagers, students and travelers alike.</p>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-primary/10 pt-8 sm:grid-cols-4">
            {[
              ['20+', 'Years Experience'],
              ['300+', 'Students'],
              ['50+', 'Awards'],
              ['100+', 'Performances'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl text-primary">{n}</dt>
                <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SECTION 4 · FEATURED EVENTS ---------------- */
function FeaturedEvents({ displayEvents }: { displayEvents: any[] }) {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">This Season</p>
            <h2 className="mt-4 font-display text-4xl text-primary sm:text-5xl">
              Festivals, workshops & performances
            </h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 text-sm font-medium text-primary gold-underline">
            All events <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayEvents.map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SECTION 5 · GALLERY PREVIEW ---------------- */
function GalleryPreview() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-4 font-display text-4xl text-primary sm:text-5xl">
              Moments from stage, studio & festival grounds
            </h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-medium text-primary gold-underline">
            View Gallery <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { src: gallery1, span: 'row-span-2' },
            { src: gallery2, span: '' },
            { src: gallery3, span: '' },
            { src: gallery4, span: 'row-span-2' },
            { src: eventPerformance, span: '' },
            { src: eventWorkshop, span: '' },
          ].map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl ${img.span}`}
            >
              <img src={img.src} alt="Gallery" loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SECTION 6 · LATEST NEWS ---------------- */
function LatestNews({ displayNews }: { displayNews: any[] }) {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Latest News</p>
            <h2 className="mt-4 font-display text-4xl text-primary sm:text-5xl">From the pendopo journal</h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-medium text-primary gold-underline">
            All news <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayNews.map((n) => (
            <article key={n.title} className="group flex flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.img} alt={n.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
                  <span className="rounded-full bg-cream px-3 py-1 text-terracotta">{n.category}</span>
                  <span className="text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="font-display text-2xl leading-snug text-primary">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Read More <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SECTION 7 · TESTIMONIALS ---------------- */
const QUOTES = [
  {
    text: "The Pelem Festival didn't feel like a show — it felt like being welcomed into a family that happens to dance beautifully.",
    name: 'Diah Kartika',
    role: 'Cultural journalist, Jakarta',
    photo: testimonial1,
  },
  {
    text: 'My daughter has trained here for four years. She has learned discipline, grace, and something no school teaches: reverence.',
    name: 'Ibu Retno',
    role: 'Parent · Class of 2025',
    photo: testimonial1,
  },
  {
    text: 'Working with Sanggar Pelem on our documentary was the highlight of our year. Rare craft, generous teachers.',
    name: 'Aditya Nugroho',
    role: 'Film director',
    photo: testimonial1,
  },
]

function Testimonials() {
  const [i, setI] = useState(0)
  const q = QUOTES[i]

  useEffect(() => {
    const timer = setInterval(() => {
      setI((prev) => (prev + 1) % QUOTES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-primary py-24 text-cream sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 10%, var(--gold) 0 2px, transparent 3px), radial-gradient(circle at 80% 90%, var(--gold-soft) 0 2px, transparent 3px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />
      <div className="container-page relative">
        <p className="eyebrow !text-gold-soft"><span className="!bg-gold-soft" />Testimonials</p>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div className="flex items-center gap-6">
            <img src={q.photo} alt={q.name} loading="lazy" className="h-24 w-24 rounded-full border-2 border-gold object-cover sm:h-32 sm:w-32" />
            <div>
              <p className="font-display text-xl text-cream">{q.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold-soft">{q.role}</p>
            </div>
          </div>
          <div>
            <Quote className="h-10 w-10 text-gold" />
            <blockquote className="mt-4 font-display text-3xl leading-snug text-cream sm:text-4xl font-serif italic text-cream">
              "{q.text}"
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <button
                aria-label="Previous"
                onClick={() => setI((i - 1 + QUOTES.length) % QUOTES.length)}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 transition hover:border-gold hover:bg-gold hover:text-ink cursor-pointer text-cream"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next"
                onClick={() => setI((i + 1) % QUOTES.length)}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 transition hover:border-gold hover:bg-gold hover:text-ink cursor-pointer text-cream"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="ml-4 flex gap-2">
                {QUOTES.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === i ? 'w-8 bg-gold' : 'w-2 bg-cream/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SECTION 8 · SPONSORS ---------------- */
const SPONSORS = [
  'Kementerian Kebudayaan',
  'Dinas Pariwisata DIY',
  'Taman Budaya',
  'Bank Rakyat',
  'Garuda Foundation',
  'Nusantara Airlines',
]
function Sponsors() {
  return (
    <section className="bg-background py-20 overflow-hidden">
      <div className="container-page">
        <div className="text-center">
          <p className="eyebrow justify-center">Partners & Supporters</p>
          <h2 className="mt-4 font-display text-3xl text-primary sm:text-4xl">Together we keep tradition alive</h2>
        </div>
        <div className="mt-10 overflow-hidden w-full relative">
          <div className="flex gap-4 animate-marquee hover-pause py-2">
            {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((s, idx) => (
              <div
                key={idx}
                className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-cream text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 transition hover:border-gold hover:text-primary"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
/* ---------------- SECTION 8.5 · DANCE REPOSITORY ---------------- */
function DanceRepositorySection({ displayDances }: { displayDances: any[] }) {
  // Fallback to static data if no API dances exist
  const dancesToShow = displayDances && displayDances.length > 0 
    ? displayDances.slice(0, 3) 
    : [
        {
          slug: 'bedhaya-ketawang',
          name: 'Bedhaya Ketawang',
          origin: 'Keraton Yogyakarta',
          description: 'A sacred and refined nine-woman dance from the Yogyakarta Palace representing harmony and spiritual unity.',
          thumbnail_url: gallery1
        },
        {
          slug: 'srimpi-rendheng',
          name: 'Srimpi Rendheng',
          origin: 'Keraton Surakarta',
          description: 'A classical four-woman dance from Solo Palace featuring intricate floor patterns and synchronized movements.',
          thumbnail_url: gallery2
        },
        {
          slug: 'jaipong',
          name: 'Jaipong',
          origin: 'West Java',
          description: 'A lively Sundanese folk dance celebrating joy and femininity with rapid hip movements.',
          thumbnail_url: eventPerformance
        }
      ]

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Repository</p>
            <h2 className="mt-4 font-display text-4xl text-primary sm:text-5xl">
              Classical & Folk Dances
            </h2>
          </div>
          <Link to="/dances" className="inline-flex items-center gap-2 text-sm font-medium text-primary gold-underline">
            All repository <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dancesToShow.map((dance) => (
            <Link 
              key={dance.slug} 
              to="/dances/$slug"
              params={{ slug: dance.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {dance.thumbnail_url && (
                  <img
                    src={dance.thumbnail_url}
                    alt={dance.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-terracotta">
                  {dance.origin}
                </div>
                <h3 className="font-display text-2xl leading-snug text-primary group-hover:text-primary transition-colors">{dance.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{dance.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Explore Dance <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HomePage }
export default HomePage
