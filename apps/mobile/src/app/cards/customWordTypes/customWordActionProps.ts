import type { AppDatabase } from "../../../database";

export type CustomWordActionProps = {
  db: AppDatabase | null;
  refresh: (database?: AppDatabase | null) => Promise<void>;
};
