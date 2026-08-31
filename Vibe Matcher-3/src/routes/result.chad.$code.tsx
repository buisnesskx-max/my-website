import { createFileRoute } from "@tanstack/react-router";
import { ResultExperience } from "@/components/ResultExperience";
import { CHADS } from "@/data/people";
import { decodeResult } from "@/lib/quiz-storage";
export const Route = createFileRoute("/result/chad/$code")({
  head: ({ params }) => { const decoded = decodeResult(params.code); const person = decoded ? CHADS.find((item) => item.id === decoded.personId) : undefined; const title = person ? `My Chad is ${person.name} — My Stacy & Chad` : "Your Chad Result — My Stacy & Chad"; const description = person && decoded ? `${person.name} is my ${decoded.score}% Chad match. Take the independent Chad test and find yours.` : "See your Chad personality match."; return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }; },
  component: ChadResult,
});
function ChadResult() { const { code } = Route.useParams(); return <ResultExperience category="chad" code={code} />; }
