import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  correct: boolean;
  correctAnswer: string;
};

export function QuizFeedback({ correct, correctAnswer }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={[styles.feedbackPanel, correct ? styles.feedbackCorrect : styles.feedbackWrong]}>
      <MaterialIcons name={correct ? "check-circle" : "info"} size={size.iconMedium} color={correct ? colors.iconSuccess : colors.iconDanger} />
      <View style={styles.feedbackCopy}>
        <Text style={[styles.feedbackTitle, { textAlign }]}>{correct ? t("quiz.correct") : t("quiz.correctAnswer")}</Text>
        <Text style={[styles.feedbackText, { textAlign }]}>{correct ? t("quiz.niceRecall") : correctAnswer}</Text>
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
