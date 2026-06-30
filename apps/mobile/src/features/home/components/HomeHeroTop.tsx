import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { HeroIcon } from "./HeroIcon";

type Props = {
  activeDeckLabel: string;
  accountEmail: string | null;
  examLevel: string;
  onAccount: () => void;
  onAdd: () => void;
  onSearch: () => void;
  onSettings: () => void;
};

export function HomeHeroTop({ activeDeckLabel, accountEmail, examLevel, onAccount, onAdd, onSearch, onSettings }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.heroTop}>
      <Text style={styles.levelPill}>{examLevel.toUpperCase()} · {activeDeckLabel}</Text>
      <View style={styles.heroIconGroup}>
        <HeroIcon icon="search" label={t("common.searchWords")} onPress={onSearch} />
        <HeroIcon icon="add" label={t("common.addWord")} onPress={onAdd} />
        <HeroIcon icon={accountEmail ? "account-circle" : "person-outline"} label={accountEmail ? t("common.account") : t("common.guestAccount")} onPress={onAccount} />
        <HeroIcon icon="settings" label={t("common.openSettings")} onPress={onSettings} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  levelPill: { overflow: "hidden", borderRadius: radius.md, backgroundColor: colors.heroPill, color: colors.heroText, paddingHorizontal: spacing.md, paddingVertical: spacing.xxs, fontSize: typography.caption, fontWeight: typography.weightSemibold },
  heroIconGroup: { flexDirection: "row", alignItems: "center", gap: spacing.xs }
});
