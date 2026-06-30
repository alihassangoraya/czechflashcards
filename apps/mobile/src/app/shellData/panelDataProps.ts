import type { AppShellDataInput } from "./shellDataInput";

export function buildPanelDataProps({ cardManagement, toastMessage }: AppShellDataInput) {
  return {
    toastMessage,
    editingCard: cardManagement.editingCard
  };
}
