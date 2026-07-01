import type { MainScreenProps } from "../screenTypes/index";

export type AuthRouteProps = Pick<
  MainScreenProps,
  "screen" | "syncStatus" | "authBusy" | "showToast" | "onGoBack" | "onSetScreen" | "onAuthenticate" | "onAuthenticateProvider"
>;
