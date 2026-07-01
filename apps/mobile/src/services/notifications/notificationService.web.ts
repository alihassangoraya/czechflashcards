import type { NotificationPreferences } from "@czech-flashcards/shared";
import type { NotificationCapability } from "./notificationCapabilityTypes";

let dailyReminderTimer: ReturnType<typeof setTimeout> | null = null;

export function notificationCapability(): NotificationCapability {
  if (typeof Notification === "undefined") return "unsupported";
  return Notification.permission === "denied" ? "denied" : "browser-session";
}

export async function configureLocalNotifications(preferences: NotificationPreferences): Promise<NotificationCapability> {
  clearDailyReminder();
  if (!preferences.dailyReminderEnabled) return "disabled";
  if (notificationCapability() === "unsupported") return "unsupported";
  const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
  if (permission !== "granted") return "denied";
  scheduleDailyReminder(preferences.dailyReminderTime);
  return "browser-session";
}

function scheduleDailyReminder(time: string) {
  dailyReminderTimer = setTimeout(() => {
    new Notification("Czech Flashcards", { body: "Your Czech cards are ready for today's study session." });
    scheduleDailyReminder(time);
  }, nextReminderDelay(time));
}

function clearDailyReminder() {
  if (dailyReminderTimer) clearTimeout(dailyReminderTimer);
  dailyReminderTimer = null;
}

function nextReminderDelay(time: string) {
  const [hour = 19, minute = 0] = time.split(":").map(Number);
  const next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (next.getTime() <= Date.now()) next.setDate(next.getDate() + 1);
  return next.getTime() - Date.now();
}
