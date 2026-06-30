import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { buildQuizResultSummaryProps } from "../models/quizResultSummaryProps";
import { QuizResultActions } from "./QuizResultActions";
import { QuizResultSummary } from "./QuizResultSummary";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
  onClose: () => void;
};

export function QuizResultScreen({ score, total, onRestart, onClose }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <ScrollView contentContainerStyle={styles.resultContent}>
      <View style={styles.resultIcon}>
        <MaterialIcons name="emoji-events" size={size.quizResultIcon} color={colors.warning} />
      </View>
      <Text style={[styles.resultTitle, { textAlign }]}>{t("quiz.congrats")}</Text>
      <Text style={[styles.resultSubtitle, { textAlign }]}>{t("quiz.complete")}</Text>

      <QuizResultSummary {...buildQuizResultSummaryProps({ score, total, textAlign, translate: t })} />
      <QuizResultActions restartLabel={t("quiz.tryAnother")} closeLabel={t("quiz.returnHome")} onRestart={onRestart} onClose={onClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultContent: { flexGrow: 1, alignItems: "center", justifyContent: "center", gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingVertical: spacing.hero, backgroundColor: colors.background },
  resultIcon: { width: size.quizResultIcon + spacing.card, height: size.quizResultIcon + spacing.card, alignItems: "center", justifyContent: "center", borderRadius: radius.card, backgroundColor: colors.goldSoft },
  resultTitle: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightBold, textAlign: "center" },
  resultSubtitle: { color: colors.textMuted, fontSize: typography.bodyLarge, fontWeight: typography.weightRegular, textAlign: "center" }
});
