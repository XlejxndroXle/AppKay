import { Component, OnInit } from '@angular/core';
import { InfopromoService } from '../services/infopromo.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {
  promos:any []=[];
  constructor(private infoPromoService:InfopromoService) { }

 async ngOnInit() {
    await this.infoPromoService.obtenerPromo();
    this.promos = this.infoPromoService.detallePromo;
  }

}
