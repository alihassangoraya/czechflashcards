export function inspectRootAppCards(rel, violations) {
  if (rel.match(/^app\/(?:cardFactory|deckFiltering|use(?:Card|CustomWord|DeckMembership|FilteredStudyDeck|SavedCard).*)\.ts$/)) {
    violations.rootAppCards.push(`${rel}: move app card-management modules into app/cards/`);
  }
}
