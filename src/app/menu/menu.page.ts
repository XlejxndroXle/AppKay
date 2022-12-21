import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { AutentificarService } from '../services/autentificar.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PermisosService } from '../services/permisos.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  result: string;
  cordova;
  tipoUsuario:any;
  idUsuario:any;
  idCliente:any;
  constructor(private alertController:AlertController, private iab: InAppBrowser, private permisos:PermisosService, private httpClient: HttpClient, private toastController: ToastController, private actionSheetCtrl: ActionSheetController, private router: Router) { 
    
  } 

   async ngOnInit() {
    this.tipoUsuario=await this.permisos.getTipoUsuario();
    this.idUsuario=await this.permisos.getIdUsuario();
    this.idCliente=await this.permisos.getIdCliente(this.idUsuario);
    //console.log("tipo:"+this.tipoUsuario);
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  // ACTIONSHEET
  async presentActionSheet() {
    if(this.tipoUsuario==4){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Historial de Pedidos',
      buttons: [
        {
          text: 'Pedidos Vendedor',
          icon: 'pricetag',
          handler: () => {
             this.router.navigate(['/pvendedor/vencidos']);

            },
        },
        {
          text: 'Pedidos Comerciante',
          icon: 'pricetags',
          handler: () => {
            this.router.navigate(['/psubdistribuidor/vencidos']);

           },
        },
        {
          text: 'Cancelar',
          icon: 'close-circle',
          role: 'cancel',          
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  } 
    //subdistribuidor
    else if(this.tipoUsuario==3){
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Historial de Pedidos',
        buttons: [
          {
            text: 'Pedidos asesor comercial',
            icon: 'pricetag',
            handler: () => {
               this.router.navigate(['/psubdistribuidor/vencidos']);
  
              },
          },
          {
            text: 'Cancelar',
            icon: 'close-circle',
            role: 'cancel',          
            data: {
              action: 'cancel',
            },
          },
        ],
      });
  
      await actionSheet.present();
  
      const result = await actionSheet.onDidDismiss();
      this.result = JSON.stringify(result, null, 2);

    } 
    //vendedor
    else if(this.tipoUsuario==2){
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Historial de Pedidos',
        buttons: [
          {
            text: 'Pedido asesor de venta',
            icon: 'pricetag',
            handler: () => {
               this.router.navigate(['/pvendedor/vencidos']);
  
              },
          },
          {
            text: 'Cancelar',
            icon: 'close-circle',
            role: 'cancel',          
            data: {
              action: 'cancel',
            },
          },
        ],
      });
  
      await actionSheet.present();
  
      const result = await actionSheet.onDidDismiss();
      this.result = JSON.stringify(result, null, 2);

    } 

  }
  // CIERRE DE ACTION SHEET


// MENSAJE
async presentAlert() {
  const alert = await this.alertController.create({
    header: '¿Desea descargar sus pagos y adeudos?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.handlerMessage = 'Alert canceled';
        },
      },
      {
        text: 'Aceptar',
        role: 'confirm',
        handler: () => {
          this.descargaPagos();
        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}

//FIN MENSAJE


async botonCerrarSesion() {
  const alert = await this.alertController.create({
    header: '¿Desea cerrar sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.handlerMessage = 'Alert canceled';
        },
      },
      {
        text: 'Confirmo',
        role: 'confirm',
        handler: () => {
          this.logout();
          this.handlerMessage = 'Alert confirmed';

        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}



  descargaPagos(){
   // console.log("idUsuario"+this.idUsuario);
    //console.log("idCliente"+this.idCliente);
    //var idCliente;

    this.iab.create(`https://kayrot.com.mx/kayrot/index.php/CrudClientes/detallesDePedidosDeClientesPDF/`+this.idCliente,`_system` ) ;
  }

}
