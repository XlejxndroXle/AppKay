import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetalladosService {
  idvales: string;
  objetoDatosVale;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    //this.idvales = this.activatedRoute.snapshot.paramMap.get('idDetallePedido');
    //await this.mostrarVale(this.idvales);
  }

  /*
  async mostrarVale(idVale) {
    const formData = new FormData();
    formData.append('idVale', idVale);
    await this.http
      .post(environment.api_url + 'CrudVales/consultaVale', formData)
      .toPromise()
      .then((data) => {
        this.objetoDatosVale = {
          fechainicio: data['fechainicio'],
          fechafin: data['fechafin'],
          diasparacanjearlo: data['diasparacanjearlo'],
          descripcion: data['descripcion'],
          idvale: data['idvale'],
        };
        //console.log(data[i].nombreProveedor);
      });
  }
*/

}
