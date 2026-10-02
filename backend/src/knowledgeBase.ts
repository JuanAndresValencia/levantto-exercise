export interface KnowledgeSection {
  id: string;
  title: string;
  content: string;
}

export const knowledgeSections: KnowledgeSection[] = [
  {
    id: "about",
    title: "About",
    content:
      "Bonaire Bites is a small chain of three casual restaurants located in Kralendijk, Bonaire, specializing in fresh seafood and local Caribbean fusion cuisine. We were founded in 2019 by chef Elena Martinez.",
  },
  {
    id: "hours",
    title: "Hours",
    content:
      "All three locations are open Tuesday through Sunday, 11:00 AM to 9:00 PM. We are closed on Mondays for staff training and kitchen deep-cleaning.",
  },
  {
    id: "reservations",
    title: "Reservations",
    content:
      "Reservations are accepted for parties of 6 or more, up to 30 days in advance, by phone only — we do not currently accept online reservations. Parties of 5 or fewer are seated on a walk-in basis.",
  },
  {
    id: "dietary",
    title: "Dietary accommodations",
    content:
      "We offer a dedicated gluten-free menu at all locations. Vegan options are available at our Kaya Grandi and Sabana Blas locations, but not yet at our smallest location, the Playa Lechi outpost.",
  },
  {
    id: "loyalty",
    title: "Loyalty program",
    content:
      'Our "Bites Club" loyalty program gives members one stamp per visit; 10 stamps earns a free entrée. Stamps do not expire and they are not transferable between members.',
  },
  {
    id: "delivery",
    title: "Delivery",
    content:
      "We deliver within a 5-kilometer radius of each location through our own driver network — we do not currently partner with third-party delivery apps. Delivery orders have a minimum of $25 and take approximately 40–50 minutes.",
  },
  {
    id: "private_events",
    title: "Private events",
    content:
      "Only the Kaya Grandi location has a private event space, which seats up to 40 people and requires a minimum spend of $800 to book.",
  },
];

export function renderKnowledgeBase(): string {
  return knowledgeSections
    .map((s) => `[${s.id}] ${s.title}\n${s.content}`)
    .join("\n\n");
}
