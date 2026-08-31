import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { IMAGE_CREDITS } from "@/data/image-credits";
import { findPerson } from "@/data/people";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Image credits & attribution — My Stacy & Chad" },
      {
        name: "description",
        content:
          "Photographer, license and source-file attribution for every portrait used on My Stacy & Chad.",
      },
      { property: "og:title", content: "Image credits — My Stacy & Chad" },
      {
        property: "og:description",
        content: "Author, license and source for every portrait shown on the site.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Credits,
});

function Credits() {
  return (
    <div className="min-h-screen veil">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="eyebrow">Credits</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
          Image credits &amp; attribution
        </h1>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Every portrait on this site comes from Wikimedia Commons and is used under the free
            licence shown next to it. Most of these licences (Creative Commons BY and BY-SA) require
            that the photographer and licence are credited wherever the photograph appears — that
            credit is given below.
          </p>
          <p>
            Portraits are shown for identification in an entertainment quiz. No photographer,
            rights-holder or person pictured endorses this site. If you hold rights to an image
            listed here and want it corrected or removed, email{" "}
            <a
              href="mailto:buisnesskx@gmail.com"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              buisnesskx@gmail.com
            </a>{" "}
            and it will be taken down.
          </p>
        </div>
        <ul className="mt-12 space-y-5 border-t border-border/70 pt-8">
          {IMAGE_CREDITS.map((credit) => (
            <li key={credit.id} className="text-sm leading-relaxed">
              <p className="font-display text-lg text-foreground">
                {findPerson(credit.id)?.name ?? credit.id}
              </p>
              <p className="text-muted-foreground">
                Photo: {credit.author} —{" "}
                {credit.licenseUrl ? (
                  <a
                    href={credit.licenseUrl}
                    rel="license noopener noreferrer"
                    target="_blank"
                    className="underline underline-offset-2 transition-colors hover:text-foreground"
                  >
                    {credit.license}
                  </a>
                ) : (
                  credit.license
                )}
                {" — "}
                <a
                  href={credit.page}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  source file
                </a>
              </p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
