import type { AppDataState } from "./appDataState";
import type { AppDataActions } from "./useAppDataActions";
import type { AuthActions } from "./useAuthActions";

type Input = {
  state: AppDataState;
  actions: AppDataActions;
  auth: AuthActions;
};

export function buildAppDataResult({ state, actions, auth }: Input) {
  return {
    db: state.db,
    cards: state.cards,
    savedCardIds: state.savedCardIds,
    deckMemberships: state.deckMemberships,
    states: state.states,
    settings: state.settings,
    dailyProgress: state.dailyProgress,
    syncStatus: state.syncStatus,
    accountEmail: state.accountEmail,
    authBusy: auth.authBusy,
    setCards: state.setCards,
    setSavedCardIds: state.setSavedCardIds,
    setDeckMemberships: state.setDeckMemberships,
    setStates: state.setStates,
    setSettingsState: state.setSettingsState,
    setSyncStatus: state.setSyncStatus,
    refresh: actions.refresh,
    persistSettings: actions.persistSettings,
    syncNow: actions.syncNow,
    authenticate: auth.authenticate,
    signOutAccount: auth.signOutAccount
  };
}
