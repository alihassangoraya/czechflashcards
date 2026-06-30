import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { ProgressBar } from "./ProgressBar";

type Props = {
  reviewedToday: number;
  dailyGoal: number;
  ratio: number;
};

export function DailyGoalCard({ reviewedToday, dailyGoal, ratio }: Props) {
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

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.lgPlus },
  todayCard: { flexDirection: "row", alignItems: "center", gap: spacing.xl, marginHorizontal: spacing.page, borderRadius: radius.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  todayIcon: { width: size.dailyGoalIcon, height: size.dailyGoalIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.lg, backgroundColor: colors.goldSoft },
  todayCopy: { flex: 1, gap: spacing.smd },
  todayTitle: { color: colors.charcoalText, fontSize: typography.bodyLarge, fontWeight: typography.weightBold },
  todayCount: { color: colors.bohemianGold, fontSize: typography.categoryTitle, fontWeight: typography.weightSemibold },
  todayMeta: { color: colors.mutedSlate, fontSize: typography.bodySmall, fontWeight: typography.weightRegular }
});
