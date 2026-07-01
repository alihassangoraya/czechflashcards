import React from "react";
import { Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import type { SyncStatus } from "../../../sync";
import { accountLocalSummaryStyles as styles } from "./accountLocalSummaryStyles";
import { AccountSummaryItem } from "./AccountSummaryItem";

type Props = {
  accountEmail: string | null;
  cardsCount: number;
  customCount: number;
  customDeckCount: number;
  dailyProgress: string;
  savedCount: number;
  syncStatus: SyncStatus;
};

export function AccountLocalSummary({ accountEmail, cardsCount, customCount, customDeckCount, dailyProgress, savedCount, syncStatus }: Props) {
  const { t, textAlign } = useI18n();
  const status = t(`account.sync.${syncStatus}`);

  return (
    <View style={styles.card}>
      <Text style={[styles.label, { textAlign }]}>{accountEmail ? t("account.activeStudent") : t("account.guestStudent")}</Text>
      <Text style={[styles.title, { textAlign }]}>{t("account.localProgress", { status })}</Text>
      <View style={styles.grid}>
        <AccountSummaryItem label={t("account.total")} value={cardsCount} />
        <AccountSummaryItem label={t("account.customWords")} value={customCount} />
        <AccountSummaryItem label={t("account.savedWords")} value={savedCount} />
        <AccountSummaryItem label={t("account.myDecks")} value={customDeckCount} />
      </View>
      <Text style={[styles.meta, { textAlign }]}>{t("account.dailyGoal")}: {dailyProgress}</Text>
    </View>
  );
}
