import { createFileRoute } from "@tanstack/react-router";
import { ResultExperience } from "@/components/ResultExperience";
import { STACIES } from "@/data/people";
import { decodeResult } from "@/lib/quiz-storage";
export const Route = createFileRoute("/result/stacy/$code")({
  head: ({ params }) => { const decoded = decodeResult(params.code); const person = decoded ? STACIES.find((item) => item.id === decoded.personId) : undefined; const title = person ? `My Stacy is ${person.name} — My Stacy & Chad` : "Your Stacy Result — My Stacy & Chad"; const description = person && decoded ? `${person.name} is my ${decoded.score}% Stacy match. Take the independent Stacy test and find yours.` : "See your Stacy personality match."; return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }; },
  component: StacyResult,
});
function StacyResult() { const { code } = Route.useParams(); return <ResultExperience category="stacy" code={code} />; }
