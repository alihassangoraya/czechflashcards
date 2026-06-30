import type { AddWordValues, CorrectionValues } from "../features/words";
import type { AppShellDataProps } from "./shellData";
import type { AppShellHandlers } from "./shellHandlers";
import type { StudyAnimations } from "./studyAnimationTypes";

export type { AddWordValues, CorrectionValues, StudyAnimations };

export type AppShellProps = AppShellDataProps & AppShellHandlers;
