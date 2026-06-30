import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { guideItems } from "../homeContent";

export function StudyGuide() {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.studyGuide}>
      <Text style={[styles.guideTitle, { textAlign }]}>{t("home.studyGuide")}</Text>
      <View style={styles.guideGrid}>
        {guideItems.map((item) => (
          <View key={item.textKey} style={styles.guideItem}>
            <View style={styles.guideBullet}>
              <MaterialIcons name={item.icon} size={size.iconSmall} color={colors.bohemianBlue} />
            </View>
            <Text style={[styles.guideText, { textAlign }]}>{t(item.textKey)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  studyGuide: { gap: spacing.lg, marginHorizontal: spacing.page, borderRadius: radius.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backgroundColor: colors.surface, padding: spacing.page },
  guideTitle: { color: colors.mutedSlate, fontSize: typography.bodySmall, fontWeight: typography.weightBold, textTransform: "uppercase" },
  guideGrid: { flexDirection: "row", flexWrap: "wrap", columnGap: spacing.xlPlus, rowGap: spacing.lg },
  guideItem: { width: "47%", minWidth: size.studyGuideColumnMinWidth, flexGrow: 1, flexDirection: "row", alignItems: "flex-start", gap: spacing.smd },
  guideBullet: { width: size.iconMedium, alignItems: "center", paddingTop: spacing.xxs },
  guideText: { flex: 1, color: colors.mutedSlate, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
