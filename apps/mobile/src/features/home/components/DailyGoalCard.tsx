import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size } from "../../../theme/design";
import { dailyGoalCardStyles as styles } from "./dailyGoalCardStyles";
import type { DailyGoalCardProps } from "./dailyGoalCardTypes";
import { ProgressBar } from "./ProgressBar";

export function DailyGoalCard({ reviewedToday, dailyGoal, ratio }: DailyGoalCardProps) {
  const { t, textAlign } = useI18n();
  const complete = ratio >= 1;
  return (
    <View style={styles.todayCard}>
      <View style={styles.todayIcon}>
        <MaterialIcons name={complete ? "check-circle" : "whatshot"} size={size.iconLarge} color={complete ? colors.softMint : colors.bohemianGold} />
      </View>
      <View style={styles.todayCopy}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.todayTitle, { textAlign }]}>{complete ? t("home.dailyGoalMet") : t("home.dailyGoal")}</Text>
          <Text style={styles.todayCount}>{reviewedToday} / {dailyGoal}</Text>
        </View>
        <Text style={[styles.todayMeta, { textAlign }]}>{complete ? t("home.dailyGoalDone") : t("home.cardsLeftToday", { count: Math.max(0, dailyGoal - reviewedToday) })}</Text>
        <ProgressBar value={ratio} color={complete ? colors.softMint : colors.bohemianGold} compact />
      </View>
    </View>
  );
}
