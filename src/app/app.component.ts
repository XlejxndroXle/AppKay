import { Component, OnInit } from '@angular/core';
import { PushService } from './services/push.service';
import { interval } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  result: string;

  constructor(private pushService:PushService) {
    //this.pushService.initPush();
     //this.pushService.OneSignalInit();
  }
  
async ngOnInit() {
  await this.getNotification();
}
async getNotification(){
  
  interval(1000).subscribe(x => {
     this.pushService.traerNumNotificcione();
   
    //this.pushService.primeraVez=1;
    
    //this.notificacionService.showLocalNotification();
});
  //console.log('Not')
  //this.notificacionService.showLocalNotification();
}
}
