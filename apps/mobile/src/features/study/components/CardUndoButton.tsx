import React from "react";
import { Pressable, Text } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { cardUndoButtonStyles as styles } from "./cardUndoButtonStyles";
import type { CardUndoButtonProps } from "./cardUndoButtonTypes";

export function CardUndoButton({ grading, lastReviewCard, onUndoLastReview }: CardUndoButtonProps) {
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
