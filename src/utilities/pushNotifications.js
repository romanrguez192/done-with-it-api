const { Expo } = require("expo-server-sdk");

const sendPushNotification = async (targetExpoPushToken, message) => {
  const expo = new Expo();

  const chunks = expo.chunkPushNotifications([{ to: targetExpoPushToken, sound: "default", body: message }]);

  chunks.forEach(async (chunk) => {
    try {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.log("Error sending chunk", error);
    }
  });
};

module.exports = sendPushNotification;
