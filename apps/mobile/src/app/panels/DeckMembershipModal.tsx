import React from "react";
import { AppModal } from "../../components/AppModal";
import { DeckMembershipPanel } from "../../features/decks";
import { useI18n } from "../../i18n/I18nProvider";
import type { AppPanelProps } from "./panelTypes";

type Props = Pick<AppPanelProps, "panel" | "settings" | "deckMemberships" | "deckManagementCard" | "onSetPanel" | "onSetDeckManagementCard" | "onAddCardToDeck" | "onRemoveCardFromDeck">;

export function DeckMembershipModal({ panel, settings, deckMemberships, deckManagementCard, onSetPanel, onSetDeckManagementCard, onAddCardToDeck, onRemoveCardFromDeck }: Props) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "deck"} title={t("modal.deck")} onClose={() => onSetDeckManagementCard(null)}>
      <DeckMembershipPanel
        card={deckManagementCard}
        decks={settings.customDecks}
        deckMemberships={deckMemberships}
        onAddToDeck={onAddCardToDeck}
        onRemoveFromDeck={onRemoveCardFromDeck}
        onOpenSettings={() => onSetPanel("settings")}
      />
    </AppModal>
  );
}
