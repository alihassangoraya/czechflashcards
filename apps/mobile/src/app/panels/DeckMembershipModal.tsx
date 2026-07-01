import React from "react";
import { AppModal } from "../../components/AppModal";
import { DeckMembershipPanel } from "../../features/decks";
import { useI18n } from "../../i18n/I18nProvider";
import type { DeckMembershipModalProps } from "./modalTypes";

export function DeckMembershipModal({ panel, settings, deckMemberships, deckManagementCard, onSetScreen, onSetDeckManagementCard, onAddCardToDeck, onRemoveCardFromDeck }: DeckMembershipModalProps) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "deck"} title={t("modal.deck")} onClose={() => onSetDeckManagementCard(null)}>
      <DeckMembershipPanel
        card={deckManagementCard}
        decks={settings.customDecks}
        deckMemberships={deckMemberships}
        onAddToDeck={onAddCardToDeck}
        onRemoveFromDeck={onRemoveCardFromDeck}
        onOpenSettings={() => {
          onSetDeckManagementCard(null);
          onSetScreen("settings");
        }}
      />
    </AppModal>
  );
}
