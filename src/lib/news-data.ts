import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import eventCompetition from "@/assets/event-competition.jpg";
import eventPelem from "@/assets/event-pelem.jpg";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateISO: string;
  image: string;
  body: string[];
  featured?: boolean;
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "village-that-dances-eighteen-editions-of-pelem-festival",
    title: "The village that dances: inside eighteen editions of Pelem Festival",
    excerpt:
      "A long read on how a small pendopo in Bantul grew into one of Yogyakarta's most anticipated cultural gatherings.",
    category: "Feature",
    date: "Jul 01, 2026",
    dateISO: "2026-07-01",
    image: eventPelem,
    featured: true,
    body: [
      "Eighteen years ago, a handful of families gathered under a bamboo canopy behind the old pendopo to watch their children rehearse Bedhaya. This year, more than four thousand visitors will pass through those same gates over a single weekend.",
      "The story of Pelem Festival is a story of persistence — of teachers who stayed, of alumni who returned, of a village that decided its dances were worth protecting.",
      "This piece traces the festival's evolution through the eyes of the dancers, musicians, and neighbors who built it, one edition at a time.",
    ],
  },
  {
    slug: "registration-opens-2026-27-dance-year",
    title: "Registration opens for the 2026/27 dance year",
    excerpt: "New cohorts for ages 6+ begin in August.",
    category: "Announcement",
    date: "Jun 24, 2026",
    dateISO: "2026-06-24",
    image: gallery2,
    body: [
      "Registration for our 2026/27 dance year is now open. Cohorts are grouped by age and level, with weekly classes running from August through June.",
      "New students are welcome to visit the pendopo for a trial session before committing to a term.",
    ],
  },
  {
    slug: "gamelan-ensemble-national-heritage-broadcast",
    title: "Gamelan ensemble on national heritage broadcast",
    excerpt: "The suite was recorded for 'Warisan Nusantara'.",
    category: "Press",
    date: "Jun 12, 2026",
    dateISO: "2026-06-12",
    image: gallery3,
    body: [
      "Our senior gamelan ensemble was invited to record a three-part suite for the national heritage broadcast 'Warisan Nusantara'.",
      "The program will air later this year across public television and radio.",
    ],
  },
  {
    slug: "students-top-honors-nusantara-youth-cup",
    title: "Two students take top honors at Nusantara Youth Cup",
    excerpt: "Gold medals in Bedhaya and Legong categories.",
    category: "Achievement",
    date: "May 30, 2026",
    dateISO: "2026-05-30",
    image: eventCompetition,
    body: [
      "Two of our senior students earned gold in the Bedhaya and Legong categories at this year's Nusantara Youth Cup.",
      "Congratulations to the dancers, their families, and the teachers who prepared them over the past year.",
    ],
  },
  {
    slug: "new-mirror-wall-training-pendopo",
    title: "A new mirror wall for the training pendopo",
    excerpt: "Thank you to the alumni fund that made it possible.",
    category: "Studio",
    date: "May 18, 2026",
    dateISO: "2026-05-18",
    image: gallery4,
    body: [
      "Thanks to contributions from the alumni fund, the training pendopo now has a full mirror wall along its western side.",
      "The addition helps our younger dancers refine posture and framing during technique drills.",
    ],
  },
  {
    slug: "pelem-festival-2026-dates-confirmed",
    title: "Pelem Festival 2026 dates confirmed",
    excerpt: "Save the date for August 17–19, 2026.",
    category: "Announcement",
    date: "May 02, 2026",
    dateISO: "2026-05-02",
    image: eventPelem,
    body: [
      "Pelem Festival 2026 will take place across three days, August 17 through 19, at the village pendopo and adjoining open-air stage.",
      "Full programme and ticketing details will be shared in early June.",
    ],
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}
