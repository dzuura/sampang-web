import { useEffect, useState } from 'react'

export function Countdown({ iso, tone = 'light' }: { iso: string; tone?: 'light' | 'dark' }) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = now === null ? 0 : Math.max(0, new Date(iso).getTime() - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff / 3600000) % 24)
  const mins = Math.floor((diff / 60000) % 60)
  const secs = Math.floor((diff / 1000) % 60)
  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: mins },
    { label: 'Seconds', value: secs },
  ]

  const isDark = tone === 'dark'
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className={
            'flex flex-col items-center rounded-2xl border px-2 py-4 sm:px-3 ' +
            (isDark
              ? 'border-cream/15 bg-cream/5 text-cream'
              : 'border-primary/10 bg-cream text-primary')
          }
        >
          <span className="font-display text-3xl tabular-nums sm:text-4xl">
            {String(u.value).padStart(2, '0')}
          </span>
          <span
            className={
              'mt-1 text-[10px] font-semibold uppercase tracking-widest ' +
              (isDark ? 'text-gold-soft' : 'text-terracotta')
            }
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
