import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function CardUndoButton({ grading, lastReviewCard, onUndoLastReview }: { grading: boolean; lastReviewCard: Card; onUndoLastReview: () => void }) {
  const { t } = useI18n();

  return (
    <Pressable
      disabled={grading}
      style={[styles.button, grading && styles.disabled]}
      onPress={(event) => { event.stopPropagation(); onUndoLastReview(); }}
      accessibilityRole="button"
      accessibilityLabel={`Undo review for ${lastReviewCard.cz}`}
    >
      <MaterialIcons name="undo" size={size.iconSmall} color={colors.primaryDeep} />
      <Text style={styles.text}>{t("study.undo")}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: spacing.xlPlus,
    alignSelf: "center",
    minHeight: size.touchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.smd,
    borderWidth: spacing.hairline,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: spacing.xl
  },
  text: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  disabled: { opacity: 0.45 }
});
