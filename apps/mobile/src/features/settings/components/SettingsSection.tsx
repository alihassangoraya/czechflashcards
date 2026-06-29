import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  description: string;
  children: React.ReactNode;
};

export function SettingsSection({ icon, title, description, children }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}><MaterialIcons name={icon} size={size.iconSmall} color={colors.primaryDeep} /></View>
        <View style={styles.sectionCopy}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.xl },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  sectionIcon: { width: size.touchTarget, height: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  sectionCopy: { flex: 1, gap: spacing.xxs },
  sectionTitle: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  sectionDescription: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
