import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  pedido;
  objetoDatosPedido;
  objListaProductos: any[]=[];
  tipoEstado: any;
  constructor(

    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.pedido = this.activatedRoute.snapshot.paramMap.get('idDetallePedidoVendedor');
    this.pedido = Number(this.pedido);
    await this.mostrarPedido(this.pedido);
    await this.mostrarPedidoProducto(this.pedido);
  }

  async mostrarPedidoProducto(idPedido){
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.http
      .post(environment.api_url + 'CrudPedidos/consultaPedidoProductos',formData)
      .toPromise()
      .then((data: any[]) => {
        // console.log(data)
          for (let i = 0; i < data.length; i++) {
            let objListaProd;
             objListaProd = {
              cantidadProducto: data[i].cantidadProducto,
              descuento: data[i].descuento,
              importeTotal: data[i].importeTotal,
              marca: data[i].marca,
              nombreProducto: data[i].nombreProducto,
              precioUnitario: data[i].precioUnitario,
              producto: data[i].producto,
            };
            this.objListaProductos.push(objListaProd)
          }
        }
      );
  }

  

  async mostrarPedido(idPedido) {
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.http
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
        this.tipoEstado = data['status'];
        //console.log(data[i].nombreProveedor);
      });
  }

  


  

  

}
