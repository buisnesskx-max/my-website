import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & cookies — My Stacy & Chad" },
      {
        name: "description",
        content:
          "No accounts, no email, no analytics, no advertising trackers. Quiz answers stay in your own browser's local storage.",
      },
      { property: "og:title", content: "Privacy & cookies — My Stacy & Chad" },
      {
        property: "og:description",
        content: "No accounts, no analytics, no ad trackers. Answers stay in your browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
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

function Privacy() {
  return (
    <div className="min-h-screen veil">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="eyebrow">Privacy &amp; cookies</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
          We don't want your data.
        </h1>
        <p className="mt-6 text-sm text-muted-foreground/70">Last updated: 1 September 2026</p>

        <div className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            My Stacy &amp; Chad is an entertainment quiz. You can use the whole site anonymously. We
            never ask for your name, email address, phone number, postal address or date of birth,
            and there is no account to create and no contact form.
          </p>
        </div>

        <Section title="What we do not collect">
          <p>
            No accounts or sign-in. No newsletter or mailing list. No contact or comment forms. No
            analytics or measurement product. No advertising or cross-site tracking pixels. No
            payments. No location data. No profiling and no automated decisions with legal effects.
          </p>
        </Section>

        <Section title="Your quiz answers">
          <p>
            Your answers are saved only in your own browser, in local storage on your device. They
            are never transmitted to us, never written to a database, and never linked to an
            identity. We cannot read them.
          </p>
          <p>
            Clearing your browser data, or using “Start over” in a quiz, deletes them. Two small keys
            are stored per quiz: your answers, and your last completed result.
          </p>
          <p>
            Result links contain only the matched name and the match percentage — never your
            individual answers. Anyone you send a link to sees the same result page and nothing about
            how you answered.
          </p>
        </Section>

        <Section title="Cookies and similar technologies">
          <p>
            This site sets no cookies at all — not for essential purposes, not for analytics, not for
            advertising. It does use browser local storage, which is a similar technology, purely to
            remember your quiz progress on your own device. It is strictly functional, it is not
            shared with anyone, and it is not used to track you across sites.
          </p>
          <p>
            Because there is no tracking, no analytics and no advertising, this site does not
            currently require a consent banner under the EU/UK cookie rules. If advertising or
            analytics is ever added, that changes: a consent management platform would then be
            required for visitors in the EU, UK and similar regions, and this page would be updated
            first.
          </p>
        </Section>

        <Section title="Third parties that can see a request">
          <p>
            <strong className="text-foreground">Hosting.</strong> The site is served by our hosting
            provider, which processes standard server request data such as your IP address, browser
            user-agent and requested page in order to deliver the page and keep the service secure.
            This is normal server logging, not analytics we run.
          </p>
          <p>
            <strong className="text-foreground">Wikimedia Commons.</strong> Most celebrity portraits
            are loaded directly from Wikimedia's image servers. Your browser therefore contacts
            Wikimedia, which can see your IP address and user-agent for that image request. Wikimedia
            does not receive your answers or your result.
          </p>
          <p>
            There are no other embedded third parties: no third-party fonts, no video or social
            embeds, no maps, no tag managers, no external APIs called from the browser.
          </p>
        </Section>

        <Section title="Children">
          <p>
            This site is a general-audience entertainment quiz and is not directed at children. We do
            not knowingly collect personal information from anyone, including children, because we do
            not collect personal information at all.
          </p>
        </Section>

        <Section title="Your rights and contact">
          <p>
            Because nothing personal is stored on our side, there is normally no data for us to
            access, correct, export or delete — you can delete everything yourself by clearing your
            browser storage. For any privacy question, or any request about an image or a database
            entry, email{" "}
            <a
              href="mailto:buisnesskx@gmail.com"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              buisnesskx@gmail.com
            </a>
            .
          </p>
          <p>
            Photograph attribution for every portrait is listed on the{" "}
            <Link
              to="/credits"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              credits page
            </Link>
            .
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
