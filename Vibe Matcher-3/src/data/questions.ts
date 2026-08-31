import type { Dimension } from "./dimensions";
import type { Category } from "./people";

export interface Option {
  id: string;
  label: string;
  w: Partial<Record<Dimension, number>>;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

const q = (id: string, text: string, options: [string, Partial<Record<Dimension, number>>][]): Question => ({
  id,
  text,
  options: options.map(([label, w], index) => ({ id: `${id}-${index}`, label, w })),
});

const scale = (
  id: string,
  text: string,
  dimension: Dimension,
  low: string,
  high: string,
  secondary?: Dimension,
): Question =>
  q(id, text, [
    [low, { [dimension]: 15, ...(secondary ? { [secondary]: 72 } : {}) }],
    ["A little", { [dimension]: 35 }],
    ["Somewhere in the middle", { [dimension]: 55 }],
    ["Quite a lot", { [dimension]: 78 }],
    [high, { [dimension]: 96, ...(secondary ? { [secondary]: 88 } : {}) }],
  ]);

export const STACY_QUESTIONS: Question[] = [
  q("stacy-entrance", "You arrive at an event where you know almost nobody. What happens?", [
    ["I introduce myself before anyone can hesitate", { confidence: 94, sociability: 90 }],
    ["I find one interesting person and go deep", { sociability: 58, sophistication: 80 }],
    ["I observe first, then choose my moment", { calmness: 88, independence: 78 }],
    ["I let my look do the opening", { confidence: 86, creativity: 82, sophistication: 88 }],
    ["I would rather skip the room entirely", { independence: 92, sociability: 18 }],
  ]),
  q("stacy-style", "Which approach best describes your personal style?", [
    ["Immaculate and timeless", { sophistication: 96, discipline: 84 }],
    ["Bold enough to become the conversation", { confidence: 94, creativity: 90 }],
    ["Relaxed, natural, effortless", { calmness: 88, sophistication: 58 }],
    ["Unexpected and unmistakably mine", { creativity: 97, independence: 94 }],
    ["Practical first, polished second", { discipline: 86, sophistication: 62 }],
  ]),
  q("stacy-spotlight", "The spotlight lands on you unexpectedly. You…", [
    ["Own it immediately", { confidence: 98, sociability: 88 }],
    ["Turn it into a shared moment", { sociability: 92, humor: 82 }],
    ["Stay composed and say exactly enough", { calmness: 94, sophistication: 92 }],
    ["Redirect it toward the work", { ambition: 86, independence: 78 }],
    ["Escape as elegantly as possible", { independence: 88, sociability: 24 }],
  ]),
  q("stacy-power", "What kind of power feels most natural to you?", [
    ["Quiet influence", { calmness: 88, sophistication: 92 }],
    ["Visible leadership", { confidence: 95, ambition: 90 }],
    ["Creative originality", { creativity: 97, independence: 86 }],
    ["Social magnetism", { sociability: 96, humor: 78 }],
    ["Relentless preparation", { discipline: 97, ambition: 88 }],
  ]),
  q("stacy-weekend", "Your ideal free Saturday has the energy of…", [
    ["A gallery, a long lunch, and perfect tailoring", { sophistication: 94, creativity: 78 }],
    ["A spontaneous road trip", { adventurousness: 96, independence: 76 }],
    ["A full house and music until late", { sociability: 96, humor: 82 }],
    ["A private reset with no notifications", { calmness: 96, independence: 90 }],
    ["Training, planning, and getting ahead", { discipline: 96, ambition: 92 }],
  ]),
  q("stacy-conflict", "When someone underestimates you, what is your move?", [
    ["Correct them directly", { confidence: 96, calmness: 48 }],
    ["Let the result speak later", { discipline: 94, ambition: 90, calmness: 84 }],
    ["Make a joke and keep moving", { humor: 92, confidence: 80 }],
    ["Remember it, but reveal nothing", { independence: 90, sophistication: 86 }],
    ["Ask what made them think that", { sociability: 74, calmness: 88 }],
  ]),
  q("stacy-host", "If you hosted the perfect dinner, what would matter most?", [
    ["The guest list", { sociability: 94 }],
    ["The visual world", { creativity: 94, sophistication: 90 }],
    ["Every detail running flawlessly", { discipline: 96 }],
    ["People feeling genuinely at home", { calmness: 86, sociability: 80 }],
    ["A night nobody could have planned", { adventurousness: 90, humor: 84 }],
  ]),
  q("stacy-career", "Which career fantasy has the strongest pull?", [
    ["Building an empire with my name on it", { ambition: 98, confidence: 90 }],
    ["Mastering a craft away from the noise", { discipline: 94, independence: 90 }],
    ["Creating work that changes the conversation", { creativity: 96, ambition: 84 }],
    ["Leading people toward something meaningful", { confidence: 88, sociability: 82 }],
    ["Having freedom over my time", { independence: 96, calmness: 82 }],
  ]),
  scale("stacy-confidence", "How comfortable are you taking up space?", "confidence", "I prefer to disappear", "The room adjusts to me", "sociability"),
  scale("stacy-independence", "How strongly do you protect your independence?", "independence", "I thrive through togetherness", "It is non-negotiable", "confidence"),
  scale("stacy-ambition", "How ambitious are you about the life you want?", "ambition", "Peace matters more than achievement", "I plan to reach the very top", "discipline"),
  scale("stacy-sociability", "How energized are you by a full social calendar?", "sociability", "It drains me", "I come alive", "humor"),
  scale("stacy-creativity", "How much does self-expression shape your choices?", "creativity", "Rarely", "Almost everything is expression", "independence"),
  scale("stacy-calmness", "How composed are you when plans collapse?", "calmness", "My emotions arrive first", "Almost impossible to rattle", "discipline"),
  scale("stacy-adventure", "How willing are you to reinvent your life?", "adventurousness", "I protect what is familiar", "I would start over tomorrow", "independence"),
  scale("stacy-sophistication", "How much do refinement and taste matter to you?", "sophistication", "Not at all", "They shape my whole world", "creativity"),
  scale("stacy-humor", "How often is humor your social superpower?", "humor", "I tend to stay serious", "Constantly", "sociability"),
  scale("stacy-discipline", "How structured is your pursuit of a goal?", "discipline", "I follow inspiration", "Every step is planned", "ambition"),
  q("stacy-compliment", "Which compliment would stay with you longest?", [
    ["You are unforgettable", { confidence: 94, creativity: 82 }],
    ["You make people feel seen", { sociability: 88, calmness: 80 }],
    ["Your taste is impeccable", { sophistication: 98 }],
    ["Nobody works harder", { discipline: 96, ambition: 88 }],
    ["You are completely yourself", { independence: 98, creativity: 84 }],
  ]),
  q("stacy-travel", "Choose the trip that feels most like you.", [
    ["A private Italian villa", { sophistication: 96, calmness: 86 }],
    ["A fashion-week city sprint", { ambition: 86, sociability: 88 }],
    ["A remote beach with no schedule", { calmness: 92, independence: 84 }],
    ["An unfamiliar country with one carry-on", { adventurousness: 98, confidence: 82 }],
    ["A creative retreat in a historic city", { creativity: 92, sophistication: 88 }],
  ]),
  q("stacy-pressure", "A high-stakes opportunity arrives with no warning. You…", [
    ["Say yes, then figure it out", { confidence: 94, adventurousness: 90 }],
    ["Prepare until there are no surprises", { discipline: 98, ambition: 92 }],
    ["Bring in people whose strengths complement mine", { sociability: 84, confidence: 78 }],
    ["Find the most original angle", { creativity: 96, independence: 82 }],
    ["Slow everything down and think", { calmness: 94, sophistication: 78 }],
  ]),
  q("stacy-romance", "Your romantic energy is closest to…", [
    ["Warm, playful, openly affectionate", { sociability: 90, humor: 84 }],
    ["Intense, private, all or nothing", { independence: 90, confidence: 86 }],
    ["Elegant, measured, slow to reveal", { sophistication: 94, calmness: 88 }],
    ["Spontaneous and impossible to predict", { adventurousness: 96, creativity: 82 }],
    ["Loyal, steady, built for the long term", { discipline: 90, calmness: 92 }],
  ]),
  q("stacy-aesthetic", "Pick the room you would make your own.", [
    ["Minimal stone and sculptural furniture", { sophistication: 94, calmness: 82 }],
    ["Color, art, books, and beautiful chaos", { creativity: 98, adventurousness: 76 }],
    ["A classic room with perfect proportions", { sophistication: 92, discipline: 82 }],
    ["Sunlight, plants, and open doors", { calmness: 90, sociability: 74 }],
    ["A dramatic room designed for entrances", { confidence: 94, creativity: 86 }],
  ]),
  scale("stacy-mystery", "How much of yourself do you keep private?", "independence", "Very little", "Almost everything important", "sophistication"),
  scale("stacy-competition", "How competitive are you when excellence is on the line?", "ambition", "I do not compare", "I intend to win", "confidence"),
  scale("stacy-routine", "How important is a personal routine?", "discipline", "Routine feels restrictive", "It keeps me powerful", "calmness"),
  q("stacy-friend", "In your closest circle, you are usually the…", [
    ["Planner", { discipline: 92, sociability: 76 }],
    ["Truth-teller", { confidence: 92, independence: 82 }],
    ["Entertainer", { humor: 96, sociability: 92 }],
    ["Calm advisor", { calmness: 96, sophistication: 76 }],
    ["One proposing something wild", { adventurousness: 96, creativity: 86 }],
  ]),
  q("stacy-setback", "After a public setback, what restores you?", [
    ["A private plan for the comeback", { ambition: 94, independence: 88 }],
    ["Talking honestly with my people", { sociability: 88, calmness: 70 }],
    ["Making something new from it", { creativity: 96, adventurousness: 80 }],
    ["Returning to my routine", { discipline: 94, calmness: 88 }],
    ["Laughing before anyone else can", { humor: 96, confidence: 86 }],
  ]),
  q("stacy-legacy", "What would you most want your legacy to say?", [
    ["She changed the standard", { ambition: 98, confidence: 92 }],
    ["She made beauty feel original", { creativity: 96, sophistication: 90 }],
    ["She lived entirely on her own terms", { independence: 98, adventurousness: 84 }],
    ["She brought people together", { sociability: 94, humor: 76 }],
    ["She carried herself with grace", { calmness: 94, sophistication: 94 }],
  ]),
  scale("stacy-risk", "How much risk belongs in a life well lived?", "adventurousness", "Very little", "The best parts require it", "confidence"),
  scale("stacy-presence", "How naturally magnetic is your presence?", "confidence", "I am quietly in the background", "People notice before I speak", "sociability"),
  q("stacy-final", "Choose the phrase that feels most like your signature.", [
    ["Soft voice, strong point of view", { calmness: 88, independence: 92 }],
    ["More is more", { creativity: 94, confidence: 90 }],
    ["Elegance is precision", { sophistication: 98, discipline: 90 }],
    ["Make it fun, then make it happen", { humor: 90, ambition: 88, sociability: 86 }],
    ["Freedom over approval", { independence: 98, adventurousness: 90 }],
  ]),
];

export const CHAD_QUESTIONS: Question[] = [
  q("chad-crisis", "A plan falls apart while everyone looks to you. What do you do?", [
    ["Take command and assign the next moves", { confidence: 96, discipline: 88 }],
    ["Stay calm and solve the immediate problem", { calmness: 96, discipline: 84 }],
    ["Improvise something nobody expected", { creativity: 90, adventurousness: 92 }],
    ["Crack a joke and reset the room", { humor: 94, sociability: 86 }],
    ["Handle my part without making a speech", { independence: 90, calmness: 82 }],
  ]),
  q("chad-weekend", "Your ideal weekend challenge is…", [
    ["A difficult hike somewhere remote", { adventurousness: 96, independence: 84 }],
    ["Building or restoring something by hand", { discipline: 92, creativity: 78 }],
    ["Winning a tournament with friends", { ambition: 90, sociability: 88 }],
    ["Hosting a legendary dinner", { sociability: 94, sophistication: 82 }],
    ["Mastering a niche skill in peace", { independence: 92, discipline: 90 }],
  ]),
  q("chad-lead", "What does strong leadership look like to you?", [
    ["Deciding quickly under pressure", { confidence: 96, calmness: 78 }],
    ["Setting the standard through discipline", { discipline: 98, ambition: 88 }],
    ["Listening before speaking", { calmness: 94, sociability: 70 }],
    ["Giving people courage", { sociability: 90, confidence: 88 }],
    ["Finding the unconventional route", { creativity: 94, independence: 86 }],
  ]),
  q("chad-style", "Your best-dressed version of yourself is…", [
    ["A perfectly cut dark suit", { sophistication: 98, discipline: 84 }],
    ["A worn jacket that has stories", { adventurousness: 82, independence: 84 }],
    ["Clean, athletic, understated", { discipline: 90, calmness: 76 }],
    ["Experimental but intentional", { creativity: 94, confidence: 86 }],
    ["Relaxed enough to forget about it", { calmness: 88, sophistication: 42 }],
  ]),
  q("chad-respect", "Which kind of respect matters most?", [
    ["Being known as dependable", { discipline: 94, calmness: 86 }],
    ["Being recognized as the best", { ambition: 98, confidence: 92 }],
    ["Being trusted with hard decisions", { confidence: 90, sophistication: 80 }],
    ["Being impossible to control", { independence: 98, adventurousness: 82 }],
    ["Being the person everyone wants around", { sociability: 94, humor: 84 }],
  ]),
  q("chad-craft", "How do you approach a craft you care about?", [
    ["Repeat it until it is exact", { discipline: 98, ambition: 88 }],
    ["Study the masters, then refine", { sophistication: 90, discipline: 90 }],
    ["Break its rules and make it mine", { creativity: 98, independence: 92 }],
    ["Learn by doing it in the real world", { adventurousness: 88, confidence: 80 }],
    ["Make the process social and fun", { sociability: 90, humor: 88 }],
  ]),
  q("chad-pressure", "Before a high-pressure moment, your ritual is…", [
    ["Visualize the win", { confidence: 94, ambition: 88 }],
    ["Check every detail once more", { discipline: 98, calmness: 76 }],
    ["Find a quiet room", { independence: 90, calmness: 94 }],
    ["Keep everyone loose with humor", { humor: 94, sociability: 88 }],
    ["Do something physical", { adventurousness: 84, discipline: 86 }],
  ]),
  q("chad-night", "Pick your ideal night out.", [
    ["A classic restaurant where they know my name", { sophistication: 94, sociability: 84 }],
    ["A concert, then wherever the night goes", { adventurousness: 92, sociability: 90 }],
    ["A game with close friends", { humor: 86, sociability: 84 }],
    ["One drink and an early exit", { calmness: 88, discipline: 82 }],
    ["I would rather work on my own project", { independence: 94, ambition: 86 }],
  ]),
  scale("chad-confidence", "How easily do you back yourself in uncertain situations?", "confidence", "I need reassurance", "Without hesitation", "calmness"),
  scale("chad-discipline", "How disciplined is your daily routine?", "discipline", "I resist routines", "Everything has a system", "ambition"),
  scale("chad-ambition", "How far are you willing to push for mastery?", "ambition", "Balance comes first", "As far as it takes", "discipline"),
  scale("chad-independence", "How comfortable are you operating alone?", "independence", "I need a team around me", "I do my best work alone", "calmness"),
  scale("chad-sociability", "How much energy do you draw from a crowd?", "sociability", "Crowds drain me", "I command them naturally", "confidence"),
  scale("chad-adventure", "How often do you seek physical or real-world adventure?", "adventurousness", "Almost never", "Whenever possible", "confidence"),
  scale("chad-calmness", "How steady are you when provoked?", "calmness", "I react instantly", "I stay completely measured", "discipline"),
  scale("chad-humor", "How central is humor to your charm?", "humor", "I am mostly serious", "It is my strongest move", "sociability"),
  scale("chad-taste", "How much attention do you give to quality and taste?", "sophistication", "Function is enough", "Every detail matters", "discipline"),
  scale("chad-originality", "How strongly do you resist doing what is expected?", "creativity", "I value proven paths", "I make my own rules", "independence"),
  q("chad-team", "On a strong team, which role fits you?", [
    ["Captain", { confidence: 96, sociability: 82 }],
    ["Strategist", { sophistication: 88, discipline: 90 }],
    ["Specialist", { independence: 90, discipline: 94 }],
    ["Wildcard", { creativity: 94, adventurousness: 92 }],
    ["Morale engine", { humor: 96, sociability: 94 }],
  ]),
  q("chad-loss", "After losing at something important, you…", [
    ["Train until it cannot happen again", { discipline: 98, ambition: 96 }],
    ["Study the loss without emotion", { calmness: 94, sophistication: 80 }],
    ["Challenge the winner to a rematch", { confidence: 94, adventurousness: 82 }],
    ["Laugh, congratulate them, and move on", { humor: 90, sociability: 82 }],
    ["Change the game entirely", { creativity: 94, independence: 88 }],
  ]),
  q("chad-travel", "Which journey sounds worth taking?", [
    ["Driving a classic car across a continent", { adventurousness: 94, sophistication: 82 }],
    ["A remote expedition with a small crew", { adventurousness: 98, independence: 88 }],
    ["A precise city itinerary built around food", { sophistication: 94, discipline: 78 }],
    ["A cabin, books, and no signal", { calmness: 96, independence: 92 }],
    ["Following friends with no real plan", { sociability: 92, humor: 80 }],
  ]),
  q("chad-compliment", "Which compliment would mean the most?", [
    ["You always deliver", { discipline: 98, ambition: 84 }],
    ["You make hard things look easy", { confidence: 94, calmness: 88 }],
    ["You are unlike anyone else", { creativity: 96, independence: 94 }],
    ["People trust you", { calmness: 92, sociability: 78 }],
    ["You are the funniest person here", { humor: 98, sociability: 88 }],
  ]),
  q("chad-home", "Your ideal home base feels like…", [
    ["A sharp city apartment", { sophistication: 94, ambition: 76 }],
    ["A house near mountains or ocean", { adventurousness: 88, calmness: 88 }],
    ["A workshop with room for projects", { creativity: 90, independence: 88 }],
    ["A lively place where friends drop in", { sociability: 94, humor: 78 }],
    ["A quiet, ordered sanctuary", { discipline: 88, calmness: 94 }],
  ]),
  scale("chad-risk", "How much calculated risk are you willing to carry?", "adventurousness", "Very little", "A great deal", "ambition"),
  scale("chad-leadership", "How naturally do you take the lead?", "confidence", "I prefer supporting", "It happens automatically", "ambition"),
  scale("chad-focus", "How long can you stay locked onto one difficult goal?", "discipline", "I need variety", "Until it is done", "ambition"),
  q("chad-disagreement", "In a serious disagreement, you tend to…", [
    ["State the point plainly", { confidence: 94, calmness: 62 }],
    ["Keep asking questions until the truth appears", { sophistication: 88, calmness: 86 }],
    ["Use humor to lower the temperature", { humor: 94, sociability: 84 }],
    ["Step away and decide privately", { independence: 94, calmness: 82 }],
    ["Find the practical compromise", { discipline: 80, sociability: 82 }],
  ]),
  q("chad-freedom", "What does freedom look like?", [
    ["Owning my time", { independence: 98, ambition: 82 }],
    ["Going anywhere at a moment's notice", { adventurousness: 98, confidence: 82 }],
    ["Having the resources to choose", { ambition: 94, discipline: 88 }],
    ["Being fully myself in public", { creativity: 90, confidence: 92 }],
    ["A peaceful life with people I trust", { calmness: 94, sociability: 76 }],
  ]),
  q("chad-legacy", "Which legacy feels most worthwhile?", [
    ["A body of work nobody can dismiss", { ambition: 98, discipline: 96 }],
    ["A life of bold stories", { adventurousness: 98, confidence: 84 }],
    ["A reputation for character", { calmness: 92, sophistication: 86 }],
    ["Ideas that changed the form", { creativity: 98, independence: 90 }],
    ["A circle that still tells my jokes", { humor: 94, sociability: 92 }],
  ]),
  q("chad-hospitality", "When people enter your space, what do you want them to feel?", [
    ["Immediately welcome", { sociability: 96, calmness: 78 }],
    ["Impressed by the details", { sophistication: 94, discipline: 84 }],
    ["Ready for an unforgettable night", { adventurousness: 88, humor: 86 }],
    ["Curious about what I am building", { creativity: 92, independence: 86 }],
    ["Certain that everything is handled", { confidence: 90, discipline: 92 }],
  ]),
  q("chad-instinct", "A rare opportunity appears with no guarantee. Your instinct is to…", [
    ["Take it before the window closes", { adventurousness: 98, confidence: 90 }],
    ["Measure the downside, then commit", { sophistication: 88, calmness: 88 }],
    ["Build a rigorous plan first", { discipline: 96, ambition: 90 }],
    ["Bring the right people with me", { sociability: 92, confidence: 80 }],
    ["Reshape it into something original", { creativity: 96, independence: 90 }],
  ]),
  q("chad-final", "Choose the line closest to your operating code.", [
    ["Do the work, then let it speak", { discipline: 96, independence: 86 }],
    ["Stay ready so you never have to get ready", { discipline: 94, confidence: 88 }],
    ["Take the road with the better story", { adventurousness: 96, creativity: 84 }],
    ["Charm opens doors; character keeps them open", { sociability: 90, sophistication: 88 }],
    ["Never become predictable", { creativity: 96, independence: 94 }],
  ]),
];

export const QUESTIONS_BY_CATEGORY: Record<Category, Question[]> = {
  stacy: STACY_QUESTIONS,
  chad: CHAD_QUESTIONS,
};

export const QUESTION_COUNTS: Record<Category, number> = {
  stacy: STACY_QUESTIONS.length,
  chad: CHAD_QUESTIONS.length,
};
