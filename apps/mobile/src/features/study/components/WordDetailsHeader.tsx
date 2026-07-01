import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  category?: string;
};

export function WordDetailsHeader({ category }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <View style={styles.iconTile}>
          <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.iconPrimary} />
        </View>
        <Text style={[styles.title, { textAlign }]}>{t("details.title")}</Text>
      </View>
      {category && (
        <View style={styles.categoryPill}>
          <Text style={styles.category}>{t("details.category", { category })}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md, flexWrap: "wrap" },
  titleRow: { flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: spacing.smd },
  iconTile: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  title: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  categoryPill: { borderRadius: radius.xl, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.borderSoft, paddingHorizontal: spacing.md, paddingVertical: spacing.xxs },
  category: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
