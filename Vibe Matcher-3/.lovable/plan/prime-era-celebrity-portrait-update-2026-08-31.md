# Prime-era celebrity portrait update

## Scope
- Keep the quiz questions, scoring, celebrity records, result encoding, routes, and page layout unchanged.
- Replace only portrait assignments that do not meet the requested recognizable younger/prime-era direction.
- Preserve the existing monogram fallback whenever no suitable legally reusable image can be verified.

## Image sourcing and validation
- Use Wikimedia Commons/public-domain or permissively licensed photographs only; do not use search-result thumbnails, social-media images, fan edits, or unverified third-party hosts.
- For each celebrity, verify the Commons file page, depicted person, capture era/date where available, license, resolution, and whether the image is a solo, unobstructed portrait.
- Prefer career-defining eras and portrait-oriented crops. If Commons has no compliant prime-era option, keep the best existing licensed portrait or intentionally fall back to the placeholder rather than lowering legal or visual standards.
- Keep one independently editable portrait URL per celebrity in the existing portrait map.

## Implementation
- Update `src/data/portraits.ts` with the verified direct image URLs, grouped consistently by Stacy and Chad for easier later replacement.
- Normalize Wikimedia URLs by removing tracking parameters and selecting high-resolution render URLs where appropriate.
- Retain the existing `Portrait` image failure handling and standardized `object-fit: cover` treatment; adjust only focal positioning if a verified portrait needs it to avoid cutting off the face.
- Do not alter `src/data/people.ts` except if validation finds an actual duplicate; David Gandy is currently present once and will remain once.

## Verification
- Add/run a deterministic audit that confirms all 49 Stacies and all 49 Chads have exactly one matching portrait key, with no missing/extra keys and no duplicate people.
- Check every URL responds as an image and manually spot-check identity, solo composition, face visibility, and crop quality.
- Verify the homepage portrait grid and both large result portraits at desktop and mobile sizes, including graceful fallback on a failed image.
- Run the existing type/build checks and confirm quiz/scoring files remain unchanged.
