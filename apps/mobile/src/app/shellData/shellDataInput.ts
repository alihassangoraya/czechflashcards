import type { SupabaseClient } from "@supabase/supabase-js";
import type { Card } from "@czech-flashcards/shared";
import type { AppData } from "../data/useAppData";
import type { AppNavigation } from "../navigation/useAppNavigation";
import type { CardManagement } from "../cards/useCardManagement";
import type { StudySession } from "../useStudySession";

export type AppShellDataInput = {
  data: AppData;
  navigation: AppNavigation;
  deck: Card[];
  studySession: StudySession;
  cardManagement: CardManagement;
  supabase: SupabaseClient | null;
  toastMessage: string;
};
