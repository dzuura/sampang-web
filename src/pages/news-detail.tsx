import { useParams } from '@tanstack/react-router'

import { PageHero } from '@/components/page-hero'
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api/client'
import { ErrorPage } from '@/components/error-page'
import type { News } from '@/types/index'

interface NewsDetailResponse {
  data: News
}

function NewsDetailPage() {
  const { slug } = useParams({ from: '/news/$slug' })

  const { data, isLoading, error } = useQuery<NewsDetailResponse>({
    queryKey: ['news', slug],
    queryFn: () => apiClient.get(`/news/${slug}`).then((res) => res.data),
    staleTime: 10 * 60 * 1000,
  })

  if (error) {
    return (
      <ErrorPage
        title="Article Not Found"
        description="The article you are looking for could not be found."
        statusCode={404}
      />
    )
  }

  if (isLoading) {
    return (
      <>
        <PageHero eyebrow="Loading..." title="Article" description="" />
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

  const article = data?.data
  if (!article) return <ErrorPage />

  const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <PageHero eyebrow="News Article" title={article.title} description={article.excerpt} />

      <article className="container-page py-20">
        <div className="max-w-3xl mx-auto">
          {article.featured_image_url && (
            <div className="mb-12 rounded-lg overflow-hidden aspect-video bg-muted">
              <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
            <span>{publishDate}</span>
            {article.author && <span>by {article.author.name}</span>}
          </div>

          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
            <div 
              className="text-foreground leading-relaxed prose prose-lg max-w-none" 
              dangerouslySetInnerHTML={{ __html: article.content || '' }} 
            />
          </div>
        </div>
      </article>
    </>
  )
}

export { NewsDetailPage }
