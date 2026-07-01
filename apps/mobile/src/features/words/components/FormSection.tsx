import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: MaterialIconName;
  title: string;
  required?: boolean;
  children: React.ReactNode;
};

export function FormSection({ icon, title, required = false, children }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.formSection}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name={icon} size={size.iconSmall} color={colors.iconPrimary} />
        <Text style={[styles.sectionTitle, { textAlign }]}>{title}</Text>
        {required && <Text style={styles.required}>{t("words.required")}</Text>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  sectionTitle: { flex: 1, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  required: { color: colors.primaryDeep, fontSize: typography.caption, fontWeight: typography.weightSemibold }
});
