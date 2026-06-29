import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { ProgressBar } from "./ProgressBar";

type Props = {
  reviewedToday: number;
  dailyGoal: number;
  ratio: number;
};

export function DailyGoalCard({ reviewedToday, dailyGoal, ratio }: Props) {
  const complete = ratio >= 1;
  return (
    <View style={styles.todayCard}>
      <View style={styles.todayIcon}>
        <MaterialIcons name={complete ? "check-circle" : "whatshot"} size={24} color={complete ? colors.softMint : colors.bohemianGold} />
      </View>
      <View style={styles.todayCopy}>
        <View style={styles.sectionHeader}>
          <Text style={styles.todayTitle}>{complete ? "Daily goal met" : "Today's goal"}</Text>
          <Text style={styles.todayCount}>{reviewedToday} / {dailyGoal}</Text>
        </View>
        <Text style={styles.todayMeta}>{complete ? "Nice work. Come back tomorrow for more." : `${Math.max(0, dailyGoal - reviewedToday)} cards left today`}</Text>
        <ProgressBar value={ratio} color={complete ? colors.softMint : colors.bohemianGold} compact />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 },
  todayCard: { flexDirection: "row", alignItems: "center", gap: spacing.xl, marginHorizontal: spacing.page, borderRadius: radius.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  todayIcon: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: radius.lg, backgroundColor: colors.goldSoft },
  todayCopy: { flex: 1, gap: 5 },
  todayTitle: { color: colors.charcoalText, fontSize: 16, fontWeight: typography.weightBold },
  todayCount: { color: colors.bohemianGold, fontSize: 15, fontWeight: typography.weightSemibold },
  todayMeta: { color: colors.mutedSlate, fontSize: 13, fontWeight: typography.weightRegular }
});
