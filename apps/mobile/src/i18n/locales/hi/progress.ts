import { hiProgressDashboardTranslations } from "./progress/dashboard";

const hiProgressBaseTranslations = {
  "progress.title": "प्रोग्रेस डैशबोर्ड",
  "progress.studyStreak": "स्टडी स्ट्रीक",
  "progress.masteredVocab": "मास्टर शब्द",
  "progress.weeklyReviews": "साप्ताहिक रिव्यू",
  "progress.daysInARow": "दिन लगातार",
  "progress.goalStreak": "{count} लक्ष्य दिन लगातार",
  "progress.wordsMastered": "शब्द मास्टर",
  "progress.cardsThisWeek": "इस हफ्ते कार्ड",
  "progress.studiedCards": "पढ़े हुए कार्ड",
  "progress.cardsTouched": "खोले गए कार्ड",
  "progress.customWords": "कस्टम शब्द",
  "progress.wordsAdded": "जोड़े गए शब्द",
  "progress.savedWords": "सेव शब्द",
  "progress.savedForReview": "रिव्यू के लिए सेव",
  "progress.dailyGoal": "दैनिक सीखने का लक्ष्य",
  "progress.goalDone": "आज का लक्ष्य पूरा.",
  "progress.goalRemaining": "आज {count} कार्ड बाकी.",
  "progress.sevenDayActivity": "7 दिन की गतिविधि",
  "progress.masteryDistribution": "मास्टरी वितरण",
  "progress.mastered": "मास्टर",
  "progress.learning": "सीख रहे",
  "progress.unseen": "शुरू नहीं"
} as const;

export const hiProgressTranslations = {
  ...hiProgressBaseTranslations,
  ...hiProgressDashboardTranslations
} as const;
