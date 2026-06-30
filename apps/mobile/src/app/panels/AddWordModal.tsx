import React from "react";
import { AppModal } from "../../components/AppModal";
import { AddWordPanel } from "../../features/words";
import { useI18n } from "../../i18n/I18nProvider";
import type { AddWordModalProps } from "./modalTypes";

export function AddWordModal({ panel, customCards, settings, onSetPanel, onAddWord, onDeleteWord, onOpenCardEditor }: AddWordModalProps) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "add"} title={t("modal.add")} onClose={() => onSetPanel(null)}>
      <AddWordPanel onSubmit={onAddWord} cards={customCards} decks={settings.customDecks} onDelete={onDeleteWord} onEdit={onOpenCardEditor} />
    </AppModal>
  );
}
