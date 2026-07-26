import { useEffect, useState } from 'react'
import { Menu, X, CalendarClock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/hooks/useAuth'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/dances', label: 'Repository' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const { isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pathname, setPathname] = useState('/')

  const isHome = pathname === '/'

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const solid = scrolled || !isHome || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'border-b border-primary/10 bg-background/90 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <span
            className={cn(
              'grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-display text-lg italic',
              solid ? 'border-gold text-primary bg-cream' : 'border-gold text-cream bg-primary/40 backdrop-blur',
            )}
          >
            S
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span
              className={cn(
                'font-display text-lg font-semibold',
                solid ? 'text-primary' : 'text-cream',
              )}
            >
              Sanggar Tari
            </span>
            <span
              className={cn(
                'text-[10px] font-medium uppercase tracking-widest',
                solid ? 'text-terracotta' : 'text-gold-soft',
              )}
            >
              Pelem · Est. 2003
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'gold-underline text-sm font-medium transition-colors',
                  solid ? 'text-primary/80 hover:text-primary' : 'text-cream/85 hover:text-cream',
                  active && (solid ? '!text-primary' : '!text-cream'),
                )}
              >
                {item.label}
              </a>
            )
          })}
          {isAuthenticated && (
            <a
              href="http://localhost:8000/admin"
              className={cn(
                'gold-underline text-sm font-medium transition-colors',
                solid ? 'text-primary/80 hover:text-primary' : 'text-cream/85 hover:text-cream',
                pathname === '/admin' && (solid ? '!text-primary' : '!text-cream'),
              )}
            >
              Admin
            </a>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/events"
            className={cn(
              'hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition sm:inline-flex',
              solid
                ? 'bg-primary text-primary-foreground hover:bg-ink'
                : 'bg-gold text-ink hover:bg-gold-soft',
            )}
          >
            <CalendarClock className="h-4 w-4" />
            Events
          </a>

          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'grid h-11 w-11 place-items-center rounded-full border lg:hidden',
              solid ? 'border-primary/20 text-primary' : 'border-cream/40 text-cream',
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          'overflow-hidden border-t border-primary/10 bg-background transition-[max-height] duration-500 lg:hidden',
          open ? 'max-h-[80dvh]' : 'max-h-0',
        )}
      >
        <div className="container-page flex flex-col gap-1 py-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-3 font-display text-2xl text-primary hover:bg-cream"
            >
              {item.label}
            </a>
          ))}
          {isAuthenticated && (
            <a
              href="http://localhost:8000/admin"
              className="rounded-2xl px-4 py-3 font-display text-2xl text-primary hover:bg-cream"
            >
              Admin Dashboard
            </a>
          )}
          <a
            href="/events"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            <CalendarClock className="h-4 w-4" />
            Events
          </a>
        </div>
      </div>
    </header>
  )
}
