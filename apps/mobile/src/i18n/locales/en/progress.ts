import { enProgressDashboardTranslations } from "./progress/dashboard";

const enProgressBaseTranslations = {
  "progress.title": "Progress Dashboard",
  "progress.studyStreak": "Study streak",
  "progress.masteredVocab": "Vocabulary mastered",
  "progress.weeklyReviews": "Weekly reviews",
  "progress.daysInARow": "days in a row",
  "progress.goalStreak": "{count} goal days in a row",
  "progress.wordsMastered": "words mastered",
  "progress.cardsThisWeek": "cards this week",
  "progress.studiedCards": "Studied cards",
  "progress.cardsTouched": "cards opened",
  "progress.customWords": "Custom words",
  "progress.wordsAdded": "words added",
  "progress.savedWords": "Saved words",
  "progress.savedForReview": "saved for review",
  "progress.dailyGoal": "Daily learning goal",
  "progress.goalDone": "Goal complete for today.",
  "progress.goalRemaining": "{count} cards left today.",
  "progress.sevenDayActivity": "7-day activity",
  "progress.masteryDistribution": "Mastery distribution",
  "progress.mastered": "Mastered",
  "progress.learning": "Learning",
  "progress.unseen": "Not started"
} as const;

export const enProgressTranslations = {
  ...enProgressBaseTranslations,
  ...enProgressDashboardTranslations
} as const;
