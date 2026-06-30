import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

export function EmptyStudyCard() {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.cardFace}>
      <Text style={[styles.word, { textAlign }]}>{t("study.done")}</Text>
      <Text style={[styles.hint, { textAlign }]}>{t("study.noDue")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardFace: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    backfaceVisibility: "hidden"
  },
  word: { fontSize: typography.word, lineHeight: typography.wordLine, color: colors.textStrong, fontWeight: typography.weightBold, textAlign: "center" },
  hint: { color: colors.textMuted, marginTop: typography.bodyLarge, textAlign: "center", fontWeight: typography.weightRegular }
});
