import type { TranslationKey } from "../../i18n/translations";

export type QuizResultModel = {
  finalAccuracy: number;
  missed: number;
  feedbackKey: TranslationKey;
};

export function buildQuizResultModel(score: number, total: number): QuizResultModel {
  const finalAccuracy = Math.round((score / total) * 100);
  return {
    finalAccuracy,
    missed: total - score,
    feedbackKey: feedbackKeyFor(score, total, finalAccuracy)
  };
}

function feedbackKeyFor(score: number, total: number, finalAccuracy: number): TranslationKey {
  if (score === total) return "quiz.feedbackPerfect";
  if (finalAccuracy >= 80) return "quiz.feedbackStrong";
  if (finalAccuracy >= 50) return "quiz.feedbackReview";
  return "quiz.feedbackKeepGoing";
}
