import React from "react";
import { AppModal } from "../../components/AppModal";
import { EditCardForm } from "../../features/words";
import { useI18n } from "../../i18n/I18nProvider";
import type { AppPanelProps } from "./panelTypes";

type Props = Pick<AppPanelProps, "panel" | "editingCard" | "onCloseCardEditor" | "onSaveCorrection">;

export function EditCardModal({ panel, editingCard, onCloseCardEditor, onSaveCorrection }: Props) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "edit"} title={t("modal.edit")} onClose={onCloseCardEditor}>
      {editingCard && <EditCardForm key={editingCard.id} card={editingCard} onSubmit={onSaveCorrection} />}
    </AppModal>
  );
}
