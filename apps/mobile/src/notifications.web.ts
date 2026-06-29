import type { NotificationPreferences } from "@czech-flashcards/shared";

export async function configureLocalNotifications(_preferences: NotificationPreferences): Promise<void> {
  // Browser notification scheduling is intentionally not enabled for the static web app.
}
