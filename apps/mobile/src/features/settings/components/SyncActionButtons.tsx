import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  accountEmail: string | null;
  onAccount: () => void;
  onSyncNow: () => void;
};

export function SyncActionButtons({ accountEmail, onAccount, onSyncNow }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.actions}>
      <Pressable style={styles.syncButton} onPress={onSyncNow} accessibilityRole="button">
        <MaterialIcons name="sync" size={size.icon} color={colors.action} />
        <Text style={styles.syncButtonText}>{t("settings.syncNow")}</Text>
      </Pressable>
      <Pressable style={styles.accountButton} onPress={onAccount} accessibilityRole="button">
        <MaterialIcons name={accountEmail ? "person" : "login"} size={size.icon} color={colors.onPrimary} />
        <Text style={styles.accountButtonText}>{accountEmail ? t("settings.account") : t("settings.signIn")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: "row", gap: spacing.lg },
  syncButton: { flex: 1, minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, backgroundColor: colors.surface },
  syncButtonText: { color: colors.action, fontSize: typography.body, fontWeight: typography.weightSemibold },
  accountButton: { flex: 1, minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  accountButtonText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
