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
  ["AuthMode", "services/sync/syncTypes.ts"],
  ["DeckMemberships", "services/storage/storageTypes.ts"],
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
    pattern: /\bsavedCardIds:\s*(?:Readonly)?Set<string>/,
    message: "use SavedCardIds instead of a raw saved-card set"
  }
];
