import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  pedidosCliente: any[] = []; //Arreglo para almacenar los pedidos
  constructor(private httpClient: HttpClient) {}
  async obtnerPedidosCliente(tipoUsuario, idUsuario, estatus, tipo) {
    this.pedidosCliente = []; //limpia el arreglo cada que inicia la pagina
    const formData = new FormData();
    //kay es de la api del primer valor
    formData.append('tipoUsuario', tipoUsuario);
    formData.append('usuarioLogueado', idUsuario);
    formData.append('status', estatus);
    formData.append('tipo', tipo);

    await this.httpClient
      .post(environment.api_url + 'CrudPedidos/listaPedidosMovil', formData)
      .toPromise()
      .then(
        (data: any[]) => {
          //console.log(data);
          //Lleno el arreglo de pedidos
          let pedioObjeto;
          for (let i = 0; i < data.length; i++) {
            pedioObjeto = {
              fecha: data[i].fecha,
              idPedido: data[i].idPedido,
              nombre: data[i].nombre,
              nombreCliente: data[i].nombreCliente,
              nombre_estatus: data[i].nombre_estatus,
              status: data[i].status,
            };
            this.pedidosCliente.push(pedioObjeto);
          }
        },
        (error) => {
          // eslint-disable-next-line @typescript-eslint/quotes
          //this.presentToast("Datos incorrectos");
        }
      );
  }
}
