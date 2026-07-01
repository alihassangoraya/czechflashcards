import { urProgressDashboardTranslations } from "./progress/dashboard";

const urProgressBaseTranslations = {
  "progress.title": "پروگریس ڈیش بورڈ",
  "progress.studyStreak": "اسٹڈی اسٹریک",
  "progress.masteredVocab": "ماسٹر الفاظ",
  "progress.weeklyReviews": "ہفتہ وار ریویوز",
  "progress.daysInARow": "دن مسلسل",
  "progress.goalStreak": "{count} ہدف دن مسلسل",
  "progress.wordsMastered": "الفاظ ماسٹر",
  "progress.cardsThisWeek": "اس ہفتے کارڈز",
  "progress.studiedCards": "پڑھے گئے کارڈز",
  "progress.cardsTouched": "کھولے گئے کارڈز",
  "progress.customWords": "کسٹم الفاظ",
  "progress.wordsAdded": "شامل کیے گئے الفاظ",
  "progress.savedWords": "محفوظ الفاظ",
  "progress.savedForReview": "ریویو کے لیے محفوظ",
  "progress.dailyGoal": "روزانہ سیکھنے کا ہدف",
  "progress.goalDone": "آج کا ہدف مکمل۔",
  "progress.goalRemaining": "آج {count} کارڈز باقی۔",
  "progress.sevenDayActivity": "7 دن کی سرگرمی",
  "progress.masteryDistribution": "ماسٹری تقسیم",
  "progress.mastered": "ماسٹر",
  "progress.learning": "سیکھ رہے",
  "progress.unseen": "شروع نہیں"
} as const;

export const urProgressTranslations = {
  ...urProgressBaseTranslations,
  ...urProgressDashboardTranslations
} as const;
