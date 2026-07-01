import React from "react";
import {
  AddWordModal,
  DeckMembershipModal,
  EditCardModal,
  GrammarModal,
  SearchWordsPanel,
  type AppPanelProps
} from "./panels";

export function AppPanels(props: AppPanelProps) {
  return (
    <>
      <SearchWordsPanel {...props} />
      <AddWordModal {...props} />
      <EditCardModal {...props} />
      <GrammarModal {...props} />
      <DeckMembershipModal {...props} />
    </>
  );
}
