//registerForPushNotifications.js
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'https://colombia.programandoweb.net:5051/message';

const nuevaNotificacion = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      title:"Hola Abril Méndez",
      body:"Quiero decirte que te amo muchísimo",
    }),
  });
}
export default nuevaNotificacion;
