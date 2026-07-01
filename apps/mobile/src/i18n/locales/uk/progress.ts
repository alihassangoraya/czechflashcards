import { ukProgressDashboardTranslations } from "./progress/dashboard";

const ukProgressBaseTranslations = {
  "progress.title": "Панель прогресу",
  "progress.studyStreak": "Серія навчання",
  "progress.masteredVocab": "Засвоєна лексика",
  "progress.weeklyReviews": "Повторення за тиждень",
  "progress.daysInARow": "днів поспіль",
  "progress.goalStreak": "{count} днів із виконаною ціллю поспіль",
  "progress.wordsMastered": "засвоєних слів",
  "progress.cardsThisWeek": "карток цього тижня",
  "progress.studiedCards": "Вивчені картки",
  "progress.cardsTouched": "відкритих карток",
  "progress.customWords": "Власні слова",
  "progress.wordsAdded": "доданих слів",
  "progress.savedWords": "Збережені слова",
  "progress.savedForReview": "збережено для повторення",
  "progress.dailyGoal": "Денна навчальна ціль",
  "progress.goalDone": "Ціль на сьогодні виконано.",
  "progress.goalRemaining": "Сьогодні залишилось {count} карток.",
  "progress.sevenDayActivity": "Активність за 7 днів",
  "progress.masteryDistribution": "Розподіл засвоєння",
  "progress.mastered": "Засвоєно",
  "progress.learning": "Вивчається",
  "progress.unseen": "Не розпочато"
} as const;

export const ukProgressTranslations = {
  ...ukProgressBaseTranslations,
  ...ukProgressDashboardTranslations
} as const;
