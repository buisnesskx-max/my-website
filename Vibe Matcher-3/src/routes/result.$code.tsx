import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/result/$code")({
  head: () => ({ meta: [
    { title: "Choose a New Test — My Stacy & Chad" },
    { name: "description", content: "Stacy and Chad are now two independent personality tests. Choose which one you want to find." },
    { property: "og:title", content: "Choose a New Test — My Stacy & Chad" },
    { property: "og:description", content: "Find your Stacy or your Chad with two independent tests." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" },
  ] }), component: LegacyResult,
});
function LegacyResult() { return <div className="min-h-screen veil"><SiteNav /><main className="mx-auto max-w-xl px-5 py-28 text-center"><p className="eyebrow">The quiz has evolved</p><h1 className="mt-4 font-display text-5xl">Stacy and Chad now have their own tests.</h1><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Take either independent test to create a new, category-specific result.</p><Button asChild className="mt-9 h-auto rounded-full px-7 py-3 text-xs uppercase tracking-[0.18em]"><Link to="/quiz">Choose a test</Link></Button></main><SiteFooter /></div>; }
