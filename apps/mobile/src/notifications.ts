import * as Notifications from "expo-notifications";
import type { NotificationPreferences } from "@czech-flashcards/shared";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export async function configureLocalNotifications(preferences: NotificationPreferences): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!preferences.dailyReminderEnabled && !preferences.streakRiskEnabled && !preferences.reviewDueEnabled) return;

  const permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) return;

  if (preferences.dailyReminderEnabled) {
    const [hour, minute] = preferences.dailyReminderTime.split(":").map((part) => Number(part));
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Czech review time",
        body: "A small session keeps your A2/B1 words warm."
      },
      trigger: { hour, minute, repeats: true }
    });
  }

  if (preferences.streakRiskEnabled) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Your streak needs one more review",
        body: "Finish today's goal before the day ends."
      },
      trigger: { hour: 21, minute: 0, repeats: true }
    });
  }

  if (preferences.reviewDueEnabled) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cards are due",
        body: "Open your review queue when you have a quiet minute."
      },
      trigger: { hour: 8, minute: 30, repeats: true }
    });
  }
}
