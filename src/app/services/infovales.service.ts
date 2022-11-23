import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfovalesService {
  
  detalleVales: any[] = [];

  constructor(private httpClient: HttpClient) {}

  //FUNCION
  //Declaramos nuestras variables para conectar con las keys
  async obtenerVales() {
    this.detalleVales = [];
    //limpia el arreglo cada que inicia la pagina
    //mandamos a traer las keys de la api
    //falta crear la funcion o metodo en la API de Alex
    await this.httpClient
      .get(environment.api_url + 'CrudVales/listaValesMovil')
      .toPromise()
      .then(
        (data: any[]) => {
          //  console.log(data);
          //Lleno el arreglo de pedidos
          let valeObjeto;
          for (let i = 0; i < data.length; i++) {
            valeObjeto = {
              idvale: data[i].idvale,
              fechainicio: data[i].fechainicio,
              fechafin: data[i].fechafin,
              diasparacanjearlo: data[i].diasparacanjearlo,
              descripcion: data[i].descripcion
            };
            this.detalleVales.push(valeObjeto);
          }
        }
        // error =>{
        //   eslint-disable-next-line @typescript-eslint/quotes
        //   this.presentToast("Datos incorrectos");
        // }
      );
  }

  
}
