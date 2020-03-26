//registerForPushNotifications.js
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Config from './constants/Config';

const PUSH_ENDPOINT     =   Config.push;

const registerForPushNotifications = async (user) => {

  if (user==undefined || user==null ) {
    return false;
  }else {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      //alert('No notification permissions!');
      return 0;
    }
    // Get the token that identifies this device
    let   token   =   await Notifications.getExpoPushTokenAsync();
    let   headers =   new Headers();
    let   data    =   new FormData();
    data.append('push_token', token);
    let   cabecera  =   { headers: {
      'Accept': 'application/json',
    },
    method: "POST",
    body: data
  }

  //await Notifications.presentLocalNotificationAsync({title:"Prueba",body:"Hola",data: { prueba:"hola" },})

  fetch(Config.ApiRest + "post?modulo=Chat&m=registerForPushNotifications&formato=json&u="+user.token,cabecera)
  // .then(response => response.json())
  // .then(data => console.log(data))


  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT+'token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      }
    }),
  });
  }

}
export default registerForPushNotifications;
