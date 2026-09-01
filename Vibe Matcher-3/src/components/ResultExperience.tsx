import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Copy, Download, Share2 } from "lucide-react";

import { MatchRing } from "@/components/MatchRing";
import { AdSense } from "@/components/AdSense";import { Portrait } from "@/components/Portrait";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { DIMENSION_LABELS } from "@/data/dimensions";
import { CHADS, STACIES, type Category, type Person } from "@/data/people";
import { computeCategoryResults, explain, strongestTraits, type Match } from "@/lib/scoring";
import { clearQuizState, decodeResult, loadAnswers } from "@/lib/quiz-storage";
import { drawShareCard } from "@/lib/share-card";

export function ResultExperience({ category, code }: { category: Category; code: string }) {
  const navigate = useNavigate();
  const decoded = useMemo(() => decodeResult(code), [code]);
  const pool = category === "stacy" ? STACIES : CHADS;
  const person = decoded ? pool.find((candidate) => candidate.id === decoded.personId) : undefined;
  const noun = category === "stacy" ? "Stacy" : "Chad";
  const opposite = category === "stacy" ? "chad" : "stacy";
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); const timer = window.setTimeout(() => setRevealed(true), 650); return () => window.clearTimeout(timer); }, []);

  const own = useMemo(() => {
    if (typeof window === "undefined" || !decoded) return null;
    const answers = loadAnswers(category);
    if (Object.keys(answers).length < 5) return null;
    const result = computeCategoryResults(category, answers);
    return result.matches[0]?.person.id === decoded.personId ? result : null;
  }, [category, decoded]);

  if (!decoded || !person) return <InvalidResult category={category} />;

  const match = own?.matches[0];
  const shareText = `My ${noun} is ${person.name} (${decoded.score}% match). Find yours:`;
  const shareUrl = mounted ? window.location.href : "";
  const copyText = async (text: string) => { try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } };
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title: `My ${noun} — My Stacy & Chad`, text: shareText, url: shareUrl }); return; } catch { /* cancelled */ } }
    await copyText(`${shareText} ${shareUrl}`);
  };
  const download = () => {
    const url = drawShareCard({ category, name: person.name, score: decoded.score });
    if (!url) return;
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `my-${category}.png`; anchor.click();
  };
  const retake = () => {
    clearQuizState(category);
    void navigate(category === "stacy" ? { to: "/quiz/stacy" } : { to: "/quiz/chad" });
  };

  return <div className="min-h-screen veil">
    <SiteNav />
    <main className="mx-auto max-w-6xl px-5 pb-24">
      <section className="pt-14 text-center sm:pt-20"><p className="eyebrow animate-fade">Your {noun} is…</p><h1 className="mt-4 font-display text-5xl leading-none sm:text-7xl">{person.name}</h1></section>
      <article className={`mx-auto mt-12 max-w-3xl overflow-hidden surface-card transition-all duration-700 ${revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <div className="relative aspect-[4/5] max-h-[720px] w-full overflow-hidden"><Portrait person={person} className="h-full w-full rounded-none" eager /></div>
        <div className="p-7 sm:p-10"><p className="eyebrow">Your {noun}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-6"><h2 className="font-display text-4xl sm:text-5xl">{person.name}</h2><MatchRing value={decoded.score} size={120} /></div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{person.description}</p><ul className="mt-6 flex flex-wrap gap-2">{person.traits.map((trait) => <li key={trait} className="rounded-full border border-border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{trait}</li>)}</ul>{match && own && <div className="mt-7 border-t border-border pt-6"><h3 className="text-sm font-semibold">Why you matched</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{explain(match, own.profile)}</p></div>}</div>
      </article>
      {own && <><section className="mt-16 surface-card p-7 sm:p-10"><h2 className="font-display text-3xl">Your personality profile</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{strongestTraits(own.profile, 6).map((dimension) => <div key={dimension}><div className="flex justify-between text-sm"><span>{DIMENSION_LABELS[dimension]}</span><span className="text-muted-foreground">{own.profile[dimension]}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${own.profile[dimension]}%` }} /></div></div>)}</div></section><TopFive title={`Your Top 5 ${noun === "Stacy" ? "Stacies" : "Chads"}`} matches={own.matches.slice(0, 5)} /></>}
      <section className="mt-20 border-t border-border pt-12 text-center"><h2 className="font-display text-3xl sm:text-4xl">Share your {noun}</h2><div className="mt-7 flex flex-wrap justify-center gap-3"><Button variant="outline" onClick={() => copyText(shareText)} className="h-auto rounded-full px-6 py-3 text-xs uppercase tracking-[0.15em]"><Copy />{copied ? "Copied" : "Copy result"}</Button><Button onClick={share} className="h-auto rounded-full px-6 py-3 text-xs uppercase tracking-[0.15em]"><Share2 />Share</Button><Button variant="outline" onClick={download} className="h-auto rounded-full px-6 py-3 text-xs uppercase tracking-[0.15em]"><Download />Download card</Button></div><div className="mt-10 flex flex-wrap justify-center gap-3"><Button onClick={retake} className="h-auto rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]">Retake test</Button><Button variant="outline" asChild className="h-auto rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]"><Link to={opposite === "stacy" ? "/quiz/stacy" : "/quiz/chad"}>Take the {opposite} test</Link></Button><Button variant="ghost" asChild className="h-auto rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]"><Link to="/">Back to home</Link></Button></div></section>
      <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">This is an entertainment personality quiz. Results reflect the quiz's fictional scoring profiles, not claims about the real people featured.</p>
    </main><SiteFooter />
  </div>;
}

function InvalidResult({ category }: { category: Category }) {
  const path = category === "stacy" ? "/quiz/stacy" : "/quiz/chad";
  return <div className="min-h-screen"><SiteNav /><main className="mx-auto max-w-xl px-5 py-32 text-center"><h1 className="font-display text-4xl">That result link isn't valid.</h1><p className="mt-3 text-sm text-muted-foreground">Take the {category} test to generate your own result.</p><Button asChild className="mt-8 h-auto rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]"><Link to={path}>Take the {category} test</Link></Button></main><SiteFooter /></div>;
}

function TopFive({ title, matches }: { title: string; matches: Match[] }) {
  return <section className="mt-16"><h2 className="font-display text-3xl">{title}</h2><ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{matches.map((match, index) => <li key={match.person.id} className="surface-card overflow-hidden"><Portrait person={match.person} className="aspect-[3/4] w-full rounded-none" /><div className="p-4"><p className="text-sm leading-tight">{match.person.name}</p><p className="mt-1 text-xs text-muted-foreground">{index === 0 ? `Winner — ${match.score}%` : `${match.score}%`}</p></div></li>)}</ul></section>;
}
