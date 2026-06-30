import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../theme/design";
import { QuizEmptyState } from "./components/QuizEmptyState";
import { QuizExitConfirmModal } from "./components/QuizExitConfirmModal";
import { QuizFeedback } from "./components/QuizFeedback";
import { QuizHeader } from "./components/QuizHeader";
import { QuizOption } from "./components/QuizOption";
import { QuizProgress } from "./components/QuizProgress";
import { QuizPromptCard } from "./components/QuizPromptCard";
import { QuizResultScreen } from "./components/QuizResultScreen";
import { useQuizSession } from "./useQuizSession";

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

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <QuizHeader score={quiz.score} onBack={quiz.requestClose} />
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

      <Pressable disabled={quiz.selected == null} style={[styles.primaryButton, quiz.selected == null && styles.disabled]} onPress={quiz.next} accessibilityRole="button">
        <Text style={styles.primaryText}>{quiz.checked ? (quiz.index + 1 === quiz.questions.length ? t("quiz.seeResults") : t("quiz.nextQuestion")) : t("quiz.checkAnswer")}</Text>
        <MaterialIcons name={quiz.checked ? "arrow-forward" : "check"} size={size.icon} color={colors.onPrimary} />
      </Pressable>

      <QuizExitConfirmModal visible={quiz.showExitConfirm} onCancel={() => quiz.setShowExitConfirm(false)} onConfirm={quiz.confirmClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: spacing.screenBottom },
  options: { gap: spacing.lg },
  primaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.hero },
  primaryText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  disabled: { opacity: 0.42 }
});
