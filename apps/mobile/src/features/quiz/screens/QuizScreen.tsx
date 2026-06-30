import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing } from "../../../theme/design";
import { QuizEmptyState } from "../components/QuizEmptyState";
import { QuizExitConfirmModal } from "../components/QuizExitConfirmModal";
import { QuizFeedback } from "../components/QuizFeedback";
import { QuizHeader } from "../components/QuizHeader";
import { QuizOption } from "../components/QuizOption";
import { QuizPrimaryAction } from "../components/QuizPrimaryAction";
import { QuizProgress } from "../components/QuizProgress";
import { QuizPromptCard } from "../components/QuizPromptCard";
import { QuizResultScreen } from "../components/QuizResultScreen";
import { useQuizSession } from "../useQuizSession";

type Props = {
  deck: Card[];
  onClose: () => void;
};

export function QuizScreen({ deck, onClose }: Props) {
  const { t } = useI18n();
  const quiz = useQuizSession(deck, onClose);

  if (quiz.questions.length === 0) {
    return <QuizEmptyState onClose={onClose} />;
  }

  if (quiz.finished) {
    return <QuizResultScreen score={quiz.score} total={quiz.questions.length} onRestart={quiz.restartQuiz} onClose={onClose} />;
  }

  const question = quiz.question;
  const isFinalQuestion = quiz.index + 1 === quiz.questions.length;
  const actionLabel = quiz.checked ? (isFinalQuestion ? t("quiz.seeResults") : t("quiz.nextQuestion")) : t("quiz.checkAnswer");

  return (
    <>
      <QuizHeader score={quiz.score} onBack={quiz.requestClose} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <QuizProgress current={quiz.index + 1} total={quiz.questions.length} accuracy={quiz.accuracy} />
        <QuizPromptCard card={question.card} />

        <View style={styles.options}>
          {question.options.map((option, optionIndex) => (
            <QuizOption
              key={`${option}-${optionIndex}`}
              option={option}
              letter={String.fromCharCode(65 + optionIndex)}
              selected={quiz.selected === optionIndex}
              correct={question.correctIndex === optionIndex}
              checked={quiz.checked}
              onPress={() => quiz.setSelected(optionIndex)}
            />
          ))}
        </View>

        {quiz.checked && <QuizFeedback correct={quiz.isCorrect} correctAnswer={question.options[question.correctIndex]} />}

        <QuizPrimaryAction disabled={quiz.selected == null} label={actionLabel} checked={quiz.checked} onPress={quiz.next} />

        <QuizExitConfirmModal visible={quiz.showExitConfirm} onCancel={() => quiz.setShowExitConfirm(false)} onConfirm={quiz.confirmClose} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom },
  options: { gap: spacing.lg }
});
