import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-levantar-pedido',
  templateUrl: './levantar-pedido.page.html',
  styleUrls: ['./levantar-pedido.page.scss'],
})
export class LevantarPedidoPage implements OnInit {
  
  mostrar: boolean = false;
  mostrarCliente: boolean = false;
  tipoPago;
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
  mostrarOcultarCliente($event){
    if(this.mostrarCliente){
      this.mostrarCliente = false;
    } else{
      this.mostrarCliente = true;
    }
  }
  tipoPagos(pre) {
    if (pre==1){
       this.mostrar = false;
           }
         else{
             this.mostrar = true;
       }
    }

  async alerta() {
    const alert = await this.alertController.create({
      header: '¿Desea guardar su pedido?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  
  async alertaDescuento() {
    const alert = await this.alertController.create({
      header: 'Descuento aplicado',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  






}
