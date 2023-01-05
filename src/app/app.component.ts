import { Component, OnInit, enableProdMode } from '@angular/core';
import { PushService } from './services/push.service';
import { interval } from 'rxjs';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  result: string;

  constructor(private pushService:PushService, private backgroundMode:BackgroundMode) {
    //this.pushService.initPush();
     //this.pushService.OneSignalInit();
     
  }
  


async ngOnInit() {
  await this.getNotification();
  this.backgroundMode.enable();
 
}


async getNotification(){
  
  interval(500000).subscribe(x => {
     this.pushService.traerNumNotificcione();
   
    //this.pushService.primeraVez=1;
    
    //this.notificacionService.showLocalNotification();
});
  //console.log('Not')
  //this.notificacionService.showLocalNotification();
}
}
