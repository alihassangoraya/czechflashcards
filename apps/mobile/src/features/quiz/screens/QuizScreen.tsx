import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { colors, spacing } from "../../../theme/design";
import { QuizEmptyState } from "../components/QuizEmptyState";
import { QuizExitConfirmModal } from "../components/QuizExitConfirmModal";
import { QuizHeader } from "../components/QuizHeader";
import { QuizQuestionContent } from "../components/QuizQuestionContent";
import { QuizResultScreen } from "../components/QuizResultScreen";
import { useQuizSession } from "../hooks/useQuizSession";

type Props = {
  deck: Card[];
  onClose: () => void;
};

export function QuizScreen({ deck, onClose }: Props) {
  const quiz = useQuizSession(deck, onClose);

  if (quiz.questions.length === 0) {
    return <QuizEmptyState onClose={onClose} />;
  }

  if (quiz.finished) {
    return <QuizResultScreen score={quiz.score} total={quiz.questions.length} onRestart={quiz.restartQuiz} onClose={onClose} />;
  }

  const question = quiz.question;

  return (
    <>
      <QuizHeader score={quiz.score} onBack={quiz.requestClose} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <QuizQuestionContent
          accuracy={quiz.accuracy}
          checked={quiz.checked}
          index={quiz.index}
          isCorrect={quiz.isCorrect}
          next={quiz.next}
          question={question}
          selected={quiz.selected}
          setSelected={quiz.setSelected}
          total={quiz.questions.length}
        />
      </ScrollView>
      <QuizExitConfirmModal visible={quiz.showExitConfirm} onCancel={() => quiz.setShowExitConfirm(false)} onConfirm={quiz.confirmClose} />
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom }
});
