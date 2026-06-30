import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "../../../theme/design";
import { ResultMetric } from "./ResultMetric";

type Props = {
  score: number;
  total: number;
  missed: number;
  accuracy: number;
  feedback: string;
  textAlign: "auto" | "left" | "right" | "center" | "justify";
  labels: {
    score: string;
    correct: string;
    missed: string;
    accuracy: string;
  };
};

export function QuizResultSummary({ score, total, missed, accuracy, feedback, textAlign, labels }: Props) {
  return (
    <View style={styles.resultCard}>
      <Text style={[styles.resultEyebrow, { textAlign }]}>{labels.score}</Text>
      <View style={styles.scoreLine}>
        <Text style={[styles.resultScore, accuracy >= 50 ? styles.scorePositive : styles.scoreNeedsReview]}>{score}</Text>
        <Text style={styles.scoreTotal}>/ {total}</Text>
      </View>
      <Text style={[styles.resultFeedback, { textAlign }]}>{feedback}</Text>
      <View style={styles.resultMetrics}>
        <ResultMetric icon="check-circle" value={`${score}`} label={labels.correct} color={colors.success} />
        <ResultMetric icon="cancel" value={`${missed}`} label={labels.missed} color={colors.danger} />
        <ResultMetric icon="bolt" value={`${accuracy}%`} label={labels.accuracy} color={colors.action} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultCard: { width: "100%", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  resultEyebrow: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textAlign: "center", textTransform: "uppercase" },
  scoreLine: { flexDirection: "row", alignItems: "baseline", justifyContent: "center" },
  resultScore: { fontSize: typography.word, fontWeight: typography.weightBold },
  scorePositive: { color: colors.success },
  scoreNeedsReview: { color: colors.danger },
  scoreTotal: { color: colors.textMuted, fontSize: typography.title, fontWeight: typography.weightMedium },
  resultFeedback: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, lineHeight: typography.bodyLarge + spacing.xs, textAlign: "center" },
  resultMetrics: { flexDirection: "row", borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl }
});
