import { Component, OnInit } from '@angular/core';
import { InfovalesService } from '../services/infovales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vales',
  templateUrl: './vales.page.html',
  styleUrls: ['./vales.page.scss'],
})
export class ValesPage implements OnInit {
  vales: any[] = [];

  constructor(
    private infoVales: InfovalesService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.infoVales.obtenerVales(); //Vamos a la base y llenamos el arreglo del servicio
    this.vales = this.infoVales.detalleVales; //Ya que esta lleno lo asigno al arreglo de esta clase


  }
}
