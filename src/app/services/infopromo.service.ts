import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfopromoService {
  detallePromo: any[] = [];

  constructor(private httpClient: HttpClient) {}

  
  async obtenerPromo() {
    this.detallePromo = [];
    //limpia el arreglo cada que inicia la pagina
    //mandamos a traer las keys de la api
    //falta crear la funcion o metodo en la API de Alex
    await this.httpClient
      .get(environment.api_url + 'CrudPromociones/listaPromocionesMovil')
      .toPromise()
      .then(
        (data: any[]) => {
          // console.log(data);
          //Lleno el arreglo de pedidos
          let promoObjeto;
          for (let i = 0; i < data.length; i++) {
            promoObjeto = {
              idpromocion: data[i].idpromocion,
              fechainicio: data[i].fechainicio,
              fechafin: data[i].fechafin,
              descripcion: data[i].descripcion,
              nombrepromocion: data[i].nombrepromocion
            };
            this.detallePromo.push(promoObjeto);
          }
        }
        // error =>{
        //   eslint-disable-next-line @typescript-eslint/quotes
        //   this.presentToast("Datos incorrectos");
        // }
      );
  }


  
}
