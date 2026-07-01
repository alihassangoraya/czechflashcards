import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { ProgressActionButton } from "./ProgressActionButton";

type Props = { onStartStudy: () => void; onOpenSettings: () => void; onShuffleDue: () => void; onReviewAllNow: () => void };

export function ProgressActionPanel({ onStartStudy, onOpenSettings, onShuffleDue, onReviewAllNow }: Props) {
  const { t } = useI18n();
  return (
    <View style={styles.row}>
      <ProgressActionButton primary icon="play-arrow" label={t("progress.reviewNow")} onPress={onStartStudy} />
      <ProgressActionButton icon="today" label={t("settings.reviewAllNow")} onPress={onReviewAllNow} />
      <ProgressActionButton icon="swap-horiz" label={t("settings.shuffleDue")} onPress={onShuffleDue} />
      <ProgressActionButton icon="tune" label={t("progress.adjustGoal")} onPress={onOpenSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg }
});
