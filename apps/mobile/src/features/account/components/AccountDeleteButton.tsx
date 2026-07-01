import { Pressable, StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  busy: boolean;
  confirmingDelete: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onRequestDelete: () => void;
};

export function AccountDeleteButton({ busy, confirmingDelete, onCancelDelete, onConfirmDelete, onRequestDelete }: Props) {
  const { t } = useI18n();
  if (confirmingDelete) {
    return (
      <View style={styles.confirmBox}>
        <Text style={styles.warning}>{t("account.deleteWarning")}</Text>
        <View style={styles.row}>
          <Pressable style={styles.secondary} onPress={onCancelDelete}><Text style={styles.secondaryText}>{t("common.cancel")}</Text></Pressable>
          <Pressable disabled={busy} style={styles.danger} onPress={onConfirmDelete}><Text style={styles.dangerText}>{t("account.confirmDelete")}</Text></Pressable>
        </View>
      </View>
    );
  }
  return <Pressable style={styles.outlineDanger} onPress={onRequestDelete}><Text style={styles.outlineText}>{t("account.deleteAccount")}</Text></Pressable>;
}

const styles = StyleSheet.create({
  confirmBox: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.dangerStrong, borderRadius: radius.md, padding: spacing.lg },
  danger: { flex: 1, alignItems: "center", borderRadius: radius.md, backgroundColor: colors.dangerStrong, padding: spacing.lg },
  dangerText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  outlineDanger: { alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.dangerStrong, borderRadius: radius.md, padding: spacing.lg },
  outlineText: { color: colors.dangerStrong, fontWeight: typography.weightSemibold },
  row: { flexDirection: "row", gap: spacing.md },
  secondary: { flex: 1, alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.lg },
  secondaryText: { color: colors.textStrong, fontWeight: typography.weightSemibold },
  warning: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
