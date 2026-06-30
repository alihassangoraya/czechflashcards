import type { MainScreenProps } from "../screenTypes";

export type AuthRouteProps = Pick<
  MainScreenProps,
  "screen" | "syncStatus" | "authBusy" | "onSetScreen" | "onAuthenticate"
>;
