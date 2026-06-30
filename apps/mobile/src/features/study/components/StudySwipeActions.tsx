import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { studySwipeActionStyles as styles } from "./studySwipeActionStyles";
import type { StudySwipeActionsProps } from "./studySwipeActionTypes";

export function StudySwipeActions({ grading, onCompleteSwipe }: StudySwipeActionsProps) {
  const { t } = useI18n();

  return (
    <View style={styles.actions}>
      <Pressable
        disabled={grading}
        style={[styles.button, styles.again, grading && styles.disabled]}
        onPress={(event) => { event.stopPropagation(); onCompleteSwipe("again"); }}
        accessibilityRole="button"
        accessibilityLabel={t("study.markAgain")}
      >
        <MaterialIcons name="arrow-back" size={size.icon} color={colors.danger} />
        <Text style={[styles.text, styles.againText]}>{t("review.again")}</Text>
      </Pressable>
      <Pressable
        disabled={grading}
        style={[styles.button, styles.known, grading && styles.disabled]}
        onPress={(event) => { event.stopPropagation(); onCompleteSwipe("known"); }}
        accessibilityRole="button"
        accessibilityLabel={t("study.markKnown")}
      >
        <Text style={[styles.text, styles.knownText]}>{t("review.easy")}</Text>
        <MaterialIcons name="arrow-forward" size={size.icon} color={colors.success} />
      </Pressable>
    </View>
  );
}
