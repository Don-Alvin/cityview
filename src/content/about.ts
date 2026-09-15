export type Milestone = {
  /** Displayed as-is. Loud TODO_ placeholder until the client confirms. */
  year: string;
  title: string;
  detail: string;
};

/**
 * The /about timeline: humble beginnings to a full production floor, the
 * arc Alvin described. The shape of the story is client-given; the years
 * are not, so each one is a loud TODO_ placeholder that `npm run
 * check:placeholders` will block the build on until real dates land
 * (CLAUDE.md: never a plausible-looking fake). The wording of the middle
 * two steps is written for this pass and needs the same confirmation as
 * services.ts's product lists: it should read as the real history, not a
 * plausible-sounding invention, before this ships.
 */
export const milestones: Milestone[] = [
  {
    year: "TODO_YEAR_FOUNDED",
    title: "One shop, one machine",
    detail:
      "CityView opens in Kisumu doing the jobs nobody else wanted at short notice: business cards overnight, a hundred flyers by lunchtime.",
  },
  {
    year: "TODO_YEAR_REPEAT",
    title: "Word travels down the street",
    detail:
      "Print for neighbouring shops turns into repeat work, and repeat work turns into the first proper client list.",
  },
  {
    year: "TODO_YEAR_LARGE_FORMAT",
    title: "Large format arrives",
    detail:
      "Banners, shopfront signage and vehicle graphics join the list, and the work moves from paper to the side of a building.",
  },
  {
    year: "Today",
    title: "A full production floor",
    detail:
      "State-of-the-art printing and branding equipment under one roof, from a single business card to a complete brand rollout.",
  },
];
