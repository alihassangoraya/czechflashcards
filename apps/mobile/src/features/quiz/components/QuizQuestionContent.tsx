import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import type { Question } from "../quizQuestions";
import { QuizFeedback } from "./QuizFeedback";
import { QuizOptionsList } from "./QuizOptionsList";
import { QuizPrimaryAction } from "./QuizPrimaryAction";
import { QuizProgress } from "./QuizProgress";
import { QuizPromptCard } from "./QuizPromptCard";

type Props = {
  accuracy: number;
  checked: boolean;
  index: number;
  isCorrect: boolean;
  next: () => void;
  question: Question;
  selected: number | null;
  setSelected: (optionIndex: number) => void;
  total: number;
};

export function QuizQuestionContent({ accuracy, checked, index, isCorrect, next, question, selected, setSelected, total }: Props) {
  const { t } = useI18n();
  const isFinalQuestion = index + 1 === total;
  const actionLabel = checked ? (isFinalQuestion ? t("quiz.seeResults") : t("quiz.nextQuestion")) : t("quiz.checkAnswer");

  return (
    <>
      <QuizProgress current={index + 1} total={total} accuracy={accuracy} />
      <QuizPromptCard card={question.card} />
      <QuizOptionsList options={question.options} correctIndex={question.correctIndex} selected={selected} checked={checked} onSelect={setSelected} />
      {checked && <QuizFeedback correct={isCorrect} correctAnswer={question.options[question.correctIndex]} />}
      <QuizPrimaryAction disabled={selected == null} label={actionLabel} checked={checked} onPress={next} />
    </>
  );
}
