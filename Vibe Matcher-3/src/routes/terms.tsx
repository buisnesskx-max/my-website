import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — My Stacy & Chad" },
      {
        name: "description",
        content:
          "Terms of use for My Stacy & Chad: an entertainment personality quiz with no psychological, scientific or factual claims.",
      },
      { property: "og:title", content: "Terms of use — My Stacy & Chad" },
      { property: "og:description", content: "Terms of use for the My Stacy & Chad quiz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Terms() {
  return (
    <div className="min-h-screen veil">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="eyebrow">Terms</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">Terms of use</h1>
        <p className="mt-6 text-sm text-muted-foreground/70">Last updated: 1 September 2026</p>

        <div className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            By using My Stacy &amp; Chad you agree to these terms. If you do not agree with them,
            please do not use the site.
          </p>
        </div>

        <Section title="What this site is">
          <p>
            My Stacy &amp; Chad is a free entertainment quiz. You answer a fixed set of questions and
            the site shows which entries in its database your answers are closest to.
          </p>
        </Section>

        <Section title="Results are entertainment only">
          <p>
            Results are produced by a simple, fixed scoring formula written for fun. They are not
            scientific, psychological, medical, diagnostic or predictive, they do not measure your
            personality, attractiveness, appearance, identity or worth, and they should not be relied
            on for any decision. Nothing here is professional advice of any kind.
          </p>
        </Section>

        <Section title="People featured in the quiz">
          <p>
            Names and photographs of public figures are used for identification and commentary in a
            light-hearted entertainment context. The personality profiles attached to each entry are
            invented for the quiz and are not statements of fact about any real person. No person
            featured is affiliated with, sponsors, or endorses this site.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            Use the site for personal, otherwise lawful purposes. Please do not attempt to break,
            overload, scrape at scale, or interfere with the site or other people's use of it, and do
            not use it to harass anyone or to misrepresent the results as factual claims about a real
            person.
          </p>
        </Section>

        <Section title="Intellectual property">
          <p>
            The site's original questions, descriptions, branding, scoring implementation, and other original
            content are owned by the site operator, subject to any applicable third-party rights You may
            share result links and result cards; please do not copy the quiz content or code for your
            own site without permission.
          </p>
          <p>
            Celebrity names, trademarks and photographs are not owned by this site. Photographs come
            from Wikimedia Commons under free licences and are credited on the{" "}
            <Link
              to="/credits"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              credits page
            </Link>
            , which lists the photographer and licence for each image.
          </p>
        </Section>

        <Section title="Content you create">
          <p>
            The site has no accounts, uploads, comments or profiles, so you do not submit content to
            us. Your answers stay in your own browser; anything you choose to share — a result link
            or downloaded result card — is yours to share.
          </p>
        </Section>

        <Section title="Availability and changes">
          <p>
            The site is provided “as is” and “as available”, without warranties, and may be changed,
            interrupted or discontinued at any time. Questions, entries and results may be updated.
            To the fullest extent the law allows, the operator is not liable for indirect or
            consequential loss arising from use of a free entertainment quiz. Nothing in these terms
            limits liability that cannot legally be limited, and your local consumer rights are
            unaffected.
          </p>
        </Section>

        <Section title="Corrections, takedowns and contact">
          <p>
            If you are a rights-holder, or a person featured, and want an image, name or entry
            corrected or removed, email{" "}
            <a
              href="mailto:buisnesskx@gmail.com"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              buisnesskx@gmail.com
            </a>{" "}
            with the entry and the reason. Requests are handled promptly and the database is
            structured so any entry can be edited or deleted quickly. The same address is the contact
            point for privacy and legal questions.
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
