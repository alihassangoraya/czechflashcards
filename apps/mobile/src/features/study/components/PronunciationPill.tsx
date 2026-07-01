import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { speak } from "../../../services/speech";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { pronunciationDisplay } from "../models/studyMeaning";
import type { PronunciationPillProps } from "./pronunciationPillTypes";

export function PronunciationPill({ card }: PronunciationPillProps) {
  const { t } = useI18n();

  return (
    <Pressable
      style={styles.pill}
      onPress={(event) => { event.stopPropagation(); speak(card.cz, { language: "cs-CZ", rate: 0.86 }); }}
      accessibilityRole="button"
      accessibilityLabel={t("study.playWord", { word: card.cz })}
    >
      <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.iconAction} />
      <Text style={styles.text}>{`${pronunciationDisplay(card)} · ${t("study.stressFirstSyllable")}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xlPlus,
    borderRadius: radius.md,
    backgroundColor: colors.actionSoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.smd
  },
  text: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
