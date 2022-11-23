import { Component } from '@angular/core';
//IMPORTAMOS LOS 3 TIPOS DE FORMULARIOS
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
//IMPORTAMOS EL HTTPCLIENT
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//IMPORTAMOS TOASTCONTROLLER (NOTIFICACIONES)
import { ToastController, NavController } from '@ionic/angular';
//IMPORTAMOS LAS RUTAS
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';







@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  formLogin:FormGroup;

  //CONSTRUCTORES  
  constructor(private iab:InAppBrowser,private fb:FormBuilder, private httpCliente:HttpClient, private toastController: ToastController, private router: Router) {
    this.crearFormulario();
  }
    
    //ANIMACIÓN DEL MSJ
    async presentToast(message:string){
      const toast= await this.toastController.create({
        message,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }


    //FUNCION PARA EL FORMULARIO
  crearFormulario(){
    this.formLogin= this.fb.group({
      email: ['', Validators.required],
      contra: ['', Validators.required],
    });
  }

  async onFormSubmit(values:any){
    const formData = new FormData();
    formData.append('usuario', this.formLogin.get('email').value);
    formData.append('password', this.formLogin.get('contra').value);
    if (this.formLogin.valid){
    // console.log (formData);
        this.httpCliente.post(environment.api_url+ 'CrudUsuarios/autenticar', formData  ).subscribe(
          (data:any [])=> {
            localStorage.setItem('jwt-admin', data['jwt']);
            
              this.router.navigate(['/menu']);
               
          },
            error =>{
              // eslint-disable-next-line @typescript-eslint/quotes
              this.presentToast("Datos incorrectos");
            }
        );
     }
  }






}
