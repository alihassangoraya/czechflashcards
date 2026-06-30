import React from "react";
import {
  AccountModal,
  AddWordModal,
  DeckMembershipModal,
  EditCardModal,
  GrammarModal,
  SearchWordsPanel,
  SettingsModal,
  type AppPanelProps
} from "./panels";

export function AppPanels(props: AppPanelProps) {
  return (
    <>
      <SearchWordsPanel {...props} />
      <AddWordModal {...props} />
      <EditCardModal {...props} />
      <SettingsModal {...props} />
      <AccountModal {...props} />
      <GrammarModal {...props} />
      <DeckMembershipModal {...props} />
    </>
  );
}
