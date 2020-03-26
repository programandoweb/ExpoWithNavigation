import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Config from '../constants/Config';

const nuevaNotificacion = async (user_token,titulo,mensaje,objeto) => {
  const PUSH_ENDPOINT     =   Config.backend_push+user_token;
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token =   await Notifications.getExpoPushTokenAsync();
  var data  =   new   FormData();
      data.append('titulo', titulo);
      data.append('mensaje', mensaje );
      data.append('push', JSON.stringify(objeto) );
  let cabecera  =   {
                      headers: {
                        'Accept': 'application/json',
                      },
                      method: "POST",
                      body: data
                    }
  return fetch(PUSH_ENDPOINT,cabecera)
          .then(response => response.json())
          .then(data => console.log(data));

  return true;
}
export default nuevaNotificacion;
