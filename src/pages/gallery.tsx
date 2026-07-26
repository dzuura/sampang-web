import { useState } from 'react'
import { PageHero } from '@/components/page-hero'
import { X } from 'lucide-react'

import gallery1 from '@/assets/gallery-1.jpg'
import gallery2 from '@/assets/gallery-2.jpg'
import gallery3 from '@/assets/gallery-3.jpg'
import gallery4 from '@/assets/gallery-4.jpg'
import eventPelem from '@/assets/event-pelem.jpg'
import eventWorkshop from '@/assets/event-workshop.jpg'
import eventCompetition from '@/assets/event-competition.jpg'
import eventPerformance from '@/assets/event-performance.jpg'
import heroImg from '@/assets/hero-dance.jpg'

const FILTERS = ['All', 'Photos', 'Videos', 'Events'] as const

const ITEMS = [
  { src: heroImg, tag: 'Photos', span: 'col-span-2 row-span-2' },
  { src: gallery1, tag: 'Photos', span: 'row-span-2' },
  { src: gallery2, tag: 'Events', span: '' },
  { src: gallery3, tag: 'Photos', span: '' },
  { src: gallery4, tag: 'Photos', span: 'row-span-2' },
  { src: eventPelem, tag: 'Events', span: 'col-span-2' },
  { src: eventWorkshop, tag: 'Events', span: '' },
  { src: eventCompetition, tag: 'Events', span: '' },
  { src: eventPerformance, tag: 'Videos', span: 'col-span-2' },
]

function GalleryPage() {
  const [f, setF] = useState<(typeof FILTERS)[number]>('All')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const items = f === 'All' ? ITEMS : ITEMS.filter((i) => i.tag === f)

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A visual archive of dance & festival."
        description="Photographs and films collected from twenty years of performances, workshops and rituals."
      />

      <section className="bg-background py-16">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => setF(c)}
                className={
                  'rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition cursor-pointer ' +
                  (f === c
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'border border-primary/15 text-primary/70 hover:border-gold hover:text-primary')
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.src)}
                className={'group relative overflow-hidden rounded-2xl cursor-pointer ' + it.span}
              >
                <img
                  src={it.src}
                  alt="Gallery"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
                  {it.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-cream/40 text-cream cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox} alt="Preview" className="max-h-[90dvh] max-w-6xl rounded-2xl object-contain" />
        </div>
      )}
    </>
  )
}

export { GalleryPage }
export default GalleryPage
