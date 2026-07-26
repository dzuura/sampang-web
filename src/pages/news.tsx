import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { PageHero } from '@/components/page-hero'
import { ArrowUpRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api/client'
import type { News } from '@/types/index'

import gallery2 from '@/assets/gallery-2.jpg'

import { NEWS_ARTICLES } from '@/lib/news-data'

interface NewsResponse {
  data: News[]
  meta: {
    total: number
    page: number
    per_page: number
    last_page: number
  }
}

const CATEGORIES = ['All', 'Announcement', 'Press', 'Achievement', 'Studio', 'Feature']

function NewsPage() {
  const [selectedCat, setSelectedCat] = useState('All')

  // Fetch dynamic news
  const { data: dynamicNewsData, isLoading } = useQuery<NewsResponse>({
    queryKey: ['news', { status: 'published' }],
    queryFn: () =>
      apiClient
        .get('/news', {
          params: { status: 'published', per_page: 20 },
        })
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  })

  const apiNewsList = dynamicNewsData?.data || []

  // Combine or fall back
  const allArticles = useMemo(() => {
    if (apiNewsList.length > 0) {
      return apiNewsList.map((n) => ({
        slug: n.slug,
        title: n.title,
        excerpt: n.excerpt,
        category: 'News',
        date: new Date(n.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        image: n.featured_image_url || gallery2,
      }))
    }
    return NEWS_ARTICLES.map((n) => ({
      slug: n.slug,
      title: n.title,
      excerpt: n.excerpt,
      category: n.category,
      date: n.date,
      image: n.image,
    }))
  }, [apiNewsList])

  const filteredArticles = useMemo(() => {
    if (selectedCat === 'All') return allArticles
    return allArticles.filter((a) => a.category.toLowerCase() === selectedCat.toLowerCase())
  }, [allArticles, selectedCat])

  const featured = filteredArticles[0]
  const listArticles = filteredArticles.slice(1)

  return (
    <>
      <PageHero
        eyebrow="News"
        title="Journal of the pendopo."
        description="Announcements, press features, and stories from behind the curtain."
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="container-page grid gap-16 lg:grid-cols-[1.7fr_1fr]">
          <div>
            {isLoading && apiNewsList.length === 0 ? (
              <div className="space-y-8">
                <div className="h-96 bg-muted rounded-[32px] animate-pulse" />
                <div className="h-40 bg-muted rounded-2xl animate-pulse" />
              </div>
            ) : filteredArticles.length > 0 ? (
              <>
                {/* Featured Article */}
                {featured && (
                  <article className="group overflow-hidden rounded-[32px] border border-primary/10 bg-card">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 sm:p-10">
                      <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
                        <span className="rounded-full bg-cream px-3 py-1 text-terracotta">{featured.category}</span>
                        <span className="text-muted-foreground">{featured.date}</span>
                      </div>
                      <h2 className="mt-5 font-display text-3xl leading-tight text-primary sm:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                      <Link
                        to="/news/$slug"
                        params={{ slug: featured.slug }}
                        className="mt-6 inline-flex items-center gap-2 font-medium text-primary gold-underline"
                      >
                        Read the story <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                )}

                {/* Remaining Articles */}
                <div className="mt-14 space-y-8">
                  {listArticles.map((n) => (
                    <article
                      key={n.title}
                      className="group grid gap-6 border-b border-primary/10 pb-8 sm:grid-cols-[220px_1fr]"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                        <img
                          src={n.image}
                          alt={n.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
                          <span className="rounded-full bg-cream px-3 py-1 text-terracotta">{n.category}</span>
                          <span className="text-muted-foreground">{n.date}</span>
                        </div>
                        <h3 className="mt-3 font-display text-2xl text-primary">{n.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                        <Link
                          to="/news/$slug"
                          params={{ slug: n.slug }}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary gold-underline"
                        >
                          Read more <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <p className="py-24 text-center text-muted-foreground">No articles match your selection.</p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-primary/10 bg-cream p-8">
              <p className="eyebrow">Categories</p>
              <ul className="mt-5 space-y-2">
                {CATEGORIES.map((c) => {
                  const count =
                    c === 'All'
                      ? allArticles.length
                      : allArticles.filter((a) => a.category.toLowerCase() === c.toLowerCase()).length
                  return (
                    <li
                      key={c}
                      onClick={() => setSelectedCat(c)}
                      className={
                        'flex items-center justify-between rounded-xl px-3 py-2 text-sm text-primary hover:bg-background cursor-pointer transition ' +
                        (selectedCat === c ? 'bg-background font-bold' : '')
                      }
                    >
                      <span>{c}</span>
                      <span className="text-xs text-muted-foreground">{count}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="rounded-3xl bg-primary p-8 text-cream">
              <p className="eyebrow !text-gold-soft">
                <span className="!bg-gold-soft" />
                Newsletter
              </p>
              <p className="mt-4 font-display text-2xl text-cream">One letter a month, straight from the pendopo.</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 p-1.5"
              >
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
                />
                <button type="submit" className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink cursor-pointer hover:bg-gold-soft transition">
                  Join
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export { NewsPage }
export default NewsPage
