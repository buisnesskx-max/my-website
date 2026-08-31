import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — My Stacy & Chad" },
      {
        name: "description",
        content:
          "My Stacy & Chad is an entertainment personality-matching experience. Learn what the quiz is and what it isn't.",
      },
      { property: "og:title", content: "About — My Stacy & Chad" },
      {
        property: "og:description",
        content: "An entertainment personality-matching experience — not a psychological assessment.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen veil">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
          A quiz, not a diagnosis.
        </h1>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            My Stacy &amp; Chad is a personality-matching experience designed for fun. The quiz uses
            your answers to create a fictionalized personality profile and compares it with profiles
            assigned to people in our database.
          </p>
          <p>
            The results are not psychological assessments and should not be interpreted as factual
            descriptions of any real person's personality. Every profile in the database is an
            invented quiz profile created for this game.
          </p>
          <p>
            Portrait imagery is deliberately kept replaceable: each entry in the database has an
            optional image field, so licensed, public-domain, or user-provided photography can be
            dropped in without touching the rest of the app. Where no properly licensed image is
            available, a branded placeholder is shown instead.
          </p>
        </div>
        <Link
          to="/quiz"
          className="mt-12 inline-block rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
        >
          Choose a Test
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
