import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  required?: boolean;
  children: React.ReactNode;
};

export function FormSection({ icon, title, required = false, children }: Props) {
  return (
    <View style={styles.formSection}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name={icon} size={size.iconSmall} color={colors.primaryDeep} />
        <Text style={styles.sectionTitle}>{title}</Text>
        {required && <Text style={styles.required}>Required</Text>}
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
