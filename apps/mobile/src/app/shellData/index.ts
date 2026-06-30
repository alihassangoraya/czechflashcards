import { buildAccountDataProps } from "./accountDataProps";
import { buildDeckDataProps } from "./deckDataProps";
import { buildNavigationDataProps } from "./navigationDataProps";
import { buildPanelDataProps } from "./panelDataProps";
import type { AppShellDataInput } from "./shellDataInput";
import { buildStudyDataProps } from "./studyDataProps";

export function buildAppShellDataProps(input: AppShellDataInput) {
  return {
    ...buildNavigationDataProps(input),
    ...buildDeckDataProps(input),
    ...buildStudyDataProps(input),
    ...buildAccountDataProps(input),
    ...buildPanelDataProps(input)
  };
}

export type AppShellDataProps = ReturnType<typeof buildAppShellDataProps>;
