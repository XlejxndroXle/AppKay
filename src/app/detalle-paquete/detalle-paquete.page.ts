import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { InfoPaquetesService } from '../services/info-paquetes.service';
@Component({
  selector: 'app-detalle-paquete',
  templateUrl: './detalle-paquete.page.html',
  styleUrls: ['./detalle-paquete.page.scss'],
})
export class DetallePaquetePage implements OnInit {
  objetoDatosPaquete;
  paquete;
  objListaProductos: any[]=[];

  constructor(
    private infoPaqueteService: InfoPaquetesService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  // async ngOnInit() {
  //   this.idvales = this.activatedRoute.snapshot.paramMap.get('idvale');
  //   await this.mostrarVale(this.idvales)
  // }

  async ngOnInit() {
    // PRODUCTOS DEL PAQUETE
    // this.detallePromo = this.activatedRoute.snapshot.paramMap.get('idPaquete');
    // await this.infoPaqueteService.mostrarProductosPaquetes(this.detallePromo);
    // this.detallePromo = this.infoPaqueteService.productosLista;
    //  PAQUETES
    const paquete = this.activatedRoute.snapshot.paramMap.get('idPaquete');
    this.paquete = Number(paquete);
    await this.mostrarPaquetes(this.paquete);
    await this.mostrarProductosPaquetes(this.paquete);
  }

  async mostrarProductosPaquetes(idPaquete) {
    //console.log(idPaquete)
    
    const formData = new FormData();
    formData.append('idPaquete', idPaquete);
    await this.httpClient
      .post(environment.api_url + 'CrudPaquetes/consultaPaqueteProductos',formData)
      .toPromise()
      .then((data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          let objListaProd;
          objListaProd = {
            productos: data[i].idProductos,
            cantidad: data[i].cantidadProducto,
            producto: data[i].nombreProducto,
            descuento: data[i].descuento,
            importe: data[i].importeTotal
          };
          this.objListaProductos.push(objListaProd)
        }
        

      });
 /*      for(let x=0; x<this.objListaProductos.length;x++)
      {
        console.log('prueba')
      } */
  }

  async mostrarPaquetes(idPaquete) {
    const formData = new FormData();
    formData.append('idPaquete', idPaquete);
    await this.httpClient
      .post(environment.api_url + 'CrudPaquetes/consultaPaquete', formData)
      .toPromise()
      .then((data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          this.objetoDatosPaquete = {
            idPaquete: data[i].idPaquete,
            fechaInicio: data[i].fechaInicio,
            fechaFin: data[i].fechaFin,
            nombrePaquete: data[i].nombrePaquete,
            importeParcial: data[i].totalSinDescuento,
            descuentoTotal: data[i].descuentoTotal,
            totalDefinitivo: data[i].total,
          };
        }
      });
  }
}
