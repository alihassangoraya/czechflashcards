import type { AppDatabase } from "../../../database";

export type CardEditorActionProps = {
  refresh: (database?: AppDatabase | null) => Promise<void>;
  forceCard: (cardId: string, reveal?: boolean) => void;
  showToast: (message: string) => void;
};
