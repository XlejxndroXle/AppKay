import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cobro-pedido-sub',
  templateUrl: './cobro-pedido-sub.page.html',
  styleUrls: ['./cobro-pedido-sub.page.scss'],
})
export class CobroPedidoSubPage {
  
  tipoPago: any;
  formularioAsignacion: FormGroup;
  tipoUsuarioLogueado;
  registroUnaVez='SI';
  objetoDatosCobro;
  handlerMessage = '';
  roleMessage = '';
  formasDeCobro: any[] = [];
  idPedido;
  idUsuarioLogueado: any;
  tipoEstado: any;
  objetoDatosPedido;
  objListaCobro: any[]=[];
  constructor(private activatedRoute: ActivatedRoute,private alertController: AlertController,private httpClient: HttpClient, private formBuilder: FormBuilder,private router: Router) {
    this.crearFormulario();
    this.traerFormasCobro();
    this.tipoUsuarioLogueado = jwtDecode(localStorage.getItem('jwt-admin'))['data']['tipoUsuario'];
    this.idUsuarioLogueado = jwtDecode(localStorage.getItem('jwt-admin'))['data']['idUsuario'];
  }


  async ngOnInit() {
    this.idPedido = this.activatedRoute.snapshot.paramMap.get('idCobroPedidoSub');
    await this.mostrarDatosCobro(this.idPedido);
    await this.mostrarListadoCobro(this.idPedido);
    await this.mostrarPedido(this.idPedido);

    
  }


  crearFormulario(){
    this.formularioAsignacion = this.formBuilder.group({
      totalPedido: ['', Validators.compose([])],
      restaPorPagar: ['', Validators.compose([])],
      fechaLimite: ['', Validators.compose([])],
      formaCobro: ['', Validators.compose([])],
      nuevoCobro: ['', Validators.compose([])]
    });
  }

  traerFormasCobro()
  {
    this.httpClient.get(environment.api_url + 'CrudPagos/traeFormasDePago').subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          let formaDeCobro = {
            idFormaDeCobro: data[i]['id_pagoformas'],
            nombreFormaDeCobro: data[i]['nombre_forma']
          }
          this.formasDeCobro.push(
            formaDeCobro
          );
        }
      },
      error => {
        this.crearNotificacion(
          error['error']['message'] || 'Error desconocido.'
        );
      }
    );

  }

  aceptarCobro(){
    if(this.registroUnaVez=='SI')
    {
      console.log("test")
      this.registroUnaVez='NO';
      const formData = new FormData();
      formData.append('totalTodoPedido', this.formularioAsignacion.controls['totalPedido'].value);
      formData.append('restaPorPagar', this.formularioAsignacion.controls['restaPorPagar'].value);
      formData.append('nuevoCobro', this.formularioAsignacion.controls['nuevoCobro'].value);
      formData.append('autoriza', this.idUsuarioLogueado.toString());
      formData.append('idPedido', this.idPedido.toString());
      formData.append('formaCobro', this.formularioAsignacion.controls['formaCobro'].value);
      formData.append('tipoPago', this.objetoDatosCobro.tipoPago.toString());
      this.httpClient.post(environment.api_url + 'CrudCobrosVentasSubdistribuidores/registraPago', formData).subscribe((response) => {
          this.crearNotificacion(response['message']);
          console.log("abono correcto")
          this.formularioAsignacion.controls['nuevoCobro'].setValue('');
          this.formularioAsignacion.controls['formaCobro'].setValue('');
        }, (error) => {
          this.crearNotificacionError(error['error']['message'] || 'Error desconocido');
          console.log("abono incorrecto")
          this.registroUnaVez='SI';
        });
      }
     
    }
  
  async mostrarListadoCobro(idPedido){
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.httpClient
      .post(environment.api_url + 'CrudCobrosVentasSubdistribuidores/traerCobrosPedidosMovil',formData)
      .toPromise()
      .then((data: any[]) => {
         //console.log(data)
          for (let i = 0; i < data.length; i++) {
            let objListaCobros;
             objListaCobros = {
              cantidad: data[i].cantidad,
              fechaCobro: data[i].fechaCobro,
              nombre: data[i].nombre,
              nombre_forma: data[i].nombre_forma,
              
            };
            this.objListaCobro.push(objListaCobros)
          }
        }
      );
  }


  async mostrarDatosCobro(idPedido)
  {
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.httpClient.post(environment.api_url + 'CrudCobrosVentasSubdistribuidores/consultaDatosCobro', formData).toPromise().then((data: any[]) => {
      // for (let i = 0; i < data.length; i++) {
        this.objetoDatosCobro = data;
        // };
        let totalPedido=parseFloat(this.objetoDatosCobro.total);
        let restante=parseFloat(this.objetoDatosCobro.total_restante);
        this.formularioAsignacion.controls['totalPedido'].setValue(totalPedido.toFixed(2));
        this.formularioAsignacion.controls['restaPorPagar'].setValue(restante.toFixed(2));
        this.formularioAsignacion.controls['fechaLimite'].setValue(this.objetoDatosCobro.fechaLimitePago);
    });
  }


  async mostrarPedido(idPedido) {
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.httpClient
      .post(environment.api_url + 'CrudPedidos/consultaPedidoMovil', formData)
      .toPromise()
      .then((data) => {
        // console.log(data)
        this.objetoDatosPedido = {
          cliente: data['cliente'],
          correoElectronico: data['correoElectronico'],
          descuentoTotal: data['descuentoTotal'],
          fecha: data['fecha'],
          fechaLimitePago: data['fechaLimitePago'],
          idPedido: data['idPedido'],
          idUsuario: data['idUsuario'],
          nombre: data['nombre'],
          nombreCliente: data['nombreCliente'],
          paquete: data['paquete'],
          status: data['status'],
          subdistribuidor: data['subdistribuidor'],
          telCelular: data['telCelular'],
          telFijo: data['telFijo'],
          tipoPago: data['tipoPago'],
          tipoPedido: data['tipoPedido'],
          tipoUsuario: data['tipoUsuario'],
          total: data['total'],
          totalSinDescuento: data['totalSinDescuento'],
        };

        this.tipoEstado=data['status'];
        this.tipoPago=data['tipoPago'];
        //console.log(data[i].nombreProveedor);
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
            if(this.tipoEstado==2){
            this.router.navigate(['/psubdistribuidor/surtidos']);
            }
            if(this.tipoEstado==5){
              this.router.navigate(['/psubdistribuidor/vencidos']);
              }
           },
        },    
           
      ],
    });

    await alert.present();
  }

  
  async crearNotificacionError(mensaje) {
    const alert = await this.alertController.create({
      header: ''+mensaje,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }





  





}
