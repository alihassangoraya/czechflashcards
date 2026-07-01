import type { AccountRouteProps } from "./routeTypes/accountRouteProps";

export function buildAccountPanelProps(props: AccountRouteProps) {
  return {
    configured: props.syncStatus !== "not-configured",
    supabase: props.supabase,
    syncStatus: props.syncStatus,
    accountEmail: props.accountEmail,
    busy: props.authBusy,
    cardsCount: props.cards.length,
    customCount: props.customCards.length,
    customDeckCount: props.settings.customDecks.length,
    dailyProgress: props.dailyProgress,
    savedCount: props.savedCardIds.size,
    showToast: props.showToast,
    onAuthenticate: props.onAuthenticate,
    onAuthenticateProvider: props.onAuthenticateProvider,
    onSignOut: props.onSignOut,
    onSignInToSync: () => props.onSetScreen("login"),
    onSyncNow: props.onSyncNow
  };
}
