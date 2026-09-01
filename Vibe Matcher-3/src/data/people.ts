import { profileFrom, type Profile } from "./dimensions";
import { PORTRAITS } from "./portraits";

export type Category = "stacy" | "chad";

export interface Person {
  id: string;
  name: string;
  category: Category;
  /** Optional image URL. Leave empty to render the branded monogram placeholder. */
  image?: string;
  traits: string[];
  description: string;
  personality_profile: Profile;
}

/**
 * Compact author format:
 * [name, traits, description, [confidence, sociability, ambition, independence,
 *  creativity, calmness, adventurousness, sophistication, humor, discipline]]
 *
 * Add or remove people freely — the matching engine reads this list directly.
 */
type Row = [string, string[], string, number[]];

const slug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const STACY_ROWS: Row[] = [
  [
    "Brooke Shields",
    ["Poised", "Warm", "Classic"],
    "A composed, classic presence with quiet warmth and staying power.",
    [78, 72, 74, 76, 62, 84, 55, 88, 66, 80],
  ],
  [
    "Taylor Hill",
    ["Grounded", "Sunny", "Easygoing"],
    "Bright and unfussy, with an approachable, effortless energy.",
    [70, 82, 68, 62, 60, 76, 66, 74, 72, 66],
  ],
  [
    "Adriana Lima",
    ["Fiery", "Determined", "Direct"],
    "Intense and driven, with a competitive streak under the glamour.",
    [90, 78, 88, 74, 58, 52, 72, 82, 60, 84],
  ],
  [
    "Ana Paula Arósio",
    ["Sophisticated", "Calm", "Enigmatic"],
    "Still, sophisticated and deliberate — the definition of understated command.",
    [88, 58, 76, 90, 74, 92, 54, 97, 52, 78],
  ],
  [
    "Angelina Jolie",
    ["Independent", "Intense", "Fearless"],
    "Unconventional and self-directed, drawn to meaning over comfort.",
    [93, 55, 88, 96, 82, 70, 90, 88, 50, 74],
  ],
  [
    "Megan Fox",
    ["Bold", "Unfiltered", "Individual"],
    "Provocative and self-possessed, allergic to fitting in.",
    [88, 62, 66, 92, 80, 46, 78, 70, 74, 50],
  ],
  [
    "Margot Robbie",
    ["Charming", "Playful", "Driven"],
    "Quick, funny and ambitious with an easy social gravity.",
    [84, 88, 86, 68, 76, 66, 76, 78, 88, 76],
  ],
  [
    "Ana de Armas",
    ["Focused", "Private", "Elegant"],
    "Reserved off-stage, exacting on it — precision with softness.",
    [76, 54, 88, 84, 70, 80, 62, 88, 56, 88],
  ],
  [
    "Gal Gadot",
    ["Disciplined", "Steady", "Confident"],
    "Composed and dependable, with quiet authority.",
    [86, 72, 84, 74, 56, 86, 70, 82, 60, 90],
  ],
  [
    "Charlize Theron",
    ["Commanding", "Sharp", "Resilient"],
    "Direct, hard-working and unsentimental about the work.",
    [94, 58, 94, 90, 72, 74, 76, 88, 62, 92],
  ],
  [
    "Rosie Huntington-Whiteley",
    ["Refined", "Meticulous", "Composed"],
    "Editorially precise, with a minimal, controlled aesthetic.",
    [78, 62, 84, 76, 66, 84, 52, 94, 48, 90],
  ],
  [
    "Candice Swanepoel",
    ["Serene", "Natural", "Free"],
    "Calm and outdoorsy, happiest away from the noise.",
    [72, 64, 66, 82, 62, 88, 78, 78, 56, 66],
  ],
  [
    "Irina Shayk",
    ["Cool", "Guarded", "Self-reliant"],
    "Low-key and unbothered, with a razor-sharp edge.",
    [84, 46, 78, 92, 58, 82, 62, 88, 48, 80],
  ],
  [
    "Gisele Bündchen",
    ["Ambitious", "Grounded", "Health-led"],
    "Structured, health-first and quietly relentless.",
    [86, 70, 92, 82, 56, 84, 74, 84, 58, 94],
  ],
  [
    "Alessandra Ambrosio",
    ["Sunny", "Social", "Adventurous"],
    "Beach energy with a busy social calendar.",
    [76, 88, 70, 66, 62, 74, 82, 76, 74, 62],
  ],
  [
    "Naomi Campbell",
    ["Fierce", "Uncompromising", "Iconic"],
    "Formidable presence and zero interest in blending in.",
    [97, 74, 92, 88, 66, 44, 74, 92, 56, 80],
  ],
  [
    "Cindy Crawford",
    ["Pragmatic", "Polished", "Businesslike"],
    "Classic polish paired with a strategist's mind.",
    [82, 74, 88, 78, 54, 82, 56, 86, 62, 90],
  ],
  [
    "Christy Turlington",
    ["Thoughtful", "Purposeful", "Calm"],
    "Quiet, principled and deeply steady.",
    [70, 58, 78, 82, 66, 94, 58, 88, 50, 88],
  ],
  [
    "Claudia Schiffer",
    ["Classic", "Private", "Elegant"],
    "Timeless and reserved, with a collector's eye.",
    [76, 60, 74, 78, 64, 88, 50, 92, 54, 84],
  ],
  [
    "Heidi Klum",
    ["Playful", "Outgoing", "Enterprising"],
    "Big, bright and never off — comedy with a business plan.",
    [86, 94, 86, 68, 78, 60, 80, 68, 92, 78],
  ],
  [
    "Tyra Banks",
    ["Charismatic", "Bold", "Entrepreneurial"],
    "Theatrical, self-made and impossible to ignore.",
    [92, 92, 94, 74, 82, 54, 74, 70, 88, 82],
  ],
  [
    "Emily Ratajkowski",
    ["Outspoken", "Intellectual", "Individual"],
    "Argumentative in the best way — writes her own frame.",
    [88, 68, 78, 90, 84, 52, 68, 80, 66, 66],
  ],
  [
    "Barbara Palvin",
    ["Warm", "Homebody", "Playful"],
    "Sweet, low-drama and happiest in small circles.",
    [66, 70, 62, 60, 62, 84, 56, 74, 78, 64],
  ],
  [
    "Miranda Kerr",
    ["Optimistic", "Wellness-led", "Organized"],
    "Sunny discipline and a wellness-shaped routine.",
    [74, 78, 82, 70, 60, 88, 62, 82, 66, 88],
  ],
  [
    "Doutzen Kroes",
    ["Grounded", "Family-first", "Athletic"],
    "Down-to-earth and physically active, values over noise.",
    [74, 68, 70, 76, 52, 88, 70, 76, 58, 82],
  ],
  [
    "Behati Prinsloo",
    ["Quirky", "Relaxed", "Funny"],
    "Offbeat humor and an unbothered, easy pace.",
    [70, 78, 60, 74, 74, 80, 72, 66, 88, 56],
  ],
  [
    "Karlie Kloss",
    ["Analytical", "Ambitious", "Curious"],
    "Code-and-strategy brain in an editorial world.",
    [80, 76, 94, 76, 74, 78, 66, 82, 62, 94],
  ],
  [
    "Jasmine Tookes",
    ["Steady", "Disciplined", "Kind"],
    "Consistent, athletic and quietly determined.",
    [76, 72, 80, 70, 54, 86, 64, 80, 62, 90],
  ],
  [
    "Josephine Skriver",
    ["Energetic", "Open", "Driven"],
    "High-output, openly enthusiastic, always training.",
    [80, 84, 84, 70, 60, 70, 76, 74, 72, 88],
  ],
  [
    "Romee Strijd",
    ["Gentle", "Balanced", "Calm"],
    "Soft-spoken and balanced, with a slow-living streak.",
    [66, 70, 68, 68, 58, 92, 58, 80, 58, 80],
  ],
  [
    "Sara Sampaio",
    ["Direct", "Protective", "Honest"],
    "Says the quiet part out loud; loyal and blunt.",
    [82, 70, 74, 82, 60, 58, 66, 76, 70, 74],
  ],
  [
    "Elsa Hosk",
    ["Cool", "Creative", "Understated"],
    "Scandi minimalism with a strong personal eye.",
    [74, 66, 76, 80, 82, 82, 64, 88, 60, 78],
  ],
  [
    "Lily Aldridge",
    ["Classic", "Warm", "Musical"],
    "Rock-and-roll warmth with a vintage sensibility.",
    [72, 76, 68, 72, 72, 82, 64, 82, 68, 70],
  ],
  [
    "Kate Upton",
    ["Fun", "Bold", "Unpretentious"],
    "Loud laugh, big energy, no pretense.",
    [84, 90, 72, 70, 58, 62, 74, 60, 90, 62],
  ],
  [
    "Blake Lively",
    ["Witty", "Social", "Stylish"],
    "Fast, funny and endlessly hosting something.",
    [88, 92, 82, 68, 80, 66, 70, 84, 92, 74],
  ],
  [
    "Jessica Alba",
    ["Practical", "Ambitious", "Nurturing"],
    "Founder energy with a family-first center.",
    [80, 74, 92, 76, 66, 78, 58, 76, 66, 92],
  ],
  [
    "Salma Hayek",
    ["Expressive", "Warm", "Fearless"],
    "Big-hearted, funny and completely unafraid.",
    [90, 88, 86, 80, 82, 64, 78, 84, 86, 76],
  ],
  [
    "Penélope Cruz",
    ["Passionate", "Private", "Artistic"],
    "Deeply expressive on screen, guarded off it.",
    [80, 60, 82, 82, 88, 74, 62, 90, 60, 82],
  ],
  [
    "Eva Mendes",
    ["Funny", "Private", "Direct"],
    "Dry humor and a firmly closed front door.",
    [80, 64, 70, 88, 72, 74, 58, 80, 86, 72],
  ],
  [
    "Eva Green",
    ["Mysterious", "Gothic", "Intense"],
    "Otherworldly, bookish and drawn to the strange.",
    [82, 40, 74, 94, 92, 76, 70, 92, 54, 74],
  ],
  [
    "Natalie Portman",
    ["Intellectual", "Precise", "Reserved"],
    "Cerebral and exacting, allergic to fluff.",
    [78, 52, 92, 86, 78, 84, 54, 92, 58, 96],
  ],
  [
    "Scarlett Johansson",
    ["Dry", "Confident", "Adaptable"],
    "Deadpan wit with real range and self-assurance.",
    [88, 72, 86, 82, 80, 72, 70, 84, 82, 78],
  ],
  [
    "Jennifer Connelly",
    ["Serious", "Elegant", "Introspective"],
    "Quiet intelligence and a still, elegant register.",
    [74, 46, 78, 86, 78, 90, 52, 92, 48, 86],
  ],
  [
    "Rachel Weisz",
    ["Literary", "Sharp", "Composed"],
    "Bookish, wry and unshowy about it.",
    [76, 58, 80, 84, 82, 86, 56, 92, 70, 84],
  ],
  [
    "Keira Knightley",
    ["Principled", "Period-classic", "Candid"],
    "Old-soul aesthetics and a very modern candor.",
    [76, 56, 78, 86, 80, 78, 58, 92, 68, 82],
  ],
  [
    "Anne Hathaway",
    ["Earnest", "Disciplined", "Theatrical"],
    "Musical-theatre commitment and relentless prep.",
    [78, 80, 90, 68, 82, 68, 58, 86, 76, 92],
  ],
  [
    "Dua Lipa",
    ["Modern", "Cool", "Ambitious"],
    "Pop-precision, club energy, curated taste.",
    [88, 84, 92, 78, 84, 66, 78, 86, 68, 84],
  ],
  [
    "Beyoncé",
    ["Perfectionist", "Commanding", "Visionary"],
    "Total control of the craft, at scale.",
    [96, 78, 98, 86, 92, 74, 70, 92, 62, 98],
  ],
  [
    "Rihanna",
    ["Unbothered", "Funny", "Entrepreneurial"],
    "Ice-cold cool with a mischievous sense of humor.",
    [96, 86, 92, 92, 90, 78, 84, 88, 94, 70],
  ],
];

const CHAD_ROWS: Row[] = [
  [
    "Henry Cavill",
    ["Disciplined", "Nerdy", "Composed"],
    "Old-fashioned manners, gym discipline and quiet obsessions.",
    [86, 62, 86, 78, 62, 88, 62, 90, 68, 96],
  ],
  [
    "Chris Hemsworth",
    ["Outdoorsy", "Warm", "Playful"],
    "Big, sunny and always outside doing something physical.",
    [88, 90, 82, 70, 60, 78, 92, 68, 88, 84],
  ],
  [
    "David Beckham",
    ["Polished", "Understated", "Meticulous"],
    "Style-obsessed perfectionist with a low-volume manner.",
    [82, 70, 88, 74, 66, 86, 60, 96, 56, 94],
  ],
  [
    "Michael B. Jordan",
    ["Driven", "Charismatic", "Focused"],
    "Relentless work ethic with easy charm.",
    [90, 84, 94, 74, 74, 74, 70, 82, 76, 92],
  ],
  [
    "Brad Pitt",
    ["Cool", "Curious", "Laid-back"],
    "Loose, design-obsessed and quietly restless.",
    [88, 74, 82, 84, 88, 76, 80, 86, 78, 68],
  ],
  [
    "Tom Welling",
    ["Suave", "Witty", "Principled"],
    "Effortless charm with a prankster's streak.",
    [92, 88, 84, 82, 72, 88, 72, 96, 90, 78],
  ],
  [
    "Alain Delon",
    ["Aloof", "Elegant", "Enigmatic"],
    "Icy elegance and total self-containment.",
    [92, 42, 80, 96, 70, 84, 62, 98, 40, 78],
  ],
  [
    "Sean Connery",
    ["Authoritative", "Dry", "Classic"],
    "Commanding, unhurried and dryly funny.",
    [94, 66, 82, 90, 60, 86, 66, 94, 76, 80],
  ],
  [
    "Paul Newman",
    ["Steady", "Generous", "Competitive"],
    "Race-car competitive with a philanthropic core.",
    [86, 74, 82, 84, 70, 88, 82, 90, 74, 88],
  ],
  [
    "Marlon Brando",
    ["Volatile", "Original", "Magnetic"],
    "Rule-breaking instinct and raw magnetism.",
    [92, 54, 74, 96, 98, 44, 76, 80, 62, 40],
  ],
  [
    "Robert Redford",
    ["Independent", "Nature-led", "Idealistic"],
    "Mountain-town independence and slow craft.",
    [80, 58, 82, 92, 84, 88, 82, 86, 60, 84],
  ],
  [
    "Pierce Brosnan",
    ["Gracious", "Refined", "Warm"],
    "Classic charm delivered with real warmth.",
    [84, 78, 74, 74, 68, 90, 62, 94, 72, 78],
  ],
  [
    "Idris Elba",
    ["Cool", "Multitalented", "Grounded"],
    "DJ booth to boardroom without changing pace.",
    [92, 82, 90, 82, 82, 82, 78, 88, 76, 84],
  ],
  [
    "Jason Momoa",
    ["Wild", "Joyful", "Adventurous"],
    "Full-volume enthusiasm and outdoor chaos.",
    [92, 92, 74, 82, 80, 60, 98, 58, 90, 56],
  ],
  [
    "Chris Evans",
    ["Earnest", "Anxious-funny", "Loyal"],
    "Sincere, self-deprecating and dog-obsessed.",
    [72, 78, 74, 62, 68, 68, 58, 72, 84, 76],
  ],
  [
    "Ryan Reynolds",
    ["Sarcastic", "Quick", "Entrepreneurial"],
    "Machine-gun wit with a marketing brain.",
    [88, 88, 90, 74, 82, 62, 68, 72, 98, 82],
  ],
  [
    "Ryan Gosling",
    ["Quiet", "Odd", "Artistic"],
    "Deadpan strangeness under a still surface.",
    [76, 52, 78, 88, 92, 84, 60, 86, 84, 78],
  ],
  [
    "Leonardo DiCaprio",
    ["Intense", "Curious", "Private"],
    "Craft-obsessed with a tight inner circle.",
    [86, 70, 92, 88, 82, 66, 82, 84, 66, 80],
  ],
  [
    "Jon Hamm",
    ["Dry", "Classic", "Self-aware"],
    "Mid-century polish with a comedian hiding inside.",
    [84, 76, 76, 78, 70, 84, 58, 94, 88, 76],
  ],
  [
    "Matthew McConaughey",
    ["Philosophical", "Free", "Charming"],
    "Road-trip philosophy delivered at half speed.",
    [90, 82, 78, 92, 86, 88, 90, 74, 84, 62],
  ],
  [
    "Hugh Jackman",
    ["Generous", "Theatrical", "Disciplined"],
    "Broadway stamina and relentless positivity.",
    [86, 92, 90, 66, 80, 78, 72, 84, 84, 94],
  ],
  [
    "Christian Bale",
    ["Obsessive", "Private", "Transformative"],
    "Total immersion, zero interest in the circus.",
    [84, 34, 96, 94, 88, 60, 66, 80, 44, 98],
  ],
  [
    "Jake Gyllenhaal",
    ["Cerebral", "Committed", "Curious"],
    "Method curiosity and a restless mind.",
    [78, 68, 88, 80, 88, 66, 70, 84, 76, 90],
  ],
  [
    "Oscar Isaac",
    ["Artistic", "Warm", "Intellectual"],
    "Musician's soul and an actor's discipline.",
    [80, 76, 84, 80, 92, 76, 68, 88, 80, 84],
  ],
  [
    "Pedro Pascal",
    ["Affectionate", "Funny", "Open"],
    "Emotionally open and endlessly beloved.",
    [78, 92, 78, 68, 80, 70, 68, 78, 92, 72],
  ],
  [
    "Regé-Jean Page",
    ["Refined", "Articulate", "Composed"],
    "Precision speech and impeccable tailoring.",
    [86, 76, 86, 78, 74, 88, 62, 96, 70, 88],
  ],
  [
    "Jonathan Bailey",
    ["Bright", "Theatrical", "Kind"],
    "Stage-trained sparkle with genuine warmth.",
    [80, 88, 82, 70, 84, 76, 66, 90, 86, 84],
  ],
  [
    "Theo James",
    ["Reserved", "Dry", "Elegant"],
    "Cool detachment with a sharp private wit.",
    [84, 60, 78, 84, 70, 86, 66, 92, 74, 80],
  ],
  [
    "Henry Golding",
    ["Smooth", "Well-travelled", "Gracious"],
    "Travel-host ease and effortless tailoring.",
    [84, 88, 80, 74, 70, 84, 84, 92, 76, 78],
  ],
  [
    "Alexander Skarsgård",
    ["Strange", "Cool", "Fearless"],
    "Nordic oddness and a taste for extremes.",
    [86, 62, 80, 92, 90, 78, 90, 84, 78, 74],
  ],
  [
    "Travis Fimmel",
    ["Rugged", "Untamed", "Mischievous"],
    "Farm-raised, feral humor, allergic to fame.",
    [88, 58, 66, 96, 78, 62, 94, 48, 84, 54],
  ],
  [
    "Charlie Hunnam",
    ["Solitary", "Rugged", "Disciplined"],
    "Motorcycles, isolation and hard training.",
    [84, 48, 84, 94, 70, 76, 88, 70, 62, 92],
  ],
  [
    "Jamie Dornan",
    ["Understated", "Wry", "Musical"],
    "Quietly funny and reluctant about attention.",
    [74, 68, 72, 78, 78, 82, 64, 86, 82, 76],
  ],
  [
    "Matt Bomer",
    ["Polished", "Gentle", "Precise"],
    "Clean-lined elegance and steady kindness.",
    [78, 74, 78, 72, 72, 88, 54, 94, 68, 88],
  ],
  [
    "Michael Fassbender",
    ["Intense", "Competitive", "Private"],
    "Racing-driver focus and a closed door.",
    [88, 58, 92, 90, 78, 68, 86, 86, 62, 92],
  ],
  [
    "Tom Hardy",
    ["Raw", "Loyal", "Unpredictable"],
    "Tough exterior, soft center, unpredictable delivery.",
    [90, 54, 84, 92, 88, 50, 84, 66, 80, 78],
  ],
  [
    "Jensen Ackles",
    ["Easygoing", "Funny", "Loyal"],
    "Southern ease and endless bits with friends.",
    [78, 84, 72, 70, 66, 80, 62, 68, 90, 74],
  ],
  [
    "David Gandy",
    ["Classic", "Meticulous", "Reserved"],
    "Savile Row precision and vintage cars.",
    [80, 58, 78, 82, 60, 88, 58, 98, 54, 90],
  ],
  [
    "Tyson Beckford",
    ["Athletic", "Direct", "Confident"],
    "Motorcycle-fast and blunt about it.",
    [90, 74, 78, 84, 58, 68, 86, 76, 66, 80],
  ],
  [
    "Shemar Moore",
    ["Charming", "Upbeat", "Fit"],
    "High-wattage charm and gym-first routine.",
    [92, 92, 80, 70, 60, 70, 72, 74, 88, 86],
  ],
  [
    "Morris Chestnut",
    ["Steady", "Classic", "Disciplined"],
    "Reliable, well-dressed and quietly consistent.",
    [82, 74, 80, 74, 56, 86, 60, 88, 68, 90],
  ],
  [
    "Boris Kodjoe",
    ["Worldly", "Refined", "Athletic"],
    "Multilingual, well-travelled and composed.",
    [84, 80, 84, 78, 66, 86, 76, 92, 70, 88],
  ],
  [
    "John David Washington",
    ["Focused", "Athletic", "Understated"],
    "Pro-athlete discipline, low-ego delivery.",
    [82, 68, 90, 82, 72, 82, 68, 82, 66, 92],
  ],
  [
    "Mahershala Ali",
    ["Thoughtful", "Serene", "Principled"],
    "Deep stillness and quiet moral clarity.",
    [80, 62, 84, 84, 84, 96, 56, 90, 58, 90],
  ],
  [
    "Trevante Rhodes",
    ["Physical", "Sensitive", "Determined"],
    "Sprinter's body, thoughtful interior.",
    [84, 64, 84, 82, 76, 76, 80, 76, 62, 88],
  ],
  [
    "Charles Melton",
    ["Youthful", "Earnest", "Social"],
    "Bright, sincere and highly social.",
    [76, 88, 80, 64, 74, 70, 74, 74, 82, 76],
  ],
  [
    "Michele Morrone",
    ["Dramatic", "Romantic", "Expressive"],
    "Maximum romance, minimum restraint.",
    [88, 78, 76, 74, 82, 46, 80, 82, 62, 60],
  ],
  [
    "Zayn Malik",
    ["Introverted", "Artistic", "Private"],
    "Studio hermit with a strong personal aesthetic.",
    [66, 30, 76, 92, 94, 72, 56, 84, 60, 68],
  ],
  [
    "Cristiano Ronaldo",
    ["Relentless", "Confident", "Elite"],
    "Superhuman discipline and unapologetic self-belief.",
    [99, 76, 99, 82, 54, 60, 68, 84, 52, 99],
  ],
];

function build(rows: Row[], category: Category): Person[] {
  const seen = new Set<string>();
  const out: Person[] = [];
  for (const [name, traits, description, values] of rows) {
    const id = slug(name);
    if (seen.has(id)) continue; // de-duplicate (e.g. repeated entries in source list)
    seen.add(id);
    out.push({
      id,
      name,
      category,
      ...(PORTRAITS[id] ? { image: PORTRAITS[id] as string } : {}),
      traits,
      description,
      personality_profile: profileFrom(values),
    });
  }
  return out;
}

export const STACIES: Person[] = build(STACY_ROWS, "stacy");
export const CHADS: Person[] = build(CHAD_ROWS, "chad");
export const PEOPLE: Person[] = [...STACIES, ...CHADS];

export function findPerson(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}
