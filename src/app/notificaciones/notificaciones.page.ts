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
export class NotificacionesPage implements OnInit{
  noti;
  constructor(private notificacionService:PushService, private httpClient:HttpClient ) {}


  async ngOnInit(){
   await this.notificacionService.historialNotificaciones();
   this.noti =  this.notificacionService.detallehistorialNotifiaciones;
  
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