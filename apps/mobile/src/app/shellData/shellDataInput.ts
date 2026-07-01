import type { Card } from "@czech-flashcards/shared";
import type { AppSupabaseClient } from "../../sync";
import type { AppData } from "../data/useAppData";
import type { AppNavigation } from "../navigation/appNavigationTypes";
import type { CardManagement } from "../cards/useCardManagement";
import type { StudySession } from "../study/useStudySession";

export type AppShellDataInput = {
  data: AppData;
  navigation: AppNavigation;
  deck: Card[];
  studySession: StudySession;
  cardManagement: CardManagement;
  supabase: AppSupabaseClient;
  toastMessage: string;
  showToast: (message: string) => void;
};
