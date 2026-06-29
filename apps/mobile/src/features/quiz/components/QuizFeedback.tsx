import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  correct: boolean;
  correctAnswer: string;
};

export function QuizFeedback({ correct, correctAnswer }: Props) {
  return (
    <View style={[styles.feedbackPanel, correct ? styles.feedbackCorrect : styles.feedbackWrong]}>
      <MaterialIcons name={correct ? "check-circle" : "info"} size={size.iconMedium} color={correct ? colors.success : colors.danger} />
      <View style={styles.feedbackCopy}>
        <Text style={styles.feedbackTitle}>{correct ? "Correct" : "Correct answer"}</Text>
        <Text style={styles.feedbackText}>{correct ? "Nice recall. Keep the momentum." : correctAnswer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedbackPanel: { flexDirection: "row", alignItems: "flex-start", gap: spacing.lg, borderWidth: spacing.hairline, borderRadius: radius.md, padding: spacing.xl },
  feedbackCorrect: { borderColor: colors.success, backgroundColor: colors.mintSoft },
  feedbackWrong: { borderColor: colors.dangerBorder, backgroundColor: colors.dangerSoft },
  feedbackCopy: { flex: 1, gap: spacing.xs },
  feedbackTitle: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  feedbackText: { color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightRegular }
});
