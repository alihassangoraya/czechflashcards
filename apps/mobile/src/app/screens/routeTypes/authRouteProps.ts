import type { MainScreenProps } from "../screenTypes/index";

export type AuthRouteProps = Pick<
  MainScreenProps,
  "screen" | "syncStatus" | "supabase" | "authBusy" | "showToast" | "onGoBack" | "onSetScreen" | "onAuthenticate" | "onAuthenticateProvider"
>;
