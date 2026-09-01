import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Gem, Glasses } from "lucide-react";

import { Portrait } from "@/components/Portrait";
import { AdSense } from "@/components/AdSense";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import heroChad from "@/assets/hero-chad.jpg";
import heroStacy from "@/assets/hero-stacy.jpg";
import { CHADS, STACIES, findPerson, type Category, type Person } from "@/data/people";
import { loadCompletedResult, type SavedResult } from "@/lib/quiz-storage";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "My Stacy & Chad — Two Personality Tests" },
    { name: "description", content: "Take two independent personality tests to discover your closest Stacy and Chad matches." },
    { property: "og:title", content: "My Stacy & Chad — Two Personality Tests" },
    { property: "og:description", content: "Find your Stacy or find your Chad with two independent personality tests." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Home,
});

const STEPS = [
  ["01", "Choose", "Decide whether you want to find your Stacy or your Chad."],
  ["02", "Answer", "Complete that category's independently tuned personality questions."],
  ["03", "Compare", "Your profile is compared only with the chosen celebrity database."],
  ["04", "Discover", "Reveal your closest match and the top five for that test."],
] as const;

function Home() {
  const featuredStacies = STACIES.slice(0, 6);
  const leonardo = CHADS.find((person) => person.name === "Leonardo DiCaprio");
  const featuredChads = CHADS.slice(0, 6).map((person) => person.name === "Michael B. Jordan" && leonardo ? leonardo : person);
  const [saved, setSaved] = useState<{ stacy: SavedResult | null; chad: SavedResult | null }>({ stacy: null, chad: null });
  useEffect(() => setSaved({ stacy: loadCompletedResult("stacy"), chad: loadCompletedResult("chad") }), []);

  return <div className="min-h-screen"><SiteNav /><main>
    <section className="relative overflow-hidden veil"><div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24"><div className="animate-rise"><p className="eyebrow">Two independent personality tests</p><h1 className="mt-5 font-display text-5xl leading-[0.98] sm:text-7xl">Find Your <span className="text-accent-gradient">Stacy</span>.<br />Find Your <span className="text-accent-gradient">Chad</span>.</h1><p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">Choose a test, answer questions built specifically for that category, and discover the personality match closest to your vibe.</p><div className="mt-9 flex flex-wrap gap-3"><Button variant="outline" asChild className="h-auto rounded-full px-8 py-4 text-xs uppercase tracking-[0.18em]"><Link to="/how-it-works">How It Works</Link></Button></div></div><div className="animate-fade grid grid-cols-2 gap-4"><figure className="aspect-[3/4] overflow-hidden rounded-3xl border border-border"><img src={heroStacy} alt="Editorial portrait representing the Stacy test" width={768} height={1024} className="h-full w-full object-cover" /></figure><figure className="mt-10 aspect-[3/4] overflow-hidden rounded-3xl border border-border"><img src={heroChad} alt="Editorial portrait representing the Chad test" width={768} height={1024} className="h-full w-full object-cover" /></figure></div></div></section>

    <section aria-labelledby="choose-test" className="mx-auto max-w-6xl px-5 py-20"><div className="max-w-2xl"><p className="eyebrow">Choose your category</p><h2 id="choose-test" className="mt-3 font-display text-4xl sm:text-6xl">Two tests. Two distinct matches.</h2></div><div className="mt-10 grid gap-6 lg:grid-cols-2"><CategoryCard category="stacy" title="Find Your Stacy" question="Which Stacy matches your personality?" body="Answer a series of Stacy-specific questions and discover your closest match." people={featuredStacies.slice(0, 3)} /><CategoryCard category="chad" title="Find Your Chad" question="Which Chad matches your personality?" body="Answer a series of Chad-specific questions and discover your closest match." people={featuredChads.slice(0, 3)} /></div></section>
    <AdSense />
    {saved.stacy && saved.chad && <YourResults stacy={saved.stacy} chad={saved.chad} />}

    <section className="border-y border-border/70 bg-card/40 py-20"><div className="mx-auto max-w-6xl px-5"><h2 className="font-display text-4xl sm:text-5xl">How it works</h2><ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{STEPS.map(([number, title, body]) => <li key={number} className="surface-card p-7"><span className="font-display text-3xl text-accent-gradient">{number}</span><h3 className="mt-3 text-lg">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></li>)}</ol></div></section>
    <FeaturedRow title="Featured Stacy matches" people={featuredStacies} />
    <FeaturedRow title="Featured Chad matches" people={featuredChads} />
    
  </main><SiteFooter /></div>;
}

function CategoryCard({ category, title, question, body, people }: { category: Category; title: string; question: string; body: string; people: Person[] }) {
  const isStacy = category === "stacy";
  return <article className="surface-card group relative min-h-[460px] overflow-hidden"><div className="absolute inset-0 grid grid-cols-3">{people.map((person) => <Portrait key={person.id} person={person} className="h-full w-full rounded-none border-r border-border last:border-r-0" />)}</div><div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" /><div className="relative flex min-h-[460px] flex-col justify-end p-7 sm:p-10">{isStacy ? <Gem className="mb-5 h-7 w-7 text-primary" /> : <Glasses className="mb-5 h-7 w-7 text-primary" />}<p className="eyebrow">{question}</p><h3 className="mt-3 font-display text-5xl">{title}</h3><p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p><Button asChild className="mt-7 h-auto self-start rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]"><Link to={isStacy ? "/quiz/stacy" : "/quiz/chad"}>Take {category} test</Link></Button></div></article>;
}

function YourResults({ stacy, chad }: { stacy: SavedResult; chad: SavedResult }) {
  const stacyPerson = findPerson(stacy.personId); const chadPerson = findPerson(chad.personId);
  if (!stacyPerson || !chadPerson) return null;
  return <section className="border-y border-border bg-card/40 py-20"><div className="mx-auto max-w-6xl px-5"><p className="eyebrow">Your results</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Both sides, discovered.</h2><div className="mt-10 grid gap-5 sm:grid-cols-2"><SavedResultCard category="stacy" result={stacy} person={stacyPerson} /><SavedResultCard category="chad" result={chad} person={chadPerson} /></div></div></section>;
}
function SavedResultCard({ category, result, person }: { category: Category; result: SavedResult; person: Person }) { return <Link to={category === "stacy" ? "/result/stacy/$code" : "/result/chad/$code"} params={{ code: result.code }} className="surface-card grid grid-cols-[120px_1fr] overflow-hidden transition-transform hover:-translate-y-1 sm:grid-cols-[170px_1fr]"><Portrait person={person} className="h-full min-h-44 w-full rounded-none" /><div className="flex flex-col justify-center p-6"><p className="eyebrow">Your {category}</p><h3 className="mt-2 font-display text-3xl">{person.name}</h3><p className="mt-2 text-sm text-primary">{result.score}% match</p></div></Link>; }
function FeaturedRow({ title, people }: { title: string; people: Person[] }) { return <section className="mx-auto max-w-6xl px-5 py-12"><h2 className="font-display text-3xl">{title}</h2><ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{people.map((person) => <li key={person.id} className="surface-card overflow-hidden"><Portrait person={person} className="aspect-[3/4] w-full rounded-none" /><p className="p-3 text-xs leading-tight text-muted-foreground">{person.name}</p></li>)}</ul></section>; }
