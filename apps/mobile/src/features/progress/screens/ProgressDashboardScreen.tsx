import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { useI18n } from "../../../i18n/I18nProvider";
import { ProgressDashboardContent } from "../components/ProgressDashboardContent";
import { buildProgressDashboardModel } from "../models/progressDashboardModel";
import { progressDashboardScreenStyles as styles } from "./progressDashboardScreenStyles";
import type { ProgressDashboardInput } from "../types/progressTypes";

type Props = ProgressDashboardInput & { onBack: () => void; onStartStudy: () => void; onOpenSettings: () => void; onShuffleDue: () => void; onReviewAllNow: () => void };

export function ProgressDashboardScreen({ onBack, onStartStudy, onOpenSettings, onShuffleDue, onReviewAllNow, ...input }: Props) {
  const { t, textAlign } = useI18n();
  const model = useMemo(() => buildProgressDashboardModel(input), [input.cards, input.states, input.settings, input.dailyProgressLog]);

  return (
    <View style={styles.screen}>
      <ScreenHeader title={t("progress.title")} backLabel={t("common.backHome")} textAlign={textAlign} onBack={onBack} />
      <ScrollView style={styles.scroll}>
        <ProgressDashboardContent model={model} onStartStudy={onStartStudy} onOpenSettings={onOpenSettings} onShuffleDue={onShuffleDue} onReviewAllNow={onReviewAllNow} />
      </ScrollView>
    </View>
  );
}
