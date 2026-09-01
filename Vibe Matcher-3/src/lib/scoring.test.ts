import { describe, expect, it } from "vitest";

import { DIMENSIONS } from "@/data/dimensions";
import { CHADS, STACIES, type Category } from "@/data/people";
import { QUESTIONS_BY_CATEGORY } from "@/data/questions";
import { computeCategoryResults } from "@/lib/scoring";

const CATEGORIES: Category[] = ["stacy", "chad"];

function poolFor(category: Category) {
  return (category === "stacy" ? STACIES : CHADS).filter((person) => person.category === category);
}

function makeRandom(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function answerSet(category: Category, seed: number) {
  const random = makeRandom(seed);
  const answers: Record<string, string> = {};
  for (const question of QUESTIONS_BY_CATEGORY[category]) {
    const option = question.options[Math.floor(random() * question.options.length)]!;
    answers[question.id] = option.id;
  }
  return answers;
}

describe.each(CATEGORIES)("%s data integrity", (category: Category) => {
  it("has unique people with complete profiles", () => {
    const people = poolFor(category);
    expect(people.length).toBeGreaterThan(0);
    expect(new Set(people.map((person) => person.id)).size).toBe(people.length);
    for (const person of people) {
      for (const dimension of DIMENSIONS) {
        const value = person.personality_profile[dimension];
        expect(typeof value).toBe("number");
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    }
  });

  it("has unique questions and valid, non-empty option weights", () => {
    const questions = QUESTIONS_BY_CATEGORY[category];
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    for (const question of questions) {
      expect(new Set(question.options.map((option) => option.id)).size).toBe(
        question.options.length,
      );
      for (const option of question.options) {
        const entries = Object.entries(option.w);
        expect(entries.length).toBeGreaterThan(0);
        for (const [dimension, value] of entries) {
          expect(DIMENSIONS).toContain(dimension);
          expect(value).toBeGreaterThanOrEqual(0);
          expect(value).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

describe.each(CATEGORIES)("%s scoring", (category: Category) => {
  it("is deterministic for identical answers", () => {
    for (let seed = 1; seed <= 50; seed += 1) {
      const answers = answerSet(category, seed);
      const first = computeCategoryResults(category, answers);
      const second = computeCategoryResults(category, { ...answers });
      expect(second.matches.map((match) => `${match.person.id}:${match.score}`)).toEqual(
        first.matches.map((match) => `${match.person.id}:${match.score}`),
      );
    }
  });

  it("ranks every person in the category exactly once", () => {
    const people = poolFor(category);
    const { matches } = computeCategoryResults(category, answerSet(category, 7));
    expect(matches).toHaveLength(people.length);
    expect(new Set(matches.map((match) => match.person.id)).size).toBe(people.length);
    expect(matches.every((match) => match.person.category === category)).toBe(true);
  });

  it("recalculates rather than defaulting to a fixed winner", () => {
    const winners = new Set<string>();
    for (let seed = 1; seed <= 200; seed += 1) {
      winners.add(
        computeCategoryResults(category, answerSet(category, seed)).matches[0]!.person.id,
      );
    }
    expect(winners.size).toBeGreaterThan(5);
  });

  it("responds to a single changed answer without breaking determinism", () => {
    const base = answerSet(category, 21);
    const question = QUESTIONS_BY_CATEGORY[category][0]!;
    const other = question.options.find((option) => option.id !== base[question.id])!;
    const changed = { ...base, [question.id]: other.id };
    expect(computeCategoryResults(category, changed).matches[0]!.person.id).toBe(
      computeCategoryResults(category, { ...changed }).matches[0]!.person.id,
    );
    expect(computeCategoryResults(category, base).profile).not.toEqual(
      computeCategoryResults(category, changed).profile,
    );
  });

  it("ignores answers belonging to the other category", () => {
    const answers = answerSet(category, 3);
    const foreign = answerSet(category === "stacy" ? "chad" : "stacy", 9);
    expect(computeCategoryResults(category, { ...answers, ...foreign }).matches[0]!.person.id).toBe(
      computeCategoryResults(category, answers).matches[0]!.person.id,
    );
  });
});
