import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { DIMENSION_LABELS, DIMENSIONS } from "@/data/dimensions";
import { QUESTION_COUNTS } from "@/data/questions";
import { CHADS, STACIES } from "@/data/people";
export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How the Two Tests Work — My Stacy & Chad" },
      {
        name: "description",
        content:
          "See how the independent Stacy and Chad personality tests create and compare separate profiles.",
      },
      { property: "og:title", content: "How the Two Tests Work — My Stacy & Chad" },
      {
        property: "og:description",
        content: "Two question sets, two separate scoring passes, and two independent results.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});
const STEPS = [
  ["1. Choose", "Choose the Stacy test or the Chad test."],
  ["2. Answer", "Complete questions written specifically for that category."],
  ["3. Compare", "Your profile is compared only against that category's database."],
  ["4. Discover", "Receive one winner and a same-category top five."],
] as const;
function HowItWorks() {
  return (
    <div className="min-h-screen veil">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-5 py-20">
        <p className="eyebrow">How it works</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
          Two tests. Two independent results.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          The Stacy test has {QUESTION_COUNTS.stacy} questions; the Chad test has{" "}
          {QUESTION_COUNTS.chad}. Answers and rankings never cross between them.
        </p>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2">
          {STEPS.map(([title, body]) => (
            <li key={title} className="surface-card p-8">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
        <section className="mt-16">
          <h2 className="font-display text-3xl">The ten dimensions</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Each test creates its own profile across the same broad dimensions, using independently
            tuned questions. Stacy answers are ranked against {STACIES.length} Stacies only. Chad
            answers are ranked against {CHADS.length} Chads only.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {DIMENSIONS.map((dimension) => (
              <li
                key={dimension}
                className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground"
              >
                {DIMENSION_LABELS[dimension]}
              </li>
            ))}
          </ul>
        </section>
        <Button
          asChild
          className="mt-14 h-auto rounded-full px-8 py-4 text-xs uppercase tracking-[0.18em]"
        >
          <Link to="/quiz">Choose a Test</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}
