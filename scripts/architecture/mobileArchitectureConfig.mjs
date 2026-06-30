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
  ["StudyAnimations", "app/studyAnimationTypes.ts"],
  ["SwipeDirection", "features/study/animations/animationTypes.ts"]
]);
