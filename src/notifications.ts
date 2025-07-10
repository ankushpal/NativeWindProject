import notifee from '@notifee/react-native';
export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
}
export async function showLocalNotification(title: string, message: string) {
  await notifee.displayNotification({
    title,
    body: message,
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // apne app ka icon yahan set karo
    },
  });
}
