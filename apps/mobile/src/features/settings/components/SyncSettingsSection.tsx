import React from "react";
import type { SyncStatus } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { SettingsSection } from "./SettingsSection";
import { SyncActionButtons } from "./SyncActionButtons";
import { SyncStatusCard } from "./SyncStatusCard";

type Props = {
  accountEmail: string | null;
  syncStatus: SyncStatus;
  onSyncNow: () => void;
  onAccount: () => void;
};

export function SyncSettingsSection({ accountEmail, syncStatus, onSyncNow, onAccount }: Props) {
  const { t } = useI18n();
  return (
    <SettingsSection icon="cloud-sync" title={t("settings.backupSync")} description={t("settings.backupSyncDescription")}>
      <SyncStatusCard accountEmail={accountEmail} syncStatus={syncStatus} />
      <SyncActionButtons accountEmail={accountEmail} onAccount={onAccount} onSyncNow={onSyncNow} />
    </SettingsSection>
  );
}
