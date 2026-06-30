import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../../theme/design";
import type { QuizResultSummaryProps } from "../types/quizResultSummaryTypes";
import { QuizResultMetrics } from "./QuizResultMetrics";
import { QuizResultScore } from "./QuizResultScore";

export function QuizResultSummary({ score, total, missed, accuracy, feedback, textAlign, labels }: QuizResultSummaryProps) {
  return (
    <View style={styles.resultCard}>
      <Text style={[styles.resultEyebrow, { textAlign }]}>{labels.score}</Text>
      <QuizResultScore accuracy={accuracy} score={score} total={total} />
      <Text style={[styles.resultFeedback, { textAlign }]}>{feedback}</Text>
      <QuizResultMetrics accuracy={accuracy} labels={labels} missed={missed} score={score} />
    </View>
  );
}

const styles = StyleSheet.create({
  resultCard: { width: "100%", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  resultEyebrow: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textAlign: "center", textTransform: "uppercase" },
  resultFeedback: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, lineHeight: typography.bodyLarge + spacing.xs, textAlign: "center" }
});
