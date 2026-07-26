import eventPelem from "@/assets/event-pelem.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";
import eventCompetition from "@/assets/event-competition.jpg";
import eventPerformance from "@/assets/event-performance.jpg";

export type EventCategory = "Festival" | "Workshop" | "Competition" | "Performance" | "Training";

export interface EventItem {
  slug: string;
  title: string;
  category: EventCategory;
  date: string;      // display
  isoDate: string;   // ISO for countdown
  location: string;
  image: string;
  excerpt: string;
  featured?: boolean;
}

const inDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(19, 0, 0, 0);
  return d.toISOString();
};

export const EVENTS: EventItem[] = [
  {
    slug: "pelem-festival",
    title: "Pelem Festival 2026",
    category: "Festival",
    date: "August 17 – 19, 2026",
    isoDate: inDays(42),
    location: "Desa Pelem, Yogyakarta",
    image: eventPelem,
    excerpt:
      "Three evenings of classical Javanese dance, gamelan, culinary traditions, and lantern-lit village processions.",
    featured: true,
  },
  {
    slug: "kids-dance-workshop",
    title: "Children's Classical Dance Workshop",
    category: "Workshop",
    date: "July 12, 2026",
    isoDate: inDays(7),
    location: "Sanggar Pelem Pendopo",
    image: eventWorkshop,
    excerpt:
      "A four-hour introduction for young learners to the fundamentals of Bedhaya posture and hand mudra.",
  },
  {
    slug: "nusantara-competition",
    title: "Nusantara Dance Competition",
    category: "Competition",
    date: "September 05, 2026",
    isoDate: inDays(62),
    location: "Taman Budaya, Yogyakarta",
    image: eventCompetition,
    excerpt:
      "Regional troupes compete across five traditional styles — judged by a national panel of masters.",
  },
  {
    slug: "temple-night-performance",
    title: "Temple Night · Legong Suite",
    category: "Performance",
    date: "October 21, 2026",
    isoDate: inDays(108),
    location: "Candi Prambanan Open Stage",
    image: eventPerformance,
    excerpt:
      "An evening performance of the Legong Kraton suite staged against the illuminated temple silhouette.",
  },
];

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);
export const featuredEvent = () => EVENTS.find((e) => e.featured) ?? EVENTS[0];
