import type { MainScreenProps } from "../screenTypes/index";

export type QuizRouteProps = Pick<MainScreenProps, "deck" | "settings" | "onGoBack">;
