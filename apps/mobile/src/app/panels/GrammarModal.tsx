import React from "react";
import { AppModal } from "../../components/AppModal";
import { GrammarEmptyState, GrammarGuide } from "../../features/grammar";
import { useI18n } from "../../i18n/I18nProvider";
import type { GrammarModalProps } from "./modalTypes";

export function GrammarModal({ panel, current, onSetPanel }: GrammarModalProps) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "grammar"} title={t("modal.grammar")} onClose={() => onSetPanel(null)}>
      {current ? <GrammarGuide card={current} /> : <GrammarEmptyState />}
    </AppModal>
  );
}
