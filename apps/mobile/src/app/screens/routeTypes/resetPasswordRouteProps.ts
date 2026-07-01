import type { MainScreenProps } from "../screenTypes/index";

export type ResetPasswordRouteProps = Pick<
  MainScreenProps,
  "supabase" | "showToast" | "onGoBack" | "onSetScreen"
>;
