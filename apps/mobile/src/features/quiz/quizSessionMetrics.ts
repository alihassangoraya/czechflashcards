import type { Question } from "./quizQuestions";

type QuizMetricsInput = {
  checked: boolean;
  index: number;
  question: Question | undefined;
  score: number;
  selected: number | null;
};

export function deriveQuizMetrics({ checked, index, question, score, selected }: QuizMetricsInput) {
  const answeredCount = index + (checked ? 1 : 0);
  return {
    accuracy: answeredCount ? Math.round((score / answeredCount) * 100) : 0,
    hasProgress: index > 0 || selected !== null || checked || score > 0,
    isCorrect: Boolean(question && selected === question.correctIndex)
  };
}
