import { Instagram, Youtube, Facebook, Send, MapPin, Phone, Mail } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="relative bg-ink text-cream">
      <div className="container-page grid gap-16 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-gold bg-primary/40 font-display text-lg italic text-cream">
              S
            </span>
            <div>
              <p className="font-display text-xl">Sanggar Tari Pelem</p>
              <p className="text-[10px] uppercase tracking-widest text-gold-soft">Est. 2003 · Yogyakarta</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-cream/70">
            A village studio devoted to Indonesian classical and folk dance — teaching, performing, and hosting the
            festivals that keep our heritage alive.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Youtube, label: 'YouTube' },
              { icon: Facebook, label: 'Facebook' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-gold hover:bg-gold hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">Explore</h4>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ['/about', 'About the studio'],
              ['/events', 'All events'],
              ['/gallery', 'Gallery'],
              ['/news', 'News & press'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-cream/75 gold-underline hover:text-cream">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">Reach us</h4>
          <ul className="mt-6 space-y-4 text-sm text-cream/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Desa Pelem, Pringkuku,
              <br />
              Pacitan, Jawa Timur 63581
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              +62 274 555 019
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              hello@sanggarpelem.id
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">Newsletter</h4>
          <p className="mt-6 text-sm text-cream/70">
            Season announcements, festival dates, workshop openings — once a month.
          </p>
          <form className="mt-5 flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 p-1.5 focus-within:border-gold">
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-ink transition hover:bg-gold-soft"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} Sanggar Tari Pelem. Melestarikan warisan budaya Indonesia.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream">
              Privacy
            </a>
            <a href="#" className="hover:text-cream">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
