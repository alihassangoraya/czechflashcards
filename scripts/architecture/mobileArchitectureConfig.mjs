export const defaultMaxLines = 90;

export const maxLinesByPath = new Map([
  ["components/MaterialIcons.tsx", 110],
  ["theme/tokens/colors.ts", 120]
]);

export const localeLanguages = ["en", "cs", "hi", "ur"];
export const localeSections = ["account", "core", "home", "quiz", "search", "settings", "study", "words"];

export const hardcodedTextAllowList = new Set([
  "features/home/homeContent.ts",
  "features/words/wordDecks.ts",
  "features/settings/settingsFormat.ts",
  "components/MaterialIcons.tsx"
]);

export const ignoredMobileDirectories = new Set(["assets", "dist", "node_modules"]);
export const allowedRootServiceFiles = new Set(["services/fileTransfer.ts"]);

export const canonicalTypeFiles = new Map([
  ["AppSupabaseClient", "services/sync/supabaseClient.ts"],
  ["AuthMode", "services/sync/syncTypes.ts"],
  ["CardOverrides", "services/storage/storageTypes.ts"],
  ["CustomCards", "services/storage/storageTypes.ts"],
  ["DailyProgressLog", "services/storage/storageTypes.ts"],
  ["DeckMemberships", "services/storage/storageTypes.ts"],
  ["ReviewStates", "services/storage/storageTypes.ts"],
  ["SavedCardIds", "services/storage/storageTypes.ts"],
  ["StudyAnimations", "app/studyAnimationTypes.ts"],
  ["SwipeDirection", "features/study/animations/animationTypes.ts"]
]);

export const rawCollectionTypeRules = [
  {
    pattern: /\bdeckMemberships:\s*Record<string,\s*string\[\]>/,
    message: "use DeckMemberships instead of a raw deck membership map"
  },
  {
    pattern: /\b(?:dailyProgress|dailyLog):\s*Record<string,\s*DailyProgress>/,
    message: "use DailyProgressLog instead of a raw daily-progress map"
  },
  {
    pattern: /\bcustomCards:\s*Record<string,\s*CustomCard>/,
    message: "use CustomCards instead of a raw custom-card map"
  },
  {
    pattern: /\b(?:overrides|editedCards):\s*Record<string,\s*Card>/,
    message: "use CardOverrides instead of a raw card-override map"
  },
  {
    pattern: /\b(?:states|reviewStates|progress):\s*Record<string,\s*ReviewState>/,
    message: "use ReviewStates instead of a raw review-state map"
  },
  {
    pattern: /\bsavedCardIds:\s*(?:Readonly)?Set<string>/,
    message: "use SavedCardIds instead of a raw saved-card set"
  },
  {
    pattern: /(?:ReturnType<typeof createSupabaseClient>|SupabaseClient\s*\|\s*null)/,
    message: "use AppSupabaseClient instead of a raw Supabase client union"
  }
];
