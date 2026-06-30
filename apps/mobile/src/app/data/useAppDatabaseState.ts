import { useState } from "react";
import type { AppDatabase } from "../../database";

export function useAppDatabaseState() {
  const [db, setDb] = useState<AppDatabase | null>(null);

  return { db, setDb };
}
