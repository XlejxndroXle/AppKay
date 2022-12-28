import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Routes, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  formLogin: FormGroup;
  constructor(private toastController: ToastController,formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router,private alertController: AlertController) { 
    this.formLogin = formBuilder.group({
      correoUsuario:['',Validators.required]
    });
  }

  ngOnInit() {
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Hemos enviado la contraseña a tu correo!',
      duration: 2200,
      position: position
    });

    await toast.present();
  }

  
  enviarCorreo(values:any)
  {
    const formData = new FormData();
    /* formData.append('tipoUsuarios', values['tipoUsuarios']); */
    formData.append('correoUsuario', values['correoUsuario']);
    this.httpClient.post(environment.api_url + 'CrudUsuarios/recuperacionLogin', formData).subscribe(data => {
      this.crearNotificacion(data['message'] || '¡Bien!');
      this.router.navigate(['/login']);
    }, error => {
      this.crearNotificacion(error['error']['message'] || 'Error desconocido.');
    });
  }


  async crearNotificacion(mensaje) {
    const alert = await this.alertController.create({
      header: ''+mensaje,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.router.navigate(['/psubdistribuidor/surtidos']);
           },
        },    
           
      ],
    });

    await alert.present();
  }

}
