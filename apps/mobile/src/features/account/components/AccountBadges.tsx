import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { buildAccountBadges } from "./accountBadgesModel";
import type { AccountBadgesProps } from "./accountBadgesTypes";

export function AccountBadges({ summary }: AccountBadgesProps) {
  const { t } = useI18n();

  return (
    <>
      <Text style={styles.title}>{t("account.milestones")}</Text>
      <View style={styles.badges}>
        {buildAccountBadges(summary).map((badge) => (
          <View key={badge.title} style={styles.item}>
            <View style={[styles.icon, !badge.unlocked && styles.lockedIcon]}>
              <MaterialIcons name={badge.icon} size={size.iconSmall} color={badge.unlocked ? colors.bohemianGold : colors.textMuted} />
            </View>
            <Text style={[styles.name, !badge.unlocked && styles.lockedText]} numberOfLines={1}>{t(badge.title)}</Text>
            <Text style={styles.label} numberOfLines={2}>{t(badge.label)}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primaryDeep, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  badges: { flexDirection: "row", gap: spacing.md },
  item: { flex: 1, alignItems: "center", gap: spacing.xxs },
  icon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.goldSoft },
  lockedIcon: { backgroundColor: colors.surfaceMuted },
  name: { color: colors.textStrong, fontSize: typography.micro, fontWeight: typography.weightSemibold, textAlign: "center" },
  label: { color: colors.textMuted, fontSize: typography.micro, lineHeight: typography.bodySmall, textAlign: "center" },
  lockedText: { color: colors.textMuted }
});
