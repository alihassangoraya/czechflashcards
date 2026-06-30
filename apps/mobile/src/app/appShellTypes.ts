import type { AddWordValues, CorrectionValues } from "../features/words";
import type { AppShellDataProps } from "./appShellDataProps";
import type { AppShellHandlers } from "./appShellHandlers";
import type { StudyAnimations } from "./studyAnimationTypes";

export type { AddWordValues, CorrectionValues, StudyAnimations };

export type AppShellProps = AppShellDataProps & AppShellHandlers;
