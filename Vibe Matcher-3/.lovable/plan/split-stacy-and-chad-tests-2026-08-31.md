# Split Stacy and Chad Tests

## Goal
Replace the combined quiz with two independent experiences: **Find Your Stacy** and **Find Your Chad**. Each will have its own questions, saved progress, scoring pass, result URL, top-five ranking, and retake/cross-test actions. Celebrity records, profiles, lists, and imagery remain unchanged.

## User experience
- Turn `/quiz` into a simple branded choice screen: “Which one do you want to find?” with links to both tests.
- Add `/quiz/stacy` and `/quiz/chad`, reusing the current one-question-at-a-time interface while changing the heading, progress, loading copy, completion label, storage namespace, and destination by category.
- Add category-specific result URLs at `/result/stacy/$code` and `/result/chad/$code`.
- Each result page reveals only one winner, one personality profile, and one top-five list, then offers **Retake Test**, **Back to Home**, and the opposite test.
- Keep the old combined result route from presenting combined results; replace it with a safe migration screen directing users to choose a new test.

## Independent question and scoring systems
- Create two independently authored question banks of 30–35 questions each using the existing personality dimensions and weighted-answer format.
- Give every Stacy and Chad question a category-prefixed ID so progress and answers cannot collide.
- Refactor scoring to accept a category, its question bank, and only the matching celebrity pool.
- Return one category result shape: user profile plus ranked matches. No combined vector or cross-category ranking will be calculated.
- Preserve the existing celebrity profile vectors and all database entries exactly as they are.

## Separate browser storage and sharing
- Namespace answers, deterministic question-order seeds, and completed summaries separately for Stacy and Chad.
- Encode each shared result as a single celebrity ID and score; the result route category determines which database is valid.
- Validate that a Stacy URL cannot resolve a Chad and vice versa.
- Save the latest completed result for each category. Once both exist, show a compact **Your Results** section on the homepage with the two portraits, names, scores, and links to their separate result pages.
- Update the downloadable/shareable result card to render one category result rather than a combined pair.

## Homepage and navigation
- Add two large image-led category cards directly below the hero, using existing Stacy and Chad imagery and distinct compositions within the current editorial design.
- Update hero and supporting copy so the product is clearly two separate tests.
- Keep Leonardo DiCaprio in Michael B. Jordan’s homepage featured slot only; do not alter either database entry.
- Change primary “Take a Test” actions to `/quiz`.
- Update navigation to **Home**, **Find Your Stacy**, **Find Your Chad**, **How It Works**, and **About**.
- Update How It Works and About copy to describe two independent quizzes.

## Technical implementation
- Extract a reusable category-aware quiz component and reusable single-category result component so styling and behavior remain consistent without duplicating route logic.
- Add route files for every new typed link and category result path; leave generated routing files untouched.
- Use the existing design tokens and UI controls, preserve keyboard/focus behavior, reduced-motion handling, and responsive layout.
- Add unique metadata for the chooser, both quiz routes, and both result routes; correct inherited root fallback metadata.

## Validation
- Type-check the project and confirm the preview build is clean.
- Run both tests end-to-end with deterministic answers and verify:
  - Stacy completion ranks only Stacies and persists only Stacy state.
  - Chad completion ranks only Chads and persists only Chad state.
  - Each result shows one winner, explanation, personality profile, and five same-category matches.
  - Opposite-test, retake, home, chooser, and navigation links work.
  - Homepage “Your Results” appears only after both independent tests are complete.
  - Mobile and desktop layouts have no clipping, overlap, or broken images.
