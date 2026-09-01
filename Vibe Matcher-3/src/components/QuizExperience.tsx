import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import type { Category } from "@/data/people";
import { computeCategoryResults, orderedQuestions } from "@/lib/scoring";
import {
  clearQuizState,
  encodeResult,
  loadAnswers,
  saveAnswers,
  saveCompletedResult,
} from "@/lib/quiz-storage";

const LABELS = {
  stacy: { title: "Find Your Stacy", noun: "Stacy", icon: "◆" },
  chad: { title: "Find Your Chad", noun: "Chad", icon: "◇" },
} as const;

export function QuizExperience({ category }: { category: Category }) {
  const copy = LABELS[category];
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState<string | null>(null);
  const [phase, setPhase] = useState<"quiz" | "loading">("quiz");
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = loadAnswers(category);
    const list = orderedQuestions(category);
    setAnswers(stored);
    const firstUnanswered = list.findIndex((question) => !stored[question.id]);
    setIndex(firstUnanswered === -1 ? Math.max(0, list.length - 1) : firstUnanswered);
    setReady(true);
  }, [category]);

  const questions = useMemo(() => orderedQuestions(category), [category]);
  const question = questions[index];
  const total = questions.length;
  const answered = questions.filter((item) => Boolean(answers[item.id])).length;
  const progress = Math.round((Math.min(answered, total) / total) * 100);

  const finish = useCallback(
    (all: Record<string, string>) => {
      setPhase("loading");
      try {
        const result = computeCategoryResults(category, all);
        const winner = result.matches[0];
        if (!winner) {
          setError(true);
          return;
        }
        const code = encodeResult(winner.person.id, winner.score);
        saveCompletedResult({ category, personId: winner.person.id, score: winner.score, code });
        window.setTimeout(() => setLoadingStep(1), 800);
        window.setTimeout(() => setLoadingStep(2), 1650);
        window.setTimeout(() => {
          void navigate(
            category === "stacy"
              ? { to: "/result/stacy/$code", params: { code } }
              : { to: "/result/chad/$code", params: { code } },
          );
        }, 2500);
      } catch {
        setError(true);
      }
    },
    [category, navigate],
  );

  const select = (optionId: string) => {
    if (pending || !question) return;
    if (!question.options.some((option) => option.id === optionId)) return;
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    saveAnswers(category, next);
    setPending(optionId);
    window.setTimeout(() => {
      setPending(null);
      const remaining = questions.findIndex((item) => !next[item.id]);
      if (remaining !== -1) setIndex(remaining);
      else if (index + 1 < total) setIndex(index + 1);
      else finish(next);
    }, 320);
  };

  const startOver = () => {
    clearQuizState(category);
    setAnswers({});
    setIndex(0);
    setPending(null);
    setPhase("quiz");
    setError(false);
    setLoadingStep(0);
  };

  const loadingCopy = [
    `Reading your ${copy.noun} profile…`,
    `Comparing every ${copy.noun}…`,
    `Finding your closest match…`,
  ];

  if (error)
    return (
      <Shell>
        <div className="mx-auto max-w-md py-24 text-center">
          <h1 className="font-display text-4xl">Something went wrong.</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your answers are safe. Please try again.
          </p>
          <Button
            onClick={() => {
              setError(false);
              setPhase("quiz");
            }}
            className="mt-8 h-auto rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]"
          >
            Retry test
          </Button>
        </div>
      </Shell>
    );

  if (phase === "loading")
    return (
      <Shell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center">
          <div className="relative h-20 w-20">
            <span className="absolute inset-0 rounded-full border border-border" />
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
          </div>
          <p aria-live="polite" className="font-display text-2xl sm:text-3xl">
            {loadingCopy[loadingStep]}
          </p>
          <p className="eyebrow">{copy.icon} Your result is almost ready</p>
        </div>
      </Shell>
    );

  if (!ready || !question)
    return (
      <Shell>
        <div className="min-h-[70vh]" />
      </Shell>
    );

  return (
    <Shell>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col px-1 py-8 sm:py-12">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            disabled={index === 0}
            className="h-auto rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            <ArrowLeft /> Back
          </Button>
          <div className="text-right">
            <p className="eyebrow">{copy.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Question {index + 1} of {total}
            </p>
          </div>
        </div>
        <div
          className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${copy.noun} test progress`}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div key={question.id} className="animate-rise mt-12 flex-1">
          <h1 className="font-display text-3xl leading-tight sm:text-5xl">{question.text}</h1>
          <ul className="mt-8 grid gap-3">
            {question.options.map((option, optionIndex) => {
              const selected = answers[question.id] === option.id;
              return (
                <li key={option.id}>
                  <Button
                    variant="outline"
                    onClick={() => select(option.id)}
                    aria-pressed={selected}
                    className={`group h-auto min-h-18 w-full justify-start whitespace-normal rounded-2xl px-5 py-5 text-left text-base sm:py-6 sm:text-lg ${selected ? "border-primary bg-elevated" : "bg-card hover:bg-elevated"}`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
                    >
                      {selected ? <Check /> : String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{option.label}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 pb-10">
            <Button
              variant="link"
              onClick={startOver}
              className="px-0 text-xs uppercase tracking-[0.15em] text-muted-foreground"
            >
              Start over
            </Button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen veil">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-5">{children}</main>
    </div>
  );
}
