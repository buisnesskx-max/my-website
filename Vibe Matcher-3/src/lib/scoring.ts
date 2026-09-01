import { DIMENSIONS, DIMENSION_LABELS, type Dimension, type Profile } from "@/data/dimensions";
import { QUESTIONS_BY_CATEGORY, type Question } from "@/data/questions";
import { CHADS, STACIES, type Category, type Person } from "@/data/people";

export interface Match {
  person: Person;
  score: number;
  topDimensions: Dimension[];
}

export interface CategoryResults {
  category: Category;
  profile: Profile;
  matches: Match[];
}

/** Questions always appear in the fixed order they are defined in the data. */
export function orderedQuestions(category: Category): Question[] {
  return [...QUESTIONS_BY_CATEGORY[category]];
}

export interface UserSignal {
  profile: Profile;
  /** How many answered options contributed to each dimension. */
  coverage: Record<Dimension, number>;
}

/** Aggregate the exact options the user selected into a 0-100 profile plus coverage. */
export function buildUserSignal(
  answers: Record<string, string>,
  questions: Question[],
): UserSignal {
  const sums = {} as Record<Dimension, number>;
  const coverage = {} as Record<Dimension, number>;
  for (const dimension of DIMENSIONS) {
    sums[dimension] = 0;
    coverage[dimension] = 0;
  }
  for (const question of questions) {
    const optionId = answers[question.id];
    if (!optionId) continue;
    const option = question.options.find((candidate) => candidate.id === optionId);
    if (!option) continue;
    for (const dimension of DIMENSIONS) {
      const value = option.w[dimension];
      if (value === undefined) continue;
      sums[dimension] += value;
      coverage[dimension] += 1;
    }
  }
  const profile = {} as Profile;
  for (const dimension of DIMENSIONS) {
    const count = coverage[dimension];
    const mean = count ? sums[dimension] / count : 50;
    profile[dimension] = Math.max(0, Math.min(100, Math.round(mean)));
  }
  return { profile, coverage };
}

export function buildUserProfile(answers: Record<string, string>, questions: Question[]): Profile {
  return buildUserSignal(answers, questions).profile;
}

interface PoolStats {
  mean: Record<Dimension, number>;
  sd: Record<Dimension, number>;
}

const statsCache = new Map<string, PoolStats>();

function poolStats(category: Category, people: Person[]): PoolStats {
  const cached = statsCache.get(category);
  if (cached) return cached;
  const mean = {} as Record<Dimension, number>;
  const sd = {} as Record<Dimension, number>;
  for (const dimension of DIMENSIONS) {
    const values = people.map((person) => person.personality_profile[dimension]);
    const average = values.reduce((sum, value) => sum + value, 0) / (values.length || 1);
    const variance =
      values.reduce((sum, value) => sum + (value - average) ** 2, 0) / (values.length || 1);
    mean[dimension] = average;
    sd[dimension] = Math.max(Math.sqrt(variance), 1);
  }
  const stats = { mean, sd };
  statsCache.set(category, stats);
  return stats;
}

/**
 * Correlation-style match: both the user and each candidate are expressed as
 * deviations from the pool average, so "average" people no longer sit closest
 * to everybody. Only dimensions the user's answers actually touched are used.
 */
function affinity(
  userZ: Record<Dimension, number>,
  personZ: Record<Dimension, number>,
  dims: Dimension[],
): number {
  let dot = 0;
  let userNorm = 0;
  let personNorm = 0;
  for (const dimension of dims) {
    dot += userZ[dimension] * personZ[dimension];
    userNorm += userZ[dimension] ** 2;
    personNorm += personZ[dimension] ** 2;
  }
  if (userNorm === 0 || personNorm === 0) return 0;
  return dot / Math.sqrt(userNorm * personNorm);
}

function closestDimensions(user: Profile, other: Profile): Dimension[] {
  return [...DIMENSIONS]
    .map((dimension) => ({
      dimension,
      gap: Math.abs(user[dimension] - other[dimension]),
      strength: user[dimension],
    }))
    .filter(({ strength }) => strength >= 55)
    .sort((a, b) => a.gap - b.gap || b.strength - a.strength)
    .slice(0, 3)
    .map(({ dimension }) => dimension);
}

/** Count of dimensions where the user and the candidate sit on the same side of the pool average. */
function agreementCount(
  userZ: Record<Dimension, number>,
  personZ: Record<Dimension, number>,
  dims: Dimension[],
): number {
  return dims.filter((dimension) => userZ[dimension] * personZ[dimension] > 0).length;
}

function rank(category: Category, signal: UserSignal, people: Person[]): Match[] {
  const { mean, sd } = poolStats(category, people);
  const dims = DIMENSIONS.filter((dimension) => signal.coverage[dimension] > 0);
  // No answer contributed to any dimension: there is no honest match to report.
  if (!dims.length) return [];
  const active = dims;
  const userZ = {} as Record<Dimension, number>;
  for (const dimension of DIMENSIONS)
    userZ[dimension] = (signal.profile[dimension] - mean[dimension]) / sd[dimension];

  const scored = people.map((person) => {
    const personZ = {} as Record<Dimension, number>;
    for (const dimension of DIMENSIONS) {
      personZ[dimension] =
        (person.personality_profile[dimension] - mean[dimension]) / sd[dimension];
    }
    // Primary: shape agreement. Secondary: agreement on the user's strongest signals.
    // Tertiary: how many dimensions point the same way. Final: stable id order.
    const raw = affinity(userZ, personZ, active);
    const strong = [...active].sort((a, b) => userZ[b] - userZ[a]).slice(0, 3);
    const secondary = strong.reduce(
      (sum, dimension) => sum + userZ[dimension] * personZ[dimension],
      0,
    );
    const tertiary = agreementCount(userZ, personZ, active);
    return { person, raw, secondary, tertiary };
  });

  scored.sort(
    (a, b) =>
      b.raw - a.raw ||
      b.secondary - a.secondary ||
      b.tertiary - a.tertiary ||
      a.person.id.localeCompare(b.person.id),
  );

  return scored.map(({ person, raw }) => ({
    person,
    score: Math.max(45, Math.min(99, Math.round(72 + raw * 27))),
    topDimensions: closestDimensions(signal.profile, person.personality_profile),
  }));
}

export function computeCategoryResults(
  category: Category,
  answers: Record<string, string>,
): CategoryResults {
  const questions = QUESTIONS_BY_CATEGORY[category];
  const signal = buildUserSignal(answers, questions);
  const people = (category === "stacy" ? STACIES : CHADS).filter(
    (person) => person.category === category,
  );
  return { category, profile: signal.profile, matches: rank(category, signal, people) };
}

export function strongestTraits(profile: Profile, count = 4): Dimension[] {
  return [...DIMENSIONS].sort((a, b) => profile[b] - profile[a]).slice(0, count);
}

export function explain(match: Match, profile: Profile): string {
  const dimensions = match.topDimensions.length ? match.topDimensions : strongestTraits(profile, 3);
  const words = dimensions.map((dimension) => DIMENSION_LABELS[dimension].toLowerCase());
  const list =
    words.length > 1 ? `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}` : words[0];
  const highs = strongestTraits(profile, 2).map((dimension) =>
    DIMENSION_LABELS[dimension].toLowerCase(),
  );
  return `You scored particularly high in ${highs.join(" and ")}. Your profile aligns most closely with this match on ${list}, which pushed it to the top of your ranking.`;
}
