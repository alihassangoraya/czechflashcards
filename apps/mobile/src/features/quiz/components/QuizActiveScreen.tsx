import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { colors, spacing } from "../../../theme/design";
import type { QuizSession } from "../hooks/useQuizSession";
import { QuizExitConfirmModal } from "./QuizExitConfirmModal";
import { QuizHeader } from "./QuizHeader";
import { QuizQuestionContent } from "./QuizQuestionContent";

type Props = {
  quiz: QuizSession;
};

export function QuizActiveScreen({ quiz }: Props) {
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
          question={quiz.question}
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
