import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { SyncStatus } from "../../../sync";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { SettingsSection } from "./SettingsSection";

type Props = {
  accountEmail: string | null;
  syncStatus: SyncStatus;
  onSyncNow: () => void;
  onAccount: () => void;
};

export function SyncSettingsSection({ accountEmail, syncStatus, onSyncNow, onAccount }: Props) {
  const { t, textAlign } = useI18n();
  const syncReady = syncStatus === "synced" || syncStatus === "not-configured";
  return (
    <SettingsSection icon="cloud-sync" title={t("settings.backupSync")} description={t("settings.backupSyncDescription")}>
      <View style={styles.syncStatus}>
        <View style={[styles.syncStatusIcon, syncReady ? styles.syncStatusGood : styles.syncStatusPending]}>
          <MaterialIcons name={syncReady ? "cloud-done" : "sync-problem"} size={size.iconMedium} color={syncReady ? colors.success : colors.warning} />
        </View>
        <View style={styles.syncStatusCopy}>
          <Text style={[styles.syncStatusTitle, { textAlign }]}>{accountEmail || t("settings.guestMode")}</Text>
          <Text style={[styles.syncStatusText, { textAlign }]}>{accountEmail ? t("settings.syncStatus", { status: syncStatus }) : t("settings.signInRestore")}</Text>
        </View>
      </View>
      <View style={styles.syncActions}>
        <Pressable style={styles.syncButton} onPress={onSyncNow} accessibilityRole="button">
          <MaterialIcons name="sync" size={size.icon} color={colors.action} />
          <Text style={styles.syncButtonText}>{t("settings.syncNow")}</Text>
        </Pressable>
        <Pressable style={styles.accountButton} onPress={onAccount} accessibilityRole="button">
          <MaterialIcons name={accountEmail ? "person" : "login"} size={size.icon} color={colors.onPrimary} />
          <Text style={styles.accountButtonText}>{accountEmail ? t("settings.account") : t("settings.signIn")}</Text>
        </Pressable>
      </View>
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  syncStatus: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  syncStatusIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md },
  syncStatusGood: { backgroundColor: colors.mintSoft },
  syncStatusPending: { backgroundColor: colors.goldSoft },
  syncStatusCopy: { flex: 1, gap: spacing.xxs },
  syncStatusTitle: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  syncStatusText: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  syncActions: { flexDirection: "row", gap: spacing.lg },
  syncButton: { flex: 1, minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, backgroundColor: colors.surface },
  syncButtonText: { color: colors.action, fontSize: typography.body, fontWeight: typography.weightSemibold },
  accountButton: { flex: 1, minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  accountButtonText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
