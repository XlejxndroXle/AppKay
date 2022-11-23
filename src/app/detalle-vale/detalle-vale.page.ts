import { Component, OnInit } from '@angular/core';
import { InfopromoService } from '../services/infopromo.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detalle-vale',
  templateUrl: './detalle-vale.page.html',
  styleUrls: ['./detalle-vale.page.scss'],
})
export class DetalleValePage implements OnInit {
  idvales: string;
  objetoDatosVale;
  constructor(
    private infoPromoService: InfopromoService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.idvales = this.activatedRoute.snapshot.paramMap.get('idvale');
    await this.mostrarVale(this.idvales);
  }

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
}
