import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, Glasses } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Choose Your Test — My Stacy & Chad" },
      {
        name: "description",
        content:
          "Choose the independent Stacy or Chad personality test and discover your closest celebrity match.",
      },
      { property: "og:title", content: "Choose Your Test — My Stacy & Chad" },
      {
        property: "og:description",
        content: "Find your Stacy or find your Chad. Two independent personality tests.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizChoice,
});

function QuizChoice() {
  return (
    <div className="min-h-screen veil">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Take a test</p>
          <h1 className="mt-4 font-display text-5xl leading-none sm:text-7xl">
            Which one do you want to find?
          </h1>
          <p className="mt-6 text-muted-foreground">
            Two distinct question sets. Two independent results. Choose your test.
          </p>
        </header>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <TestChoice
            category="stacy"
            title="My Stacy"
            text="Discover the Stacy whose confidence, style, creativity, and overall energy align closest with yours."
          />
          <TestChoice
            category="chad"
            title="My Chad"
            text="Discover the Chad whose drive, character, humor, and way of moving through the world match yours."
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function TestChoice({
  category,
  title,
  text,
}: {
  category: "stacy" | "chad";
  title: string;
  text: string;
}) {
  const isStacy = category === "stacy";
  return (
    <article className="surface-card flex min-h-80 flex-col justify-between p-8 sm:p-10">
      <div>
        {isStacy ? (
          <Gem className="h-8 w-8 text-primary" />
        ) : (
          <Glasses className="h-8 w-8 text-primary" />
        )}
        <p className="eyebrow mt-8">Find your {category}</p>
        <h2 className="mt-3 font-display text-5xl">{title}</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
      <Button
        asChild
        className="mt-10 h-auto self-start rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]"
      >
        <Link to={isStacy ? "/quiz/stacy" : "/quiz/chad"}>Take the {category} test</Link>
      </Button>
    </article>
  );
}
