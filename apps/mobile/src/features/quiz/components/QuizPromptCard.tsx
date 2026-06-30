import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { speak } from "../../../services/speech";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, shadow, size, spacing, typography } from "../../../theme/design";
import type { QuizPromptCardProps } from "./quizPromptCardTypes";

export function QuizPromptCard({ card }: QuizPromptCardProps) {
  const { t } = useI18n();

  return (
    <View style={styles.promptCard}>
      <Text style={styles.promptLabel}>{t("quiz.chooseMeaning")}</Text>
      <Text style={styles.word}>{card.cz}</Text>
      <Pressable style={styles.audioLine} onPress={() => speak(card.cz, { language: "cs-CZ", rate: 0.86 })} accessibilityRole="button" accessibilityLabel={t("quiz.playWord", { word: card.cz })}>
        <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
        <Text style={styles.pronunciation}>[ {card.pronunciation || card.cz} ]</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  promptCard: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.card, backgroundColor: colors.surface, padding: spacing.card, ...shadow.soft },
  promptLabel: { color: colors.textSoft, fontSize: typography.body, fontWeight: typography.weightRegular, textAlign: "center" },
  word: { color: colors.textStrong, fontSize: typography.word, lineHeight: typography.word + spacing.lg, fontWeight: typography.weightBold, textAlign: "center" },
  audioLine: { alignSelf: "center", flexDirection: "row", alignItems: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  pronunciation: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
