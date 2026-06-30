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
  { pattern: /\bsavedCardIds:\s*(?:Readonly)?Set<string>/, message: "use SavedCardIds instead of a raw saved-card set" },
  { pattern: /(?:ReturnType<typeof createSupabaseClient>|SupabaseClient\s*\|\s*null)/, message: "use AppSupabaseClient instead of a raw Supabase client union" }
];
