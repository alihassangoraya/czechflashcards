import type { TranslationKey } from "../../i18n/translations";
import { buildQuizResultModel } from "./quizResultModel";
import type { QuizResultSummaryProps } from "./components/QuizResultSummary";

type Input = {
  score: number;
  total: number;
  textAlign: QuizResultSummaryProps["textAlign"];
  translate: (key: TranslationKey) => string;
};

export function buildQuizResultSummaryProps({ score, total, textAlign, translate }: Input): QuizResultSummaryProps {
  const result = buildQuizResultModel(score, total);
  return {
    score,
    total,
    missed: result.missed,
    accuracy: result.finalAccuracy,
    feedback: translate(result.feedbackKey),
    textAlign,
    labels: {
      score: translate("quiz.yourScore"),
      correct: translate("quiz.correct"),
      missed: translate("quiz.missed"),
      accuracy: translate("quiz.accuracy")
    }
  };
}
