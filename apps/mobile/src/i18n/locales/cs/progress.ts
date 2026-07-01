import { csProgressDashboardTranslations } from "./progress/dashboard";

const csProgressBaseTranslations = {
  "progress.title": "Přehled pokroku",
  "progress.studyStreak": "Studijní série",
  "progress.masteredVocab": "Zvládnutá slovní zásoba",
  "progress.weeklyReviews": "Týdenní opakování",
  "progress.daysInARow": "dní v řadě",
  "progress.goalStreak": "{count} cílových dní v řadě",
  "progress.wordsMastered": "zvládnutých slov",
  "progress.cardsThisWeek": "kartiček tento týden",
  "progress.studiedCards": "Prostudované kartičky",
  "progress.cardsTouched": "otevřených kartiček",
  "progress.customWords": "Vlastní slova",
  "progress.wordsAdded": "přidaných slov",
  "progress.savedWords": "Uložená slova",
  "progress.savedForReview": "uloženo k opakování",
  "progress.dailyGoal": "Denní učební cíl",
  "progress.goalDone": "Dnešní cíl je hotový.",
  "progress.goalRemaining": "Dnes zbývá {count} kartiček.",
  "progress.sevenDayActivity": "Aktivita za 7 dní",
  "progress.masteryDistribution": "Rozložení zvládnutí",
  "progress.mastered": "Zvládnuto",
  "progress.learning": "Učím se",
  "progress.unseen": "Nezačato"
} as const;

export const csProgressTranslations = {
  ...csProgressBaseTranslations,
  ...csProgressDashboardTranslations
} as const;
