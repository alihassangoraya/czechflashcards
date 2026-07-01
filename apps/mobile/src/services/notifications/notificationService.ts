import type { NotificationPreferences } from "@czech-flashcards/shared";
import type { NotificationCapability } from "./notificationCapabilityTypes";

export function notificationCapability(): NotificationCapability {
  return "unsupported";
}

export async function configureLocalNotifications(_preferences: NotificationPreferences): Promise<NotificationCapability> {
  return notificationCapability();
}
