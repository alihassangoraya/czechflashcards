import React from "react";
import { AppModal } from "../../components/AppModal";
import { SettingsPanel } from "../../features/settings";
import { useI18n } from "../../i18n/I18nProvider";
import type { AppPanelProps } from "./panelTypes";

type Props = Pick<AppPanelProps, "panel" | "cards" | "settings" | "deckMemberships" | "accountEmail" | "syncStatus" | "settingsNotice" | "onSetPanel" | "onChangeSettings" | "onSyncNow" | "onRestoreJson" | "onImportCsv" | "onShuffleDue" | "onReviewAllNow" | "onExportProgress" | "onExportDeck">;

export function SettingsModal({ panel, cards, settings, deckMemberships, accountEmail, syncStatus, settingsNotice, onSetPanel, onChangeSettings, onSyncNow, onRestoreJson, onImportCsv, onShuffleDue, onReviewAllNow, onExportProgress, onExportDeck }: Props) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "settings"} title={t("common.settings")} onClose={() => onSetPanel(null)}>
      <SettingsPanel
        settings={settings}
        cards={cards}
        deckMemberships={deckMemberships}
        accountEmail={accountEmail}
        syncStatus={syncStatus}
        notice={settingsNotice}
        onChange={onChangeSettings}
        onSyncNow={onSyncNow}
        onAccount={() => onSetPanel("account")}
        onRestoreJson={onRestoreJson}
        onImportCsv={onImportCsv}
        onShuffleDue={onShuffleDue}
        onReviewAllNow={onReviewAllNow}
        onExportProgress={onExportProgress}
        onExportDeck={onExportDeck}
      />
    </AppModal>
  );
}
