import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../../../database";
import type { AppSupabaseClient } from "../../../sync";

export type SettingsToolContext = {
  db: AppDatabase | null;
  deck: Card[];
  settings: StudySettings | null;
  accountEmail: string | null;
  supabase: AppSupabaseClient;
  setSettingsNotice: (message: string) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};
