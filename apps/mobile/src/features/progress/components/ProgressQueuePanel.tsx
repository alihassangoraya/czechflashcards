import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing } from "../../../theme/design";
import { ProgressQueueTile } from "./ProgressQueueTile";
import { ProgressSectionHeader } from "./ProgressSectionHeader";
import type { ProgressQueueHealth } from "../types/progressTypes";

type Props = { queue: ProgressQueueHealth };

export function ProgressQueuePanel({ queue }: Props) {
  const { t } = useI18n();
  const total = queue.dueNow + queue.dueSoon + queue.relearning + queue.stable;
  return (
    <View style={styles.wrap}>
      <ProgressSectionHeader title={t("progress.reviewQueue")} detail={t("progress.queueSummary", { count: total })} />
      <View style={styles.grid}>
        <ProgressQueueTile icon="schedule" label={t("progress.dueNow")} value={queue.dueNow} tone={colors.dangerSoft} />
        <ProgressQueueTile icon="today" label={t("progress.dueSoon")} value={queue.dueSoon} tone={colors.goldSoft} />
        <ProgressQueueTile icon="refresh" label={t("progress.relearning")} value={queue.relearning} tone={colors.actionSoft} />
        <ProgressQueueTile icon="school" label={t("progress.stable")} value={queue.stable} tone={colors.mintSoft} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.md },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg }
});
