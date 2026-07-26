import { ReactNode } from 'react'
import { PageHero } from '@/components/page-hero'

export interface ContentPageLayoutProps {
  eyebrow: string
  title: string
  description?: string
  pathname?: string
  children: ReactNode
}

export function ContentPageLayout({
  eyebrow,
  title,
  description,
  pathname,
  children,
}: ContentPageLayoutProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} pathname={pathname} />
      <div className="container-page py-20">
        {children}
      </div>
    </>
  )
}
