import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  notice?: string;
  textAlign: "auto" | "left" | "right" | "center" | "justify";
};

export function SettingsDataToolsNotice({ notice, textAlign }: Props) {
  if (!notice) return null;
  return (
    <View style={styles.notice}>
      <MaterialIcons name="info" size={size.iconSmall} color={colors.iconAction} />
      <Text style={[styles.noticeText, { textAlign }]}>{notice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.actionSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.lg },
  noticeText: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
