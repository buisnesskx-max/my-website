import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/quiz/stacy", label: "Find Your Stacy" },
  { to: "/quiz/chad", label: "Find Your Chad" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl"><nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5"><Link to="/" className="font-display text-lg text-foreground sm:text-xl" onClick={() => setOpen(false)}>MY STACY <span className="text-accent-gradient">&</span> CHAD</Link><div className="hidden items-center gap-5 lg:flex">{LINKS.map((link) => <Link key={link.to} to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: link.to === "/" }}>{link.label}</Link>)}<Button asChild className="h-auto rounded-full px-5 py-2 text-xs uppercase tracking-[0.15em]"><Link to="/quiz">Take a Test</Link></Button></div><Button variant="outline" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="rounded-full lg:hidden">{open ? <X /> : <Menu />}</Button></nav>{open && <div className="border-t border-border bg-background lg:hidden"><div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">{LINKS.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base text-muted-foreground hover:bg-elevated hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: link.to === "/" }}>{link.label}</Link>)}<Button asChild className="mt-2 h-auto rounded-full py-3 text-xs uppercase tracking-[0.15em]"><Link to="/quiz" onClick={() => setOpen(false)}>Take a Test</Link></Button></div></div>}</header>;
}
