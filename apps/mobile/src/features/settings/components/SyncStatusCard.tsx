import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { SyncStatus } from "../../../sync";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  accountEmail: string | null;
  syncStatus: SyncStatus;
};

export function SyncStatusCard({ accountEmail, syncStatus }: Props) {
  const { t, textAlign } = useI18n();
  const syncReady = syncStatus === "synced" || syncStatus === "not-configured";

  return (
    <View style={styles.status}>
      <View style={[styles.icon, syncReady ? styles.good : styles.pending]}>
        <MaterialIcons name={syncReady ? "cloud-done" : "sync-problem"} size={size.iconMedium} color={syncReady ? colors.success : colors.warning} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { textAlign }]}>{accountEmail || t("settings.guestMode")}</Text>
        <Text style={[styles.text, { textAlign }]}>{accountEmail ? t("settings.syncStatus", { status: syncStatus }) : t("settings.signInRestore")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  status: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  icon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md },
  good: { backgroundColor: colors.mintSoft },
  pending: { backgroundColor: colors.goldSoft },
  copy: { flex: 1, gap: spacing.xxs },
  title: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  text: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
