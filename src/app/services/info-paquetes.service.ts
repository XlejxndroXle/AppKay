import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfoPaquetesService {
  detallePaquete: any[] = [];
  objetoDatosPaquete: any[] = [];
  productosLista: any[] = [];


  constructor(private httpClient: HttpClient) {}

  async obtenerpaquete() {
    this.detallePaquete = [];

    await this.httpClient
      .get(environment.api_url + 'CrudPaquetes/listaPaquetesMovil')
      .toPromise()
      .then(
        (data: any[]) => {
          let PaqueteObjeto;
          for (let i = 0; i < data.length; i++) {
            PaqueteObjeto = {
              idPaquete: data[i].idPaquete,
              nombrePaquete: data[i].nombrePaquete,
              fechaInicio: data[i].fechaInicio,
              fechaFin: data[i].fechaFin,
            };
            this.detallePaquete.push(PaqueteObjeto);
          }
        }
        // error =>{
        //   eslint-disable-next-line @typescript-eslint/quotes
        //   this.presentToast("Datos incorrectos");
        // }
      );
  }
}
