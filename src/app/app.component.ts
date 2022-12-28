import { Component } from '@angular/core';
import { PushService } from './services/push.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  result: string;

  constructor(private pushService:PushService) {
     //this.pushService.OneSignalInit();
  }

}
