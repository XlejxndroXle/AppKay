import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-levantar-pedido',
  templateUrl: './levantar-pedido.page.html',
  styleUrls: ['./levantar-pedido.page.scss'],
})
export class LevantarPedidoPage implements OnInit {
  
  mostrar: boolean = false;
  presentingElement = null;
  count = 0;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }


  mostrarOcultar($event){
    if(this.mostrar){
      this.mostrar = false;
    } else{
      this.mostrar = true;
    }
  }
  async alerta() {
    const alert = await this.alertController.create({
      header: '¿Desea confirmar su pedido?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Confirmo',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }





}
