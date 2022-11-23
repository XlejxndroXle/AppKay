import { Component, OnInit } from '@angular/core';
import { InfopromoService } from '../services/infopromo.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detalle-promocion',
  templateUrl: './detalle-promocion.page.html',
  styleUrls: ['./detalle-promocion.page.scss'],
})
export class DetallePromocionPage implements OnInit {
  idpromocion: string;

  objetoDatosPromocion;
  constructor(
    private infoPromoService: InfopromoService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.idpromocion = this.activatedRoute.snapshot.paramMap.get('id');
    await this.mostrarPromocion(this.idpromocion);
  }

  async mostrarPromocion(idPromocion) {
    const formData = new FormData();
    formData.append('idPromocion', idPromocion);
    await this.http
      .post(environment.api_url + 'CrudPromociones/consultaPromocion', formData)
      .toPromise()
      .then((data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          this.objetoDatosPromocion = {
            idpromocion: data[i].idpromocion,
            nombrepromocion: data[i].nombrepromocion,
            descripcion: data[i].descripcion,
            cantidadProductosRegalo: data[i].articulosregalo,
            cantidadProductosCompra: data[i].articulosventa,
            fechainicio: data[i].fechainicio,
            fechafin: data[i].fechafin,
          };
          //console.log(data[i].nombreProveedor);
        }
      });
  }
}
