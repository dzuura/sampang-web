import { PageHero } from '@/components/page-hero'
import { Award, Sparkles, Users, HeartHandshake } from 'lucide-react'
import aboutImg from '@/assets/about-studio.jpg'
import gallery1 from '@/assets/gallery-1.jpg'
import gallery4 from '@/assets/gallery-4.jpg'

const TEACHERS = [
  { name: 'Ibu Sri Wahyuni', role: 'Founder · Bedhaya Master', img: gallery1 },
  { name: 'Pak Bagas Wicaksono', role: 'Gamelan Director', img: gallery4 },
  { name: 'Ibu Nurul Aisyah', role: 'Balinese Legong Instructor', img: aboutImg },
]

const ACHIEVEMENTS = [
  { icon: Award, label: 'Best Cultural Sanggar', year: '2024 · Kemendikbud' },
  { icon: Sparkles, label: 'UNESCO Living Heritage Feature', year: '2023' },
  { icon: Users, label: 'National Youth Dance Gold', year: '2022 · 2024' },
  { icon: HeartHandshake, label: 'Provincial Community Award', year: '2021' },
]

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Studio"
        title="A quiet pendopo, twenty years of dance."
        description="From a bamboo village hall to a home for hundreds of dancers, our sanggar exists to keep Indonesian classical and folk dance a living, breathing tradition."
      />

      {/* History */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
          <img src={aboutImg} alt="Studio history" loading="lazy" className="aspect-[4/5] w-full rounded-[32px] object-cover" />
          <div>
            <p className="eyebrow">History</p>
            <h2 className="mt-4 font-display text-4xl text-primary sm:text-5xl">From a village pendopo to a heritage stage</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>Sanggar Tari Pelem was founded in 2003 by Ibu Sri Wahyuni, a Bedhaya master trained at the Kraton Yogyakarta. What began as informal weekend lessons under a bamboo roof now serves more than 300 students each year.</p>
              <p>Today the studio produces the annual Pelem Festival, hosts temple performances, and partners with schools across Yogyakarta and Central Java.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-page">
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { title: 'Vision', body: 'To keep Indonesian dance a living language — passed hand to hand, from master to student, generation to generation.' },
              { title: 'Mission', body: 'Train dancers, host festivals, and open our pendopo to villagers, students and travelers who wish to learn.' },
            ].map((b) => (
              <div key={b.title} className="rounded-3xl border border-primary/10 bg-background p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-terracotta">{b.title}</p>
                <p className="mt-4 font-display text-2xl leading-snug text-primary">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-page">
          <p className="eyebrow">Our Teachers</p>
          <h2 className="mt-4 font-display text-4xl text-primary sm:text-5xl">The masters who guide us</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEACHERS.map((t) => (
              <div key={t.name} className="group overflow-hidden rounded-3xl border border-primary/10 bg-card">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-primary">{t.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-primary py-20 text-cream sm:py-28">
        <div className="container-page">
          <p className="eyebrow !text-gold-soft"><span className="!bg-gold-soft" />Achievements</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl sm:text-5xl text-cream">Recognized nationally, rooted locally</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map(({ icon: Icon, label, year }) => (
              <div key={label} className="rounded-2xl border border-cream/15 bg-cream/5 p-6">
                <Icon className="h-6 w-6 text-gold" />
                <p className="mt-4 font-display text-lg text-cream">{label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gold-soft">{year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export { AboutPage }
export default AboutPage
