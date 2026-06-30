import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { AccountStudySummary } from "../types/accountTypes";

type Props = {
  accountEmail: string | null;
  summary: AccountStudySummary;
};

export function AccountProfileRow({ accountEmail, summary }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.profileRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>Č</Text>
      </View>
      <View style={styles.profileCopy}>
        <Text style={styles.profileName}>{accountEmail ? t("account.activeStudent") : t("account.guestStudent")}</Text>
        <Text style={styles.profileMeta}>{t("account.profileMeta", { studied: summary.studiedCount, custom: summary.customCount, starred: summary.savedCount })}</Text>
      </View>
      <Text style={styles.rankPill}>{t("account.rank", { level: summary.examLevel })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  avatar: { width: size.headerAction, height: size.headerAction, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft },
  avatarText: { color: colors.primaryDeep, fontSize: size.icon, fontWeight: typography.weightSemibold },
  profileCopy: { flex: 1, minWidth: 0, gap: spacing.xxs },
  profileName: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  profileMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  rankPill: { overflow: "hidden", borderRadius: radius.md, backgroundColor: colors.mintSoft, color: colors.success, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, fontSize: typography.micro, fontWeight: typography.weightSemibold }
});
