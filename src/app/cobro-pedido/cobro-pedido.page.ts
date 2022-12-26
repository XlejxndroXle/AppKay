import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cobro-pedido',
  templateUrl: './cobro-pedido.page.html',
  styleUrls: ['./cobro-pedido.page.scss'],
})
export class CobroPedidoPage{
  handlerMessage = '';
  roleMessage = '';
  idPedido;
  objetoDatosCobro;
  objListaCobroVendedor: any[]=[];

  constructor(private alertController:AlertController, private http: HttpClient, private activatedRoute: ActivatedRoute,private router: Router) {}
  
  async ngOnInit() {
    this.idPedido = this.activatedRoute.snapshot.paramMap.get('idCobroPedidoVendedor');
    await this.mostrarDatosCobro(this.idPedido);
    await this.mostrarListadoCobro(this.idPedido);

  }


  async mostrarListadoCobro(idPedido){
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.http
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
            this.objListaCobroVendedor.push(objListaCobros)
          }
        }
      );
  }


  async mostrarDatosCobro(idPedido) {
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.http
      .post(environment.api_url + 'CrudCobrosVentasSubdistribuidores/consultaDatosCobro', formData)
      .toPromise()
      .then((data) => {
        //console.log(data)
        this.objetoDatosCobro = {
        fechaLimitePago: data['fechaLimitePago'],
        tipoPago: data['tipoPago'],
        total: data['total'],
        total_restante: data['total_restante'],
        };
      
      });
  }
  
  

}
