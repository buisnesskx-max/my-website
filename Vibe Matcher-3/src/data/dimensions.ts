export const DIMENSIONS = [
  "confidence",
  "sociability",
  "ambition",
  "independence",
  "creativity",
  "calmness",
  "adventurousness",
  "sophistication",
  "humor",
  "discipline",
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

export type Profile = Record<Dimension, number>;

export const DIMENSION_LABELS: Record<Dimension, string> = {
  confidence: "Confidence",
  sociability: "Sociability",
  ambition: "Ambition",
  independence: "Independence",
  creativity: "Creativity",
  calmness: "Calmness",
  adventurousness: "Adventurousness",
  sophistication: "Sophistication",
  humor: "Humor",
  discipline: "Discipline",
};

/** Build a profile from a compact tuple in DIMENSIONS order. */
export function profileFrom(values: number[]): Profile {
  const p = {} as Profile;
  DIMENSIONS.forEach((d, i) => {
    p[d] = values[i] ?? 50;
  });
  return p;
}
