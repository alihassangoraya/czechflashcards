import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function DeckMembershipEmpty({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { t } = useI18n();

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{t("deckMembership.emptyTitle")}</Text>
      <Text style={styles.emptyCopy}>{t("deckMembership.emptyCopy")}</Text>
      <Pressable style={styles.primaryButton} onPress={onOpenSettings} accessibilityRole="button">
        <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
        <Text style={styles.primaryText}>{t("deckMembership.createDeck")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  emptyTitle: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  emptyCopy: { color: colors.textMuted, fontSize: typography.body, lineHeight: typography.screenTitle },
  primaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  primaryText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
