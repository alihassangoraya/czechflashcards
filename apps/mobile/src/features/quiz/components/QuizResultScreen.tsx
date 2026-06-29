import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, shadow, size, spacing, typography } from "../../../theme/design";
import { ResultMetric } from "./ResultMetric";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
  onClose: () => void;
};

export function QuizResultScreen({ score, total, onRestart, onClose }: Props) {
  const missed = total - score;
  const finalAccuracy = Math.round((score / total) * 100);
  const feedback = score === total
    ? "Bezchybne. Every answer was correct."
    : finalAccuracy >= 80
      ? "Vyborne. Your recall is looking strong."
      : finalAccuracy >= 50
        ? "Dobra prace. A short review will help these words stick."
        : "Keep going. Review the missed words, then take another round.";

  return (
    <ScrollView contentContainerStyle={styles.resultContent}>
      <View style={styles.resultIcon}>
        <MaterialIcons name="emoji-events" size={size.quizResultIcon} color={colors.warning} />
      </View>
      <Text style={styles.resultTitle}>Gratulujeme!</Text>
      <Text style={styles.resultSubtitle}>Quiz complete</Text>

      <View style={styles.resultCard}>
        <Text style={styles.resultEyebrow}>Your score</Text>
        <View style={styles.scoreLine}>
          <Text style={[styles.resultScore, finalAccuracy >= 50 ? styles.scorePositive : styles.scoreNeedsReview]}>{score}</Text>
          <Text style={styles.scoreTotal}>/ {total}</Text>
        </View>
        <Text style={styles.resultFeedback}>{feedback}</Text>
        <View style={styles.resultMetrics}>
          <ResultMetric icon="check-circle" value={`${score}`} label="Correct" color={colors.success} />
          <ResultMetric icon="cancel" value={`${missed}`} label="Missed" color={colors.danger} />
          <ResultMetric icon="bolt" value={`${finalAccuracy}%`} label="Accuracy" color={colors.action} />
        </View>
      </View>

      <Pressable style={styles.primaryButton} onPress={onRestart} accessibilityRole="button">
        <MaterialIcons name="refresh" size={size.icon} color={colors.onPrimary} />
        <Text style={styles.primaryText}>Try another quiz</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={onClose} accessibilityRole="button">
        <MaterialIcons name="home" size={size.icon} color={colors.primaryDeep} />
        <Text style={styles.secondaryText}>Return home</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultContent: { flexGrow: 1, alignItems: "center", justifyContent: "center", gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingVertical: spacing.hero, backgroundColor: colors.background },
  resultIcon: { width: size.quizResultIcon + spacing.card, height: size.quizResultIcon + spacing.card, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.goldSoft },
  resultTitle: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightBold, textAlign: "center" },
  resultSubtitle: { color: colors.textMuted, fontSize: typography.bodyLarge, fontWeight: typography.weightRegular, textAlign: "center" },
  resultCard: { width: "100%", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  resultEyebrow: { color: colors.primary, fontSize: typography.label, fontWeight: typography.weightSemibold, textAlign: "center", textTransform: "uppercase" },
  scoreLine: { flexDirection: "row", alignItems: "baseline", justifyContent: "center" },
  resultScore: { fontSize: typography.word, fontWeight: typography.weightBold },
  scorePositive: { color: colors.success },
  scoreNeedsReview: { color: colors.danger },
  scoreTotal: { color: colors.textMuted, fontSize: typography.title, fontWeight: typography.weightMedium },
  resultFeedback: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, lineHeight: typography.bodyLarge + spacing.xs, textAlign: "center" },
  resultMetrics: { flexDirection: "row", borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl },
  primaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.hero },
  primaryText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  secondaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.hero },
  secondaryText: { color: colors.primaryDeep, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
