import { useState, useEffect, useRef } from 'react'
import { PageHero } from '@/components/page-hero'
import { MapPin, Phone, Mail, Clock, Instagram, Youtube, Facebook, Send } from 'lucide-react'

function ContactPage() {
  const [sent, setSent] = useState(false)
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).L && mapContainerRef.current && !mapRef.current) {
      const L = (window as any).L
      const coords: [number, number] = [-8.123321310619465, 111.06329212289228]
      
      const map = L.map(mapContainerRef.current).setView(coords, 16)
      mapRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      const marker = L.marker(coords).addTo(map)
      marker.bindPopup('<b>Sanggar Tari Pelem</b><br>Desa Pelem, Kecamatan Pringkuku, Pacitan.').openPopup()
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come sit with us on the pendopo floor."
        description="For classes, bookings, festival sponsorship, or a simple hello — we'd love to hear from you."
      />

      <section className="bg-background py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="rounded-[32px] border border-primary/10 bg-cream p-8 sm:p-10"
          >
            <p className="eyebrow">Send a message</p>
            <h2 className="mt-4 font-display text-3xl text-primary sm:text-4xl">Let's talk</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" placeholder="e.g. Ayu Kartika" />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" />
              <Field label="Phone (optional)" name="phone" placeholder="+62…" />
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">Topic</label>
                <select className="mt-2 w-full rounded-2xl border border-primary/15 bg-background px-4 py-3 text-sm text-primary focus:border-gold focus:outline-none">
                  <option>Class enrollment</option>
                  <option>Festival booking</option>
                  <option>Press inquiry</option>
                  <option>Something else</option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us a little about your inquiry…"
                className="mt-2 w-full rounded-2xl border border-primary/15 bg-background px-4 py-3 text-sm text-primary focus:border-gold focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-ink cursor-pointer"
            >
              <Send className="h-4 w-4" /> {sent ? 'Message sent' : 'Send message'}
            </button>
          </form>

          <div className="space-y-6">
            <InfoCard icon={MapPin} label="Address" value="Desa Pelem, Kecamatan Pringkuku, Pacitan, Jawa Timur 63581" />
            <InfoCard icon={Phone} label="Phone" value="+62 274 555 019" />
            <InfoCard icon={Mail} label="Email" value="hello@sanggarpelem.id" />
            <InfoCard
              icon={Clock}
              label="Hours"
              value={
                <>
                  Mon – Fri · 15:00 – 21:00
                  <br />
                  Sat – Sun · 09:00 – 21:00
                </>
              }
            />

            <div className="rounded-3xl bg-primary p-6 text-cream">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-soft">Follow the studio</p>
              <div className="mt-4 flex gap-3">
                {[Instagram, Youtube, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 transition hover:border-gold hover:bg-gold hover:text-ink text-cream"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="container-page mt-16">
          <div 
            ref={mapContainerRef} 
            className="aspect-[21/9] w-full overflow-hidden rounded-[32px] border border-primary/10 bg-cream shadow-lg z-0" 
            style={{ minHeight: '350px' }}
          />
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-primary/15 bg-background px-4 py-3 text-sm text-primary focus:border-gold focus:outline-none"
      />
    </div>
  )
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5 rounded-2xl border border-primary/10 bg-cream p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-cream">
        <Icon className="h-4 w-4 text-cream" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">{label}</p>
        <p className="mt-2 text-sm text-primary/90 leading-relaxed">{value}</p>
      </div>
    </div>
  )
}

export { ContactPage }
export default ContactPage
