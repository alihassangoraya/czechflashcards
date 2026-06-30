import type { AccountStudySummary } from "../types/accountTypes";

export type AccountStudyPanelProps = {
  summary: AccountStudySummary;
  accountEmail: string | null;
};
