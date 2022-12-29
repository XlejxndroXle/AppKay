import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { PushNotifications } from '@capacitor/push-notifications';
import {Capacitor} from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor() { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
        this.registerPush();
    }
    }
    private registerPush() {
      PushNotifications.requestPermissions().then(permission => {
          if (permission.receive === 'granted') {
              PushNotifications.register();
          }
          else {
              // If permission is not granted
          }
      });
      PushNotifications.addListener('registration', (token) => {
          console.log(token);
      });
      PushNotifications.addListener('registrationError', (error)=> {
          console.log(error);
      }); 
      PushNotifications.addListener('pushNotificationReceived',(notifications) => {
          console.log(notifications);
      });

    }

/*  
  OneSignalInit() {
    OneSignal.setAppId('6daa61c3-a98f-4ec8-9642-87960645983d');
 
    OneSignal.setNotificationOpenedHandler( notification => {
      console.log('establecer el controlador abierto de notificaciones: ', notification);
      notification;
    });

    OneSignal.setNotificationWillShowInForegroundHandler(notificationP => {
      console.log('establecer la notificación se mostrará en el controlador de primer plano: ', notificationP);
    });
 
    OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
      console.log('User accepted notifications: ', accepted);
    });

  }

*/
 
//  OneSignalInit(){
  
//   OneSignal.setAppId("6daa61c3-a98f-4ec8-9642-87960645983d");
//   OneSignal.setNotificationOpenedHandler(function(jsonData) {
//       console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//   });

 
//   OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
//       console.log("User accepted notifications: " + accepted);
//   });
// }

}
