import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import type { FriendRequest } from "../../../sync";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  request: FriendRequest;
  onRespond: (requestId: string, accepted: boolean) => void;
};

export function FriendRequestRow({ request, onRespond }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.friendRow}>
      <Text style={styles.muted}>{t("account.friendRequest", { name: request.display_name || request.friend_code })}</Text>
      <View style={styles.friendActions}>
        <Pressable style={styles.smallAction} onPress={() => onRespond(request.id, true)}><Text style={styles.secondaryActionText}>{t("account.accept")}</Text></Pressable>
        <Pressable style={styles.smallAction} onPress={() => onRespond(request.id, false)}><Text style={styles.secondaryActionText}>{t("account.decline")}</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friendRow: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.surfaceMuted, paddingTop: spacing.lgPlus },
  friendActions: { flexDirection: "row", gap: spacing.lg },
  smallAction: { flex: 1, alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lg, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
