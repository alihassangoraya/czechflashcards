import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  onSyncNow: () => void;
};

export function AccountSyncButton({ onSyncNow }: Props) {
  const { t } = useI18n();
  return (
    <Pressable style={styles.button} onPress={onSyncNow} accessibilityRole="button">
      <MaterialIcons name="sync" size={size.iconSmall} color={colors.iconAction} />
      <Text style={styles.label}>{t("settings.syncNow")}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, backgroundColor: colors.surface },
  label: { color: colors.action, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
