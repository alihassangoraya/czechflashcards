import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CustomDeck } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  deck: CustomDeck;
  inDeck: boolean;
  onPress: () => void;
};

export function DeckMembershipRow({ deck, inDeck, onPress }: Props) {
  const { t } = useI18n();

  return (
    <Pressable style={[styles.deckRow, inDeck && styles.deckRowActive]} onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: inDeck }}>
      <View style={[styles.deckIcon, inDeck && styles.deckIconActive]}>
        <MaterialIcons name="folder" size={size.icon} color={inDeck ? colors.onPrimary : colors.primaryDeep} />
      </View>
      <View style={styles.deckCopy}>
        <Text style={styles.deckName}>{deck.name}</Text>
        <Text style={styles.deckMeta}>{inDeck ? t("deckMembership.inDeck") : t("deckMembership.tapToAdd")}</Text>
      </View>
      <MaterialIcons name={inDeck ? "check-circle" : "add-circle-outline"} size={size.iconMedium} color={inDeck ? colors.success : colors.action} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deckRow: { minHeight: size.quizOptionHeight, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
  deckRowActive: { borderColor: colors.success, backgroundColor: colors.mintSoft },
  deckIcon: { width: size.categoryIcon, height: size.categoryIcon, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.surfaceMuted },
  deckIconActive: { backgroundColor: colors.success },
  deckCopy: { flex: 1, gap: spacing.xxs },
  deckName: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  deckMeta: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular }
});
