import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  configured: boolean;
  isRegister: boolean;
};

export function AuthPanelIntro({ configured, isRegister }: Props) {
  const { t } = useI18n();

  return (
    <>
      <View style={styles.iconWrap}>
        <MaterialIcons name={isRegister ? "person" : "login"} size={size.iconLarge} color={colors.iconPrimary} />
      </View>
      <Text style={styles.heading}>{isRegister ? t("account.backupHeading") : t("account.welcomeHeading")}</Text>
      <Text style={styles.copy}>{isRegister ? t("account.backupCopy") : t("account.restoreCopy")}</Text>
      {!configured && <Text style={styles.warning}>{t("account.supabaseMissing")}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  iconWrap: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  heading: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  copy: { color: colors.textMuted, fontSize: typography.body, lineHeight: typography.screenTitle },
  warning: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
