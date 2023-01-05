import { Injectable } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { PushNotifications } from '@capacitor/push-notifications';
import {Capacitor} from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  totalsolicitudes = 0;
  primeraVez=0;
  LocalNotifications: any;
  notificaciones: any[] = [];
  detallehistorialNotifiaciones: any []=[];
  constructor(private alertController: AlertController, private platform: Platform, private httpClient:HttpClient) { 
    // this.LocalNotifications.on('click').subscribe(notification => {
    //   // Insert your logic here
    //    });
  }
  showLocalNotification(notificaciones): void {
    LocalNotifications.schedule({
      notifications: notificaciones,
    });
  }
  async traerNumNotificcione(){
    await this.httpClient.get(environment.api_url + 'CrudNotificaciones/obtenerNumeroNotificaciones').toPromise().then((data: number) =>  {
      let mostrar=0;
      if(data != 0){
      if(this.totalsolicitudes!=data && mostrar==0){
          mostrar=1;
          this.totalsolicitudes=data;
          this.traerNotificaciones();      
    }else{
          mostrar=0;
      }
  }
  }, error => {
  });
    
  } 


  async traerNotificaciones(){
    this.notificaciones = []//limpia el arreglo
    await this.httpClient.get(environment.api_url + 'CrudNotificaciones/obtenerNotificaciones')
    .toPromise()
    .then((data: any[]) =>  {
      //console.log(data)
    let notificacionObjeto;
    let i;
    if(this.primeraVez==0){
       i=0;
    }
    else
    {
      i=data.length-1;
    }
    for (i ; i < data.length; i++) {
        notificacionObjeto = {
          id: i,
          title: data[i].titulo,
          body: data[i].mensaje,
          
        };
        this.notificaciones.push(notificacionObjeto);
       
      }
      this.showLocalNotification(this.notificaciones);
    });
    this.primeraVez=1;
  }



  async historialNotificaciones() {
    this.detallehistorialNotifiaciones = [];
    await this.httpClient
      .get(environment.api_url + 'CrudNotificaciones/obtenerNotificaciones')
      .toPromise()
      .then(
        (data: any[]) => {
          //console.log(data);
          //Lleno el arreglo de pedidos
          let notiObjeto;
          for (let i = 0; i < data.length; i++) {
            notiObjeto = {
              id: data[i].id,
              titulo: data[i].titulo,
              fecha: data[i].fecha,
              mensaje: data[i].mensaje,
              tipo: data[i].tipo,
            };
            this.detallehistorialNotifiaciones.push(notiObjeto);
          }
        }
        // error =>{
        //   eslint-disable-next-line @typescript-eslint/quotes
        //   this.presentToast("Datos incorrectos");
        // }
      );
  }





  /*showLocalNotification(titulo,mensaje): void {
    LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: titulo,
          body: mensaje,
        }, 
      ],
    });
  }*/
/*
  crearNotificacionAuxilio(message, icon, type) {
    $.notify({
      message: message,
      icon: icon
    }, {
      type: type,
      timer: 30000,
      placement: {
        from: 'top',
        align: 'right'
      }, template: `
      <div class="alert alert-{0} col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert-with-icon">
          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="material-icons" style="color: white;">close</i></button>
          <i data-notify="icon"></i>
          <span data-notify="title">{1}</span>
          <span data-notify="message">{2}</span>
      </div>`
    });
  }
*/
  async alertaNotificacion() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }




  /*

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
*/
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
