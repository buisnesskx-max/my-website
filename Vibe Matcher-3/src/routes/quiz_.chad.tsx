import { createFileRoute } from "@tanstack/react-router";
import { QuizExperience } from "@/components/QuizExperience";
export const Route = createFileRoute("/quiz_/chad")({
  head: () => ({
    meta: [
      { title: "Find Your Chad — My Stacy & Chad" },
      {
        name: "description",
        content:
          "Take the independent 32-question Chad personality test and discover your closest Chad match.",
      },
      { property: "og:title", content: "Find Your Chad — My Stacy & Chad" },
      {
        property: "og:description",
        content: "Take the Chad test and discover your closest match.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <QuizExperience category="chad" />,
});
