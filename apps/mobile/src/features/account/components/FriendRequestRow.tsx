import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import type { FriendRequest } from "../../../sync";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  request: FriendRequest;
  busy: boolean;
  onRespond: (requestId: string, accepted: boolean) => void;
};

export function FriendRequestRow({ request, busy, onRespond }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.friendRow}>
      <View style={styles.copy}>
        <View style={styles.avatar}><MaterialIcons name="person" size={size.iconSmall} color={colors.iconPrimary} /></View>
        <Text style={styles.muted}>{t("account.friendRequest", { name: request.display_name || request.friend_code })}</Text>
      </View>
      <View style={styles.friendActions}>
        <Pressable disabled={busy} style={[styles.smallAction, busy && styles.disabled]} onPress={() => onRespond(request.id, true)}><Text style={styles.secondaryActionText}>{t("account.accept")}</Text></Pressable>
        <Pressable disabled={busy} style={[styles.smallAction, busy && styles.disabled]} onPress={() => onRespond(request.id, false)}><Text style={styles.secondaryActionText}>{t("account.decline")}</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friendRow: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, padding: spacing.lg },
  copy: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  avatar: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  friendActions: { flexDirection: "row", gap: spacing.lg },
  smallAction: { flex: 1, alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lg, backgroundColor: colors.surface },
  disabled: { opacity: 0.52 },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
