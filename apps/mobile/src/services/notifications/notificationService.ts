import type { NotificationPreferences } from "@czech-flashcards/shared";

export async function configureLocalNotifications(_preferences: NotificationPreferences): Promise<void> {
  // Native notification scheduling will move to the bare React Native layer.
}
