import { createFileRoute } from "@tanstack/react-router";
import { QuizExperience } from "@/components/QuizExperience";
export const Route = createFileRoute("/quiz_/stacy")({
  head: () => ({
    meta: [
      { title: "Find Your Stacy — My Stacy & Chad" },
      {
        name: "description",
        content:
          "Take the independent 32-question Stacy personality test and discover your closest Stacy match.",
      },
      { property: "og:title", content: "Find Your Stacy — My Stacy & Chad" },
      {
        property: "og:description",
        content: "Take the Stacy test and discover your closest match.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <QuizExperience category="stacy" />,
});
