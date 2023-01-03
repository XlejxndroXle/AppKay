import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushService } from '../services/push.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage  {
  //clickSub: any;
  constructor(private notificacionService:PushService, private httpClient:HttpClient ) { 
    // this.notificacionService.on('click').subscribe(notification => {
    //    // Insert your logic here
    //     });
    
  }











  
/*
  showLocalNotification(): void {
    LocalNotifications.schedule({
      notifications: [
        {
          id:1,
          title:'Titulo 1',
          body:'Cuerpo 1',
        },        {
          id:2,
          title:'Titulo 2',
          body:'Cuerpo 2',
        },
      ],
    });
  }*/
}