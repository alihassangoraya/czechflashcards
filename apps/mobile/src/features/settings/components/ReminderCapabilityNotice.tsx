import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NotificationCapability } from "../../../services/notifications";
import { useI18n } from "../../../i18n/I18nProvider";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = { capability: NotificationCapability };

export function ReminderCapabilityNotice({ capability }: Props) {
  const { t, textAlign } = useI18n();
  if (capability === "browser-session") return <Notice text={t("settings.reminderBrowserSession")} textAlign={textAlign} />;
  if (capability === "denied") return <Notice text={t("settings.reminderPermissionDenied")} textAlign={textAlign} />;
  if (capability === "unsupported") return <Notice text={t("settings.reminderUnsupported")} textAlign={textAlign} />;
  return null;
}

function Notice({ text, textAlign }: { text: string; textAlign: "left" | "right" }) {
  return (
    <View style={styles.notice}>
      <MaterialIcons name="info" size={size.iconSmall} color={colors.iconWarning} />
      <Text style={[styles.text, { textAlign }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { flexDirection: "row", alignItems: "flex-start", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.warningBorder, borderRadius: radius.sm, backgroundColor: colors.surfaceWarm, padding: spacing.lg },
  text: { flex: 1, color: colors.textSoft, fontSize: typography.caption, lineHeight: typography.bodySmall + spacing.xs }
});
